import { router, publicProcedure, protectedProcedure } from "../../trpc";
import {
    loginInput,
    registerInput,
    authOutput,
    userOutput,
    refreshTokenOutput
} from "./auth.schemas";
import {
    loginUser,
    registerUser,
    getCurrentUser,
    refreshUserToken,
    validateUserToken
} from "./auth.services";

export const authRouter = router({
    // Login user (public route)
    login: publicProcedure
        .input(loginInput)
        .output(authOutput)
        .mutation(async ({ input }) => {
            return loginUser(input);
        }),

    // Register new user (public route)
    register: publicProcedure
        .input(registerInput)
        .output(authOutput)
        .mutation(async ({ input }) => {
            return registerUser(input);
        }),

    // Get current user profile (protected route)
    me: protectedProcedure
        .output(userOutput)
        .query(async ({ ctx }) => {
            return getCurrentUser(ctx.user.id);
        }),

    // Refresh authentication token (protected route)
    refreshToken: protectedProcedure
        .output(refreshTokenOutput)
        .mutation(async ({ ctx }) => {
            return refreshUserToken(ctx.user.id);
        }),

    // Validate token and get user info (protected route)
    validate: protectedProcedure
        .output(userOutput)
        .query(async ({ ctx }) => {
            return validateUserToken(ctx.user.id);
        })
});
