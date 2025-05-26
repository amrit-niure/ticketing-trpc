// backend/src/routers/index.ts
import { router } from '../trpc';
import { authRouter } from './schemas/auth.schema';
import { userRouter } from './schemas/users.schema';
import { ticketRouter } from './schemas/tickets.schema';
import { projectRouter } from './schemas/projects.schema';

// Main app router
export const appRouter = router({
    auth: authRouter,
    users: userRouter,
    tickets: ticketRouter,
    projects: projectRouter,
});

export type AppRouter = typeof appRouter;

// Re-export the context creation function
export { createTRPCContext } from '../trpc';
