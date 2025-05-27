// server/src/trpc/procedures.ts
import { t } from './init';
import { isAuthenticated, isAdmin, isAgentOrAdmin } from './middleware';

// Export router and base procedures
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
export const adminProcedure = t.procedure.use(isAuthenticated).use(isAdmin);
export const agentProcedure = t.procedure.use(isAuthenticated).use(isAgentOrAdmin);
