"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const trpc_1 = require("../../trpc");
const projects_schemas_1 = require("./projects.schemas");
const projects_services_1 = require("./projects.services");
exports.projectRouter = (0, trpc_1.router)({
    getAll: trpc_1.protectedProcedure
        .input(projects_schemas_1.getAllProjectsInputSchema)
        .query(({ input, ctx }) => (0, projects_services_1.getAllProjectsService)({ input, ctx })),
    getById: trpc_1.protectedProcedure
        .input(projects_schemas_1.getProjectByIdInputSchema)
        .query(({ input, ctx }) => (0, projects_services_1.getProjectByIdService)({ input, ctx })),
    create: trpc_1.agentProcedure
        .input(projects_schemas_1.createProjectInputSchema)
        .mutation(({ input, ctx }) => (0, projects_services_1.createProjectService)({ input, ctx })),
    update: trpc_1.agentProcedure
        .input(projects_schemas_1.updateProjectInputSchema)
        .mutation(({ input, ctx }) => (0, projects_services_1.updateProjectService)({ input, ctx })),
    delete: trpc_1.adminProcedure
        .input(projects_schemas_1.deleteProjectInputSchema)
        .mutation(({ input, ctx }) => (0, projects_services_1.deleteProjectService)({ input, ctx })),
    getStats: trpc_1.agentProcedure
        .input(projects_schemas_1.getProjectStatsInputSchema)
        .query(({ input, ctx }) => (0, projects_services_1.getProjectStatsService)({ input, ctx })),
});
//# sourceMappingURL=projects.routers.js.map