"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketStatsService = exports.getActivityLogsService = exports.deleteAttachmentService = exports.getAttachmentsService = exports.addAttachmentService = exports.getCommentsService = exports.addCommentService = exports.deleteTicketService = exports.updateTicketService = exports.createTicketService = exports.getTicketByIdService = exports.getAllTicketsService = void 0;
const server_1 = require("@trpc/server");
const getAllTicketsService = async ({ input, ctx, }) => {
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
};
exports.getAllTicketsService = getAllTicketsService;
const getTicketByIdService = async ({ input, ctx, }) => {
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
};
exports.getTicketByIdService = getTicketByIdService;
const createTicketService = async ({ input, ctx, }) => {
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
};
exports.createTicketService = createTicketService;
const updateTicketService = async ({ input, ctx, }) => {
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
};
exports.updateTicketService = updateTicketService;
const deleteTicketService = async ({ input, ctx, }) => {
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
};
exports.deleteTicketService = deleteTicketService;
const addCommentService = async ({ input, ctx, }) => {
    // Check if ticket exists
    const ticketExists = await ctx.prisma.ticket.findUnique({
        where: { id: input.ticketId }
    });
    if (!ticketExists) {
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
    // Log comment activity
    await ctx.prisma.activityLog.create({
        data: {
            ticketId: input.ticketId,
            userId: ctx.user.id,
            action: 'COMMENT_ADDED',
            details: `Comment added by ${ctx.user.name || ctx.user.email}`
        }
    });
    return comment;
};
exports.addCommentService = addCommentService;
const getCommentsService = async ({ input, ctx, }) => {
    // Check if ticket exists
    const ticketExists = await ctx.prisma.ticket.findUnique({
        where: { id: input.ticketId }
    });
    if (!ticketExists) {
        throw new server_1.TRPCError({
            code: 'NOT_FOUND',
            message: 'Ticket not found',
        });
    }
    const comments = await ctx.prisma.comment.findMany({
        where: { ticketId: input.ticketId },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        },
        orderBy: { createdAt: 'asc' }
    });
    return comments;
};
exports.getCommentsService = getCommentsService;
const addAttachmentService = async ({ input, ctx, }) => {
    // Check if ticket exists
    const ticketExists = await ctx.prisma.ticket.findUnique({
        where: { id: input.ticketId }
    });
    if (!ticketExists) {
        throw new server_1.TRPCError({
            code: 'NOT_FOUND',
            message: 'Ticket not found',
        });
    }
    const attachment = await ctx.prisma.attachment.create({
        data: {
            filename: input.filename,
            filepath: input.filepath,
            mimeType: input.mimeType,
            size: input.size,
            ticketId: input.ticketId,
        }
    });
    // Log attachment activity
    await ctx.prisma.activityLog.create({
        data: {
            ticketId: input.ticketId,
            userId: ctx.user.id,
            action: 'ATTACHMENT_ADDED',
            details: `File ${input.filename} attached by ${ctx.user.name || ctx.user.email}`
        }
    });
    return attachment;
};
exports.addAttachmentService = addAttachmentService;
const getAttachmentsService = async ({ input, ctx, }) => {
    // Check if ticket exists
    const ticketExists = await ctx.prisma.ticket.findUnique({
        where: { id: input.ticketId }
    });
    if (!ticketExists) {
        throw new server_1.TRPCError({
            code: 'NOT_FOUND',
            message: 'Ticket not found',
        });
    }
    const attachments = await ctx.prisma.attachment.findMany({
        where: { ticketId: input.ticketId },
        orderBy: { createdAt: 'desc' }
    });
    return attachments;
};
exports.getAttachmentsService = getAttachmentsService;
const deleteAttachmentService = async ({ input, ctx, }) => {
    // Check if ticket exists
    const ticketExists = await ctx.prisma.ticket.findUnique({
        where: { id: input.ticketId }
    });
    if (!ticketExists) {
        throw new server_1.TRPCError({
            code: 'NOT_FOUND',
            message: 'Ticket not found',
        });
    }
    const attachment = await ctx.prisma.attachment.findUnique({
        where: { id: input.attachmentId }
    });
    if (!attachment) {
        throw new server_1.TRPCError({
            code: 'NOT_FOUND',
            message: 'Attachment not found',
        });
    }
    await ctx.prisma.attachment.delete({
        where: { id: input.attachmentId }
    });
    // Log activity
    await ctx.prisma.activityLog.create({
        data: {
            ticketId: input.ticketId,
            userId: ctx.user.id,
            action: 'ATTACHMENT_DELETED',
            details: `File ${attachment.filename} deleted by ${ctx.user.name || ctx.user.email}`
        }
    });
    return { success: true };
};
exports.deleteAttachmentService = deleteAttachmentService;
const getActivityLogsService = async ({ input, ctx, }) => {
    // Check if ticket exists
    const ticketExists = await ctx.prisma.ticket.findUnique({
        where: { id: input.ticketId }
    });
    if (!ticketExists) {
        throw new server_1.TRPCError({
            code: 'NOT_FOUND',
            message: 'Ticket not found',
        });
    }
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
};
exports.getActivityLogsService = getActivityLogsService;
const getTicketStatsService = async ({ input, ctx, }) => {
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
};
exports.getTicketStatsService = getTicketStatsService;
//# sourceMappingURL=tickets.services.js.map