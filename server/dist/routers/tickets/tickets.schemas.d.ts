import { z } from 'zod';
export declare const getAllTicketsInputSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<{
        OPEN: "OPEN";
        IN_PROGRESS: "IN_PROGRESS";
        RESOLVED: "RESOLVED";
        CLOSED: "CLOSED";
    }>>;
    priority: z.ZodOptional<z.ZodNativeEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>>;
    projectId: z.ZodOptional<z.ZodString>;
    assigneeId: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "status", "priority"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "status" | "priority";
    sortOrder: "asc" | "desc";
    search?: string | undefined;
    status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | undefined;
    priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
    projectId?: string | undefined;
    assigneeId?: string | undefined;
}, {
    search?: string | undefined;
    status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
    projectId?: string | undefined;
    assigneeId?: string | undefined;
    sortBy?: "createdAt" | "updatedAt" | "status" | "priority" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>;
export type GetAllTicketsInput = z.infer<typeof getAllTicketsInputSchema>;
export declare const getTicketByIdInputSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type GetTicketByIdInput = z.infer<typeof getTicketByIdInputSchema>;
export declare const createTicketInputSchema: z.ZodObject<{
    subject: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    priority: z.ZodDefault<z.ZodNativeEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>>;
    status: z.ZodDefault<z.ZodNativeEnum<{
        OPEN: "OPEN";
        IN_PROGRESS: "IN_PROGRESS";
        RESOLVED: "RESOLVED";
        CLOSED: "CLOSED";
    }>>;
    projectId: z.ZodString;
    assigneeId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    description: string;
    status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    projectId: string;
    subject: string;
    assigneeId?: string | undefined;
}, {
    projectId: string;
    subject: string;
    description?: string | undefined;
    status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | undefined;
    priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
    assigneeId?: string | undefined;
}>;
export type CreateTicketInput = z.infer<typeof createTicketInputSchema>;
export declare const updateTicketInputSchema: z.ZodObject<{
    id: z.ZodString;
    subject: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<{
        OPEN: "OPEN";
        IN_PROGRESS: "IN_PROGRESS";
        RESOLVED: "RESOLVED";
        CLOSED: "CLOSED";
    }>>;
    priority: z.ZodOptional<z.ZodNativeEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>>;
    assigneeId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    description?: string | undefined;
    status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | undefined;
    priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
    assigneeId?: string | null | undefined;
    subject?: string | undefined;
}, {
    id: string;
    description?: string | undefined;
    status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | undefined;
    priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
    assigneeId?: string | null | undefined;
    subject?: string | undefined;
}>;
export type UpdateTicketInput = z.infer<typeof updateTicketInputSchema>;
export declare const deleteTicketInputSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type DeleteTicketInput = z.infer<typeof deleteTicketInputSchema>;
export declare const addCommentInputSchema: z.ZodObject<{
    ticketId: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ticketId: string;
    content: string;
}, {
    ticketId: string;
    content: string;
}>;
export type AddCommentInput = z.infer<typeof addCommentInputSchema>;
export declare const getCommentsInputSchema: z.ZodObject<{
    ticketId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ticketId: string;
}, {
    ticketId: string;
}>;
export type GetCommentsInput = z.infer<typeof getCommentsInputSchema>;
export declare const addAttachmentInputSchema: z.ZodObject<{
    ticketId: z.ZodString;
    filename: z.ZodString;
    filepath: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    ticketId: string;
    filename: string;
    filepath: string;
    mimeType: string;
    size: number;
}, {
    ticketId: string;
    filename: string;
    filepath: string;
    mimeType: string;
    size: number;
}>;
export type AddAttachmentInput = z.infer<typeof addAttachmentInputSchema>;
export declare const getAttachmentsInputSchema: z.ZodObject<{
    ticketId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ticketId: string;
}, {
    ticketId: string;
}>;
export type GetAttachmentsInput = z.infer<typeof getAttachmentsInputSchema>;
export declare const deleteAttachmentInputSchema: z.ZodObject<{
    ticketId: z.ZodString;
    attachmentId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ticketId: string;
    attachmentId: string;
}, {
    ticketId: string;
    attachmentId: string;
}>;
export type DeleteAttachmentInput = z.infer<typeof deleteAttachmentInputSchema>;
export declare const getActivityLogsInputSchema: z.ZodObject<{
    ticketId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ticketId: string;
}, {
    ticketId: string;
}>;
export type GetActivityLogsInput = z.infer<typeof getActivityLogsInputSchema>;
export declare const getTicketStatsInputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export type GetTicketStatsInput = z.infer<typeof getTicketStatsInputSchema>;
//# sourceMappingURL=tickets.schemas.d.ts.map