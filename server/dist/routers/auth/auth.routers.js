"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const trpc_1 = require("../../trpc");
const auth_schemas_1 = require("./auth.schemas");
const auth_services_1 = require("./auth.services");
exports.authRouter = (0, trpc_1.router)({
    // Login user (public route)
    login: trpc_1.publicProcedure
        .input(auth_schemas_1.loginInput)
        .output(auth_schemas_1.authOutput)
        .mutation(async ({ input }) => {
        return (0, auth_services_1.loginUser)(input);
    }),
    // Register new user (public route)
    register: trpc_1.publicProcedure
        .input(auth_schemas_1.registerInput)
        .output(auth_schemas_1.authOutput)
        .mutation(async ({ input }) => {
        return (0, auth_services_1.registerUser)(input);
    }),
    // Get current user profile (protected route)
    me: trpc_1.protectedProcedure
        .output(auth_schemas_1.userOutput)
        .query(async ({ ctx }) => {
        return (0, auth_services_1.getCurrentUser)(ctx.user.id);
    }),
    // Refresh authentication token (protected route)
    refreshToken: trpc_1.protectedProcedure
        .output(auth_schemas_1.refreshTokenOutput)
        .mutation(async ({ ctx }) => {
        return (0, auth_services_1.refreshUserToken)(ctx.user.id);
    }),
    // Validate token and get user info (protected route)
    validate: trpc_1.protectedProcedure
        .output(auth_schemas_1.userOutput)
        .query(async ({ ctx }) => {
        return (0, auth_services_1.validateUserToken)(ctx.user.id);
    })
});
//# sourceMappingURL=auth.routers.js.map