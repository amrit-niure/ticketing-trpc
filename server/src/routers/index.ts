// backend/src/routers/index.ts
import { router } from './trpc';
import { authRouter } from './auth';
import { userRouter } from './users';

// Main app router
export const appRouter = router({
    auth: authRouter,
    users: userRouter,
});

export type AppRouter = typeof appRouter;

// Re-export the context creation function
export { createTRPCContext } from './trpc';
