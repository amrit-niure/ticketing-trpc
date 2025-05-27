"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketsRouter = void 0;
const trpc_1 = require("../../trpc");
const procedures_1 = require("../../trpc/procedures");
const tickets_schemas_1 = require("./tickets.schemas");
const tickets_services_1 = require("./tickets.services");
exports.ticketsRouter = (0, trpc_1.router)({
    // Create a new ticket
    create: procedures_1.protectedProcedure
        .input(tickets_schemas_1.createTicketInputSchema)
        .mutation(async ({ input, ctx }) => {
        return (0, tickets_services_1.createTicketService)({ input, ctx });
    }),
    // Update an existing ticket
    update: procedures_1.protectedProcedure
        .input(tickets_schemas_1.updateTicketInputSchema)
        .mutation(async ({ input, ctx }) => {
        return (0, tickets_services_1.updateTicketService)({ input, ctx });
    }),
    // Get a single ticket by ID
    getById: procedures_1.protectedProcedure
        .input(tickets_schemas_1.getTicketByIdInputSchema)
        .query(async ({ input, ctx }) => {
        return (0, tickets_services_1.getTicketByIdService)({ input, ctx });
    }),
    // Get all tickets with filtering and pagination
    getAll: procedures_1.protectedProcedure
        .input(tickets_schemas_1.getAllTicketsInputSchema)
        .query(async ({ input, ctx }) => {
        return (0, tickets_services_1.getAllTicketsService)({ input, ctx });
    }),
    // Delete a ticket (admin only)
    delete: procedures_1.adminProcedure
        .input(tickets_schemas_1.deleteTicketInputSchema)
        .mutation(async ({ input, ctx }) => {
        return (0, tickets_services_1.deleteTicketService)({ input, ctx });
    }),
    // Add a comment to a ticket
    addComment: procedures_1.protectedProcedure
        .input(tickets_schemas_1.addCommentInputSchema)
        .mutation(async ({ input, ctx }) => {
        return (0, tickets_services_1.addCommentService)({ input, ctx });
    }),
    // Add an attachment to a ticket
    addAttachment: procedures_1.protectedProcedure
        .input(tickets_schemas_1.addAttachmentInputSchema)
        .mutation(async ({ input, ctx }) => {
        return (0, tickets_services_1.addAttachmentService)({ input, ctx });
    }),
    // Delete an attachment
    deleteAttachment: procedures_1.protectedProcedure
        .input(tickets_schemas_1.deleteAttachmentInputSchema)
        .mutation(async ({ input, ctx }) => {
        return (0, tickets_services_1.deleteAttachmentService)({ input, ctx });
    })
});
//# sourceMappingURL=tickets.routers.js.map