import { router } from "../../trpc";
import { protectedProcedure, agentProcedure, adminProcedure } from "../../trpc/procedures";
import {
    getAllTicketsInputSchema,
    getTicketByIdInputSchema,
    createTicketInputSchema,
    updateTicketInputSchema,
    deleteTicketInputSchema,
    addCommentInputSchema,
    addAttachmentInputSchema,
    deleteAttachmentInputSchema
} from "./tickets.schemas";
import {
    getAllTicketsService,
    getTicketByIdService,
    createTicketService,
    updateTicketService,
    deleteTicketService,
    addCommentService,
    addAttachmentService,
    deleteAttachmentService
} from "./tickets.services";

export const ticketsRouter = router({
    // Create a new ticket
    create: protectedProcedure
        .input(createTicketInputSchema)
        .mutation(async ({ input, ctx }) => {
            return createTicketService({ input, ctx });
        }),

    // Update an existing ticket
    update: protectedProcedure
        .input(updateTicketInputSchema)
        .mutation(async ({ input, ctx }) => {
            return updateTicketService({ input, ctx });
        }),

    // Get a single ticket by ID
    getById: protectedProcedure
        .input(getTicketByIdInputSchema)
        .query(async ({ input, ctx }) => {
            return getTicketByIdService({ input, ctx });
        }),

    // Get all tickets with filtering and pagination
    getAll: protectedProcedure
        .input(getAllTicketsInputSchema)
        .query(async ({ input, ctx }) => {
            return getAllTicketsService({ input, ctx });
        }),

    // Delete a ticket (admin only)
    delete: adminProcedure
        .input(deleteTicketInputSchema)
        .mutation(async ({ input, ctx }) => {
            return deleteTicketService({ input, ctx });
        }),

    // Add a comment to a ticket
    addComment: protectedProcedure
        .input(addCommentInputSchema)
        .mutation(async ({ input, ctx }) => {
            return addCommentService({ input, ctx });
        }),

    // Add an attachment to a ticket
    addAttachment: protectedProcedure
        .input(addAttachmentInputSchema)
        .mutation(async ({ input, ctx }) => {
            return addAttachmentService({ input, ctx });
        }),

    // Delete an attachment
    deleteAttachment: protectedProcedure
        .input(deleteAttachmentInputSchema)
        .mutation(async ({ input, ctx }) => {
            return deleteAttachmentService({ input, ctx });
        })
});
