// server/src/routers/schemas/projects.schema.ts
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, protectedProcedure, agentProcedure, adminProcedure } from '../../trpc';

export const projectRouter = router({
  // Get all projects
  getAll: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),        limit: z.number().min(1).max(100).default(10),
        search: z.string().optional(),
        status: z.enum(['ACTIVE', 'ARCHIVED', 'COMPLETED']).optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page, limit, search, status } = input;
      const skip = (page - 1) * limit;

      const where: any = {};

      if (search) {        where.OR = [
          { name: { contains: search } },
          { description: { contains: search } }
        ];
      }

      if (status) where.status = status;

      const [projects, total] = await Promise.all([
        ctx.prisma.project.findMany({
          where,
          include: {
            _count: {
              select: {
                tickets: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        ctx.prisma.project.count({ where }),
      ]);

      return {
        projects,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit,
        },
      };
    }),

  // Get project by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const project = await ctx.prisma.project.findUnique({
        where: { id: input.id },
        include: {
          tickets: {
            include: {
              assignee: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              },
              requester: {
                select: {
                  id: true,
                  name: true
                }
              }
            },
            orderBy: { updatedAt: 'desc' }
          },
          _count: {
            select: {
              tickets: true
            }
          }
        }
      });

      if (!project) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Project not found',
        });
      }

      return project;
    }),

  // Create project (agent or admin only)
  create: agentProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Project name is required'),
        description: z.string().optional(),
        status: z.enum(['ACTIVE', 'ARCHIVED', 'COMPLETED']).default('ACTIVE'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Check if project name already exists
      const existingProject = await ctx.prisma.project.findFirst({        where: { 
          name: { 
            equals: input.name
          } 
        }
      });

      if (existingProject) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Project with this name already exists',
        });
      }

      const project = await ctx.prisma.project.create({
        data: {
          name: input.name,
          description: input.description || '',
          status: input.status,
        },
        include: {
          _count: {
            select: {
              tickets: true
            }
          }
        }
      });

      return project;
    }),

  // Update project (agent or admin only)
  update: agentProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1, 'Project name is required').optional(),
        description: z.string().optional(),
        status: z.enum(['ACTIVE', 'ARCHIVED', 'COMPLETED']).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input;

      // Check if project exists
      const existingProject = await ctx.prisma.project.findUnique({
        where: { id }
      });

      if (!existingProject) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Project not found',
        });
      }

      // Check name uniqueness if name is being updated
      if (input.name && input.name !== existingProject.name) {
        const nameExists = await ctx.prisma.project.findFirst({          where: { 
            name: { 
              equals: input.name
            },
            NOT: { id }
          }
        });

        if (nameExists) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Project with this name already exists',
          });
        }
      }

      const project = await ctx.prisma.project.update({
        where: { id },
        data: updateData,
        include: {
          _count: {
            select: {
              tickets: true
            }
          }
        }
      });

      return project;
    }),

  // Delete project (admin only)
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const project = await ctx.prisma.project.findUnique({
        where: { id: input.id },
        include: {
          _count: {
            select: {
              tickets: true
            }
          }
        }
      });

      if (!project) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Project not found',
        });
      }

      // Check if project has tickets
      if (project._count.tickets > 0) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'Cannot delete project with existing tickets. Please delete or reassign all tickets first.',
        });
      }

      await ctx.prisma.project.delete({
        where: { id: input.id }
      });

      return { success: true };
    }),

  // Get project statistics
  getStats: agentProcedure
    .query(async ({ ctx }) => {
      const totalProjects = await ctx.prisma.project.count();

      const projectsByStatus = await ctx.prisma.project.groupBy({
        by: ['status'],
        _count: { status: true }
      });

      const projectsWithTicketCounts = await ctx.prisma.project.findMany({
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              tickets: true
            }
          }
        },
        orderBy: {
          tickets: {
            _count: 'desc'
          }
        },
        take: 5
      });

      return {
        totalProjects,
        projectsByStatus,
        topProjectsByTickets: projectsWithTicketCounts
      };
    }),
});
