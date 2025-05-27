// server/src/trpc/middleware.ts
import { TRPCError } from '@trpc/server';
import { t } from './init';

// Auth middleware
export const isAuthenticated = t.middleware(({ ctx, next }) => {
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
export const isAdmin = t.middleware(({ ctx, next }) => {
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

// Agent or Admin middleware
export const isAgentOrAdmin = t.middleware(({ ctx, next }) => {
    if (!ctx.user || (ctx.user.role !== 'AGENT' && ctx.user.role !== 'ADMIN')) {
        throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You must be an agent or admin to access this resource',
        });
    }
    return next({
        ctx: {
            ...ctx,
            user: ctx.user,
        },
    });
});
