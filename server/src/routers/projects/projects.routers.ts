import { router, protectedProcedure, agentProcedure, adminProcedure } from '../../trpc';
import {
    getAllProjectsInputSchema,
    getProjectByIdInputSchema,
    createProjectInputSchema,
    updateProjectInputSchema,
    deleteProjectInputSchema,
    getProjectStatsInputSchema,
} from './projects.schemas';
import {
    getAllProjectsService,
    getProjectByIdService,
    createProjectService,
    updateProjectService,
    deleteProjectService,
    getProjectStatsService,
} from './projects.services';

export const projectRouter = router({
    getAll: protectedProcedure
        .input(getAllProjectsInputSchema)
        .query(({ input, ctx }) => getAllProjectsService({ input, ctx })),

    getById: protectedProcedure
        .input(getProjectByIdInputSchema)
        .query(({ input, ctx }) => getProjectByIdService({ input, ctx })),

    create: agentProcedure
        .input(createProjectInputSchema)
        .mutation(({ input, ctx }) => createProjectService({ input, ctx })),

    update: agentProcedure
        .input(updateProjectInputSchema)
        .mutation(({ input, ctx }) => updateProjectService({ input, ctx })),

    delete: adminProcedure
        .input(deleteProjectInputSchema)
        .mutation(({ input, ctx }) => deleteProjectService({ input, ctx })),

    getStats: agentProcedure
        .input(getProjectStatsInputSchema)
        .query(({ input, ctx }) => getProjectStatsService({ input, ctx })),
});
