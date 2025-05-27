import { z } from 'zod';
import { TicketStatus, TicketPriority } from '@prisma/client';

export const getAllTicketsInputSchema = z.object({
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(10),
    search: z.string().optional(),
    status: z.nativeEnum(TicketStatus).optional(),
    priority: z.nativeEnum(TicketPriority).optional(),
    projectId: z.string().optional(),
    assigneeId: z.string().optional(),
    sortBy: z.enum(['createdAt', 'updatedAt', 'status', 'priority']).default('updatedAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
});
export type GetAllTicketsInput = z.infer<typeof getAllTicketsInputSchema>;

export const getTicketByIdInputSchema = z.object({
    id: z.string(),
});
export type GetTicketByIdInput = z.infer<typeof getTicketByIdInputSchema>;

export const createTicketInputSchema = z.object({
    subject: z.string().min(1, 'Subject is required'),
    description: z.string().default(''),
    priority: z.nativeEnum(TicketPriority).default('MEDIUM'),
    status: z.nativeEnum(TicketStatus).default('OPEN'),
    projectId: z.string().min(1, 'Project is required'),
    assigneeId: z.string().optional(),
});
export type CreateTicketInput = z.infer<typeof createTicketInputSchema>;

export const updateTicketInputSchema = z.object({
    id: z.string(),
    subject: z.string().min(1, 'Subject is required').optional(),
    description: z.string().optional(),
    status: z.nativeEnum(TicketStatus).optional(),
    priority: z.nativeEnum(TicketPriority).optional(),
    assigneeId: z.string().nullable().optional(),
});
export type UpdateTicketInput = z.infer<typeof updateTicketInputSchema>;

export const deleteTicketInputSchema = z.object({
    id: z.string(),
});
export type DeleteTicketInput = z.infer<typeof deleteTicketInputSchema>;

export const addCommentInputSchema = z.object({
    ticketId: z.string(),
    content: z.string().min(1, 'Comment content is required'),
});
export type AddCommentInput = z.infer<typeof addCommentInputSchema>;

export const getCommentsInputSchema = z.object({
    ticketId: z.string(),
});
export type GetCommentsInput = z.infer<typeof getCommentsInputSchema>;

export const addAttachmentInputSchema = z.object({
    ticketId: z.string(),
    filename: z.string(),
    filepath: z.string(),
    mimeType: z.string(),
    size: z.number(),
});
export type AddAttachmentInput = z.infer<typeof addAttachmentInputSchema>;

export const getAttachmentsInputSchema = z.object({
    ticketId: z.string(),
});
export type GetAttachmentsInput = z.infer<typeof getAttachmentsInputSchema>;

export const deleteAttachmentInputSchema = z.object({
    ticketId: z.string(),
    attachmentId: z.string(),
});
export type DeleteAttachmentInput = z.infer<typeof deleteAttachmentInputSchema>;

export const getActivityLogsInputSchema = z.object({
    ticketId: z.string(),
});
export type GetActivityLogsInput = z.infer<typeof getActivityLogsInputSchema>;

export const getTicketStatsInputSchema = z.object({});
export type GetTicketStatsInput = z.infer<typeof getTicketStatsInputSchema>;
