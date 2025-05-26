"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRouter = void 0;
// server/src/routers/schemas/tickets.schema.ts
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
const trpc_1 = require("../../trpc");
exports.ticketRouter = (0, trpc_1.router)({
    // Get all tickets with filtering
    getAll: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        page: zod_1.z.number().min(1).default(1),
        limit: zod_1.z.number().min(1).max(100).default(10),
        search: zod_1.z.string().optional(),
        status: zod_1.z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).optional(),
        priority: zod_1.z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
        projectId: zod_1.z.string().optional(),
        assigneeId: zod_1.z.string().optional(),
        sortBy: zod_1.z.enum(['createdAt', 'updatedAt', 'status', 'priority']).default('createdAt'),
        sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
    }))
        .query(async ({ input, ctx }) => {
        const { page, limit, search, status, priority, projectId, assigneeId, sortBy, sortOrder } = input;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { subject: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }
        if (status)
            where.status = status;
        if (priority)
            where.priority = priority;
        if (projectId)
            where.projectId = projectId;
        if (assigneeId)
            where.assigneeId = assigneeId;
        const [tickets, total] = await Promise.all([
            ctx.prisma.ticket.findMany({
                where,
                include: {
                    project: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
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
                orderBy: { [sortBy]: sortOrder },
                skip,
                take: limit,
            }),
            ctx.prisma.ticket.count({ where }),
        ]);
        return {
            tickets,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit,
            },
        };
    }),
    // Get ticket by ID
    getById: trpc_1.protectedProcedure
        .input(zod_1.z.object({ id: zod_1.z.string() }))
        .query(async ({ input, ctx }) => {
        const ticket = await ctx.prisma.ticket.findUnique({
            where: { id: input.id },
            include: {
                project: true,
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
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'asc' }
                },
                attachments: true,
                activityLogs: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
        if (!ticket) {
            throw new server_1.TRPCError({
                code: 'NOT_FOUND',
                message: 'Ticket not found',
            });
        }
        return ticket;
    }),
    // Create new ticket
    create: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        subject: zod_1.z.string().min(1, 'Subject is required'),
        description: zod_1.z.string().default(''),
        priority: zod_1.z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
        status: zod_1.z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).default('OPEN'),
        projectId: zod_1.z.string().min(1, 'Project is required'),
        assigneeId: zod_1.z.string().optional(),
    }))
        .mutation(async ({ input, ctx }) => {
        const newTicket = await ctx.prisma.ticket.create({
            data: {
                subject: input.subject,
                description: input.description,
                status: input.status,
                priority: input.priority,
                projectId: input.projectId,
                assigneeId: input.assigneeId || null,
                requesterId: ctx.user.id
            },
            include: {
                project: true,
                assignee: true,
                requester: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        // Create activity log
        await ctx.prisma.activityLog.create({
            data: {
                ticketId: newTicket.id,
                userId: ctx.user.id,
                action: 'CREATED',
                details: `Ticket created by ${ctx.user.name || ctx.user.email}`
            }
        });
        if (input.assigneeId) {
            await ctx.prisma.activityLog.create({
                data: {
                    ticketId: newTicket.id,
                    userId: ctx.user.id,
                    action: 'ASSIGNED',
                    details: `Ticket assigned to user`
                }
            });
        }
        return newTicket;
    }),
    // Update ticket
    update: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        subject: zod_1.z.string().min(1, 'Subject is required').optional(),
        description: zod_1.z.string().optional(),
        status: zod_1.z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).optional(),
        priority: zod_1.z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
        assigneeId: zod_1.z.string().nullable().optional(),
    }))
        .mutation(async ({ input, ctx }) => {
        const { id, assigneeId, ...updateData } = input;
        // Get the existing ticket
        const existingTicket = await ctx.prisma.ticket.findUnique({
            where: { id },
            include: { assignee: true }
        });
        if (!existingTicket) {
            throw new server_1.TRPCError({
                code: 'NOT_FOUND',
                message: 'Ticket not found',
            });
        }
        // Track changes for activity logs
        const activityPromises = [];
        if (input.status && input.status !== existingTicket.status) {
            activityPromises.push(ctx.prisma.activityLog.create({
                data: {
                    ticketId: id,
                    userId: ctx.user.id,
                    action: 'STATUS_CHANGED',
                    details: `Status changed from ${existingTicket.status} to ${input.status}`
                }
            }));
        }
        if (input.priority && input.priority !== existingTicket.priority) {
            activityPromises.push(ctx.prisma.activityLog.create({
                data: {
                    ticketId: id,
                    userId: ctx.user.id,
                    action: 'PRIORITY_CHANGED',
                    details: `Priority changed from ${existingTicket.priority} to ${input.priority}`
                }
            }));
        }
        if (assigneeId !== undefined && assigneeId !== existingTicket.assigneeId) {
            if (assigneeId === null) {
                activityPromises.push(ctx.prisma.activityLog.create({
                    data: {
                        ticketId: id,
                        userId: ctx.user.id,
                        action: 'UNASSIGNED',
                        details: 'Ticket unassigned'
                    }
                }));
            }
            else {
                activityPromises.push(ctx.prisma.activityLog.create({
                    data: {
                        ticketId: id,
                        userId: ctx.user.id,
                        action: 'ASSIGNED',
                        details: 'Ticket reassigned'
                    }
                }));
            }
        }
        // Update ticket
        const updatedTicket = await ctx.prisma.ticket.update({
            where: { id },
            data: {
                ...updateData,
                assigneeId: assigneeId === undefined ? undefined : assigneeId,
                updatedAt: new Date()
            },
            include: {
                project: true,
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
            }
        });
        // Execute all activity logs
        await Promise.all(activityPromises);
        return updatedTicket;
    }),
    // Delete ticket (admin only)
    delete: trpc_1.adminProcedure
        .input(zod_1.z.object({ id: zod_1.z.string() }))
        .mutation(async ({ input, ctx }) => {
        const ticket = await ctx.prisma.ticket.findUnique({
            where: { id: input.id }
        });
        if (!ticket) {
            throw new server_1.TRPCError({
                code: 'NOT_FOUND',
                message: 'Ticket not found',
            });
        }
        // Delete related records in transaction
        await ctx.prisma.$transaction([
            ctx.prisma.comment.deleteMany({ where: { ticketId: input.id } }),
            ctx.prisma.attachment.deleteMany({ where: { ticketId: input.id } }),
            ctx.prisma.activityLog.deleteMany({ where: { ticketId: input.id } }),
            ctx.prisma.ticket.delete({ where: { id: input.id } })
        ]);
        return { success: true };
    }),
    // Add comment to ticket
    addComment: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        ticketId: zod_1.z.string(),
        content: zod_1.z.string().min(1, 'Comment content is required'),
    }))
        .mutation(async ({ input, ctx }) => {
        const ticket = await ctx.prisma.ticket.findUnique({
            where: { id: input.ticketId }
        });
        if (!ticket) {
            throw new server_1.TRPCError({
                code: 'NOT_FOUND',
                message: 'Ticket not found',
            });
        }
        const comment = await ctx.prisma.comment.create({
            data: {
                content: input.content,
                ticketId: input.ticketId,
                authorId: ctx.user.id
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        // Create activity log
        await ctx.prisma.activityLog.create({
            data: {
                ticketId: input.ticketId,
                userId: ctx.user.id,
                action: 'COMMENT_ADDED',
                details: `Comment added by ${ctx.user.name || ctx.user.email}`
            }
        });
        return comment;
    }),
    // Get comments for ticket
    getComments: trpc_1.protectedProcedure
        .input(zod_1.z.object({ ticketId: zod_1.z.string() }))
        .query(async ({ input, ctx }) => {
        const comments = await ctx.prisma.comment.findMany({
            where: { ticketId: input.ticketId },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: { createdAt: 'asc' }
        });
        return comments;
    }),
    // Get activity logs for ticket
    getActivityLogs: trpc_1.protectedProcedure
        .input(zod_1.z.object({ ticketId: zod_1.z.string() }))
        .query(async ({ input, ctx }) => {
        const activityLogs = await ctx.prisma.activityLog.findMany({
            where: { ticketId: input.ticketId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return activityLogs;
    }),
    // Get ticket statistics
    getStats: trpc_1.agentProcedure
        .query(async ({ ctx }) => {
        const totalTickets = await ctx.prisma.ticket.count();
        const ticketsByStatus = await ctx.prisma.ticket.groupBy({
            by: ['status'],
            _count: { status: true }
        });
        const ticketsByPriority = await ctx.prisma.ticket.groupBy({
            by: ['priority'],
            _count: { priority: true }
        });
        const recentActivity = await ctx.prisma.activityLog.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: {
                ticket: {
                    select: {
                        subject: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return {
            totalTickets,
            ticketsByStatus,
            ticketsByPriority,
            recentActivity
        };
    }),
});
//# sourceMappingURL=tickets.schema.js.map