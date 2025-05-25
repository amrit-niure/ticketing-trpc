// backend/src/routers/users.ts
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { router, protectedProcedure, adminProcedure } from './trpc';
import { sanitizeUser } from '../utils/helpers';

export const userRouter = router({
  // Get all users (admin only)
  getAll: adminProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
        search: z.string().optional(),
        role: z.enum(['ADMIN', 'AGENT', 'USER']).optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page, limit, search, role } = input;
      const skip = (page - 1) * limit;

      const where = {
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        }),
        ...(role && { role }),
      };

      const [users, total] = await Promise.all([
        ctx.prisma.user.findMany({
          where,
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: {
                assignedTickets: true,
                createdTickets: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        ctx.prisma.user.count({ where }),
      ]);

      return {
        users,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit,
        },
      };
    }),

  // Get user by ID (admin only)
  getById: adminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              assignedTickets: true,
              createdTickets: true,
              comments: true,
            },
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      return user;
    }),

  // Create user (admin only)
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        role: z.enum(['ADMIN', 'AGENT', 'USER']),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Check if user already exists
      const existingUser = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User with this email already exists',
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(input.password, 10);

      const user = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
          role: input.role,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      return sanitizeUser(user);
    }),

  // Update user (admin only)
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1, 'Name is required').optional(),
        email: z.string().email('Invalid email address').optional(),
        role: z.enum(['ADMIN', 'AGENT', 'USER']).optional(),
        password: z.string().min(6, 'Password must be at least 6 characters').optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, password, ...updateData } = input;

      // Check if user exists
      const existingUser = await ctx.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      // Check if email is already taken by another user
      if (input.email && input.email !== existingUser.email) {
        const emailTaken = await ctx.prisma.user.findUnique({
          where: { email: input.email },
        });

        if (emailTaken) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Email is already taken by another user',
          });
        }
      }

      // Prepare update data
      const finalUpdateData: any = { ...updateData };
      if (password) {
        finalUpdateData.password = await bcrypt.hash(password, 10);
      }

      const user = await ctx.prisma.user.update({
        where: { id },
        data: finalUpdateData,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return sanitizeUser(user);
    }),

  // Delete user (admin only)
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Check if user exists
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      // Prevent admin from deleting themselves
      if (user.id === ctx.user.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You cannot delete your own account',
        });
      }

      await ctx.prisma.user.delete({
        where: { id: input.id },
      });

      return { success: true, message: 'User deleted successfully' };
    }),

  // Get current user profile
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            assignedTickets: true,
            createdTickets: true,
            comments: true,
          },
        },
      },
    });

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    return user;
  }),

  // Update current user profile
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Name is required').optional(),
        email: z.string().email('Invalid email address').optional(),
        currentPassword: z.string().optional(),
        newPassword: z.string().min(6, 'Password must be at least 6 characters').optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { currentPassword, newPassword, ...updateData } = input;

      // Prepare update data
      const finalUpdateData: any = { ...updateData };
      if (newPassword && currentPassword) {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.user.id },
        });

        if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Current password is incorrect',
          });
        }

        finalUpdateData.password = await bcrypt.hash(newPassword, 10);
      }

      // Check if email is already taken
      if (input.email) {
        const emailTaken = await ctx.prisma.user.findFirst({
          where: {
            email: input.email,
            NOT: { id: ctx.user.id },
          },
        });

        if (emailTaken) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Email is already taken',
          });
        }
      }

      const user = await ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: finalUpdateData,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return sanitizeUser(user);
    }),
});
