"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAgentOrAdmin = exports.isAdmin = exports.isAuthenticated = void 0;
// server/src/trpc/middleware.ts
const server_1 = require("@trpc/server");
const init_1 = require("./init");
// Auth middleware
exports.isAuthenticated = init_1.t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new server_1.TRPCError({
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
exports.isAdmin = init_1.t.middleware(({ ctx, next }) => {
    if (!ctx.user || ctx.user.role !== 'ADMIN') {
        throw new server_1.TRPCError({
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
exports.isAgentOrAdmin = init_1.t.middleware(({ ctx, next }) => {
    if (!ctx.user || (ctx.user.role !== 'AGENT' && ctx.user.role !== 'ADMIN')) {
        throw new server_1.TRPCError({
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
//# sourceMappingURL=middleware.js.map