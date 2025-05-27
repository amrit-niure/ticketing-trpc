// backend/src/routers/index.ts
import { router } from '../trpc';
import { authRouter } from './auth/auth.routers';
import { userRouter } from './users/users.routers';
import { ticketsRouter } from './tickets/tickets.routers';
import { projectRouter } from './projects/projects.routers';

// Main app router
export const appRouter = router({
    auth: authRouter,
    users: userRouter,
    tickets: ticketsRouter,
    projects: projectRouter,
});

export type AppRouter = typeof appRouter;

// Re-export the context creation function
export { createTRPCContext } from '../trpc';
