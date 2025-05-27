"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectStatsService = exports.deleteProjectService = exports.updateProjectService = exports.createProjectService = exports.getProjectByIdService = exports.getAllProjectsService = void 0;
const server_1 = require("@trpc/server");
const getAllProjectsService = async ({ input, ctx, }) => {
    const { page, limit, search, status } = input;
    const skip = (page - 1) * limit;
    const where = {};
    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
        ];
    }
    if (status)
        where.status = status;
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
};
exports.getAllProjectsService = getAllProjectsService;
const getProjectByIdService = async ({ input, ctx, }) => {
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
        throw new server_1.TRPCError({
            code: 'NOT_FOUND',
            message: 'Project not found',
        });
    }
    return project;
};
exports.getProjectByIdService = getProjectByIdService;
const createProjectService = async ({ input, ctx, }) => {
    // Check if project name already exists
    const existingProject = await ctx.prisma.project.findFirst({
        where: {
            name: {
                equals: input.name
            }
        }
    });
    if (existingProject) {
        throw new server_1.TRPCError({
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
};
exports.createProjectService = createProjectService;
const updateProjectService = async ({ input, ctx, }) => {
    const { id, ...updateData } = input;
    // Check if project exists
    const existingProject = await ctx.prisma.project.findUnique({
        where: { id }
    });
    if (!existingProject) {
        throw new server_1.TRPCError({
            code: 'NOT_FOUND',
            message: 'Project not found',
        });
    }
    // Check name uniqueness if name is being updated
    if (input.name && input.name !== existingProject.name) {
        const nameExists = await ctx.prisma.project.findFirst({
            where: {
                name: {
                    equals: input.name
                },
                NOT: { id }
            }
        });
        if (nameExists) {
            throw new server_1.TRPCError({
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
};
exports.updateProjectService = updateProjectService;
const deleteProjectService = async ({ input, ctx, }) => {
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
        throw new server_1.TRPCError({
            code: 'NOT_FOUND',
            message: 'Project not found',
        });
    }
    // Check if project has tickets
    if (project._count.tickets > 0) {
        throw new server_1.TRPCError({
            code: 'PRECONDITION_FAILED',
            message: 'Cannot delete project with existing tickets. Please delete or reassign all tickets first.',
        });
    }
    await ctx.prisma.project.delete({
        where: { id: input.id }
    });
    return { success: true };
};
exports.deleteProjectService = deleteProjectService;
const getProjectStatsService = async ({ input, ctx, }) => {
    const totalProjects = await ctx.prisma.project.count();
    const projectsByStatus = await ctx.prisma.project.groupBy({
        by: ['status'],
        _count: { status: true }
    });
    const projectsWithTicketCounts = await ctx.prisma.project.findMany({
        select: {
            id: true,
            name: true,
            status: true,
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
};
exports.getProjectStatsService = getProjectStatsService;
//# sourceMappingURL=projects.services.js.map