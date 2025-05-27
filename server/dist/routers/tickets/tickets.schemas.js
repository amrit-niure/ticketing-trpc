"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketStatsInputSchema = exports.getActivityLogsInputSchema = exports.deleteAttachmentInputSchema = exports.getAttachmentsInputSchema = exports.addAttachmentInputSchema = exports.getCommentsInputSchema = exports.addCommentInputSchema = exports.deleteTicketInputSchema = exports.updateTicketInputSchema = exports.createTicketInputSchema = exports.getTicketByIdInputSchema = exports.getAllTicketsInputSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.getAllTicketsInputSchema = zod_1.z.object({
    page: zod_1.z.number().min(1).default(1),
    limit: zod_1.z.number().min(1).max(100).default(10),
    search: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(client_1.TicketStatus).optional(),
    priority: zod_1.z.nativeEnum(client_1.TicketPriority).optional(),
    projectId: zod_1.z.string().optional(),
    assigneeId: zod_1.z.string().optional(),
    sortBy: zod_1.z.enum(['createdAt', 'updatedAt', 'status', 'priority']).default('updatedAt'),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
exports.getTicketByIdInputSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.createTicketInputSchema = zod_1.z.object({
    subject: zod_1.z.string().min(1, 'Subject is required'),
    description: zod_1.z.string().default(''),
    priority: zod_1.z.nativeEnum(client_1.TicketPriority).default('MEDIUM'),
    status: zod_1.z.nativeEnum(client_1.TicketStatus).default('OPEN'),
    projectId: zod_1.z.string().min(1, 'Project is required'),
    assigneeId: zod_1.z.string().optional(),
});
exports.updateTicketInputSchema = zod_1.z.object({
    id: zod_1.z.string(),
    subject: zod_1.z.string().min(1, 'Subject is required').optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(client_1.TicketStatus).optional(),
    priority: zod_1.z.nativeEnum(client_1.TicketPriority).optional(),
    assigneeId: zod_1.z.string().nullable().optional(),
});
exports.deleteTicketInputSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.addCommentInputSchema = zod_1.z.object({
    ticketId: zod_1.z.string(),
    content: zod_1.z.string().min(1, 'Comment content is required'),
});
exports.getCommentsInputSchema = zod_1.z.object({
    ticketId: zod_1.z.string(),
});
exports.addAttachmentInputSchema = zod_1.z.object({
    ticketId: zod_1.z.string(),
    filename: zod_1.z.string(),
    filepath: zod_1.z.string(),
    mimeType: zod_1.z.string(),
    size: zod_1.z.number(),
});
exports.getAttachmentsInputSchema = zod_1.z.object({
    ticketId: zod_1.z.string(),
});
exports.deleteAttachmentInputSchema = zod_1.z.object({
    ticketId: zod_1.z.string(),
    attachmentId: zod_1.z.string(),
});
exports.getActivityLogsInputSchema = zod_1.z.object({
    ticketId: zod_1.z.string(),
});
exports.getTicketStatsInputSchema = zod_1.z.object({});
//# sourceMappingURL=tickets.schemas.js.map