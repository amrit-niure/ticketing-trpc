// backend/src/routers/trpc.ts
import { initTRPC, TRPCError } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';

// Create context
export const createTRPCContext = async ({ req, res }: CreateExpressContextOptions) => {
    // Get user from token if present
    let user = null;
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
            user = await prisma.user.findUnique({
                where: { id: decoded.userId },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                }
            });
        } catch (error) {
            // Token is invalid, but we'll allow unauthenticated requests for public procedures
        }
    }

    return {
        req,
        res,
        user,
        prisma,
    };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create();

// Auth middleware
const isAuthenticated = t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to access this resource',
        });
    }
    return next({
        ctx: {
            ...ctx,
            user: ctx.user,
        },
    });
});

// Admin middleware
const isAdmin = t.middleware(({ ctx, next }) => {
    if (!ctx.user || ctx.user.role !== 'ADMIN') {
        throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You must be an admin to access this resource',
        });
    }
    return next({
        ctx: {
            ...ctx,
            user: ctx.user,
        },
    });
});

// Export procedures
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
export const adminProcedure = t.procedure.use(isAuthenticated).use(isAdmin);
