"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserToken = exports.refreshUserToken = exports.getCurrentUser = exports.registerUser = exports.loginUser = void 0;
const server_1 = require("@trpc/server");
const index_1 = require("../../index");
const helpers_1 = require("../../utils/helpers");
/**
 * Authenticate user with email and password
 */
const loginUser = async (input) => {
    try {
        const { email, password } = input;
        if (!(0, helpers_1.validateEmail)(email)) {
            throw new server_1.TRPCError({
                code: "BAD_REQUEST",
                message: "Invalid email format"
            });
        }
        const user = await index_1.prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });
        if (!user) {
            throw new server_1.TRPCError({
                code: "UNAUTHORIZED",
                message: "Invalid credentials"
            });
        }
        const isValidPassword = await (0, helpers_1.comparePassword)(password, user.password);
        if (!isValidPassword) {
            throw new server_1.TRPCError({
                code: "UNAUTHORIZED",
                message: "Invalid credentials"
            });
        }
        const token = (0, helpers_1.generateToken)(user.id);
        const sanitizedUser = (0, helpers_1.sanitizeUser)(user);
        return {
            message: "Login successful",
            token,
            user: sanitizedUser
        };
    }
    catch (error) {
        if (error instanceof server_1.TRPCError) {
            throw error;
        }
        console.error("Login error:", error);
        throw new server_1.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Login failed"
        });
    }
};
exports.loginUser = loginUser;
/**
 * Register a new user
 */
const registerUser = async (input) => {
    try {
        const { email, password, name, role = "USER" } = input;
        if (!(0, helpers_1.validateEmail)(email)) {
            throw new server_1.TRPCError({
                code: "BAD_REQUEST",
                message: "Invalid email format"
            });
        }
        if (password.length < 6) {
            throw new server_1.TRPCError({
                code: "BAD_REQUEST",
                message: "Password must be at least 6 characters long"
            });
        }
        const existingUser = await index_1.prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });
        if (existingUser) {
            throw new server_1.TRPCError({
                code: "CONFLICT",
                message: "User with this email already exists"
            });
        }
        const hashedPassword = await (0, helpers_1.hashPassword)(password);
        const user = await index_1.prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                name,
                role
            }
        });
        const token = (0, helpers_1.generateToken)(user.id);
        const sanitizedUser = (0, helpers_1.sanitizeUser)(user);
        return {
            message: "User created successfully",
            token,
            user: sanitizedUser
        };
    }
    catch (error) {
        if (error instanceof server_1.TRPCError) {
            throw error;
        }
        console.error("Registration error:", error);
        throw new server_1.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Registration failed"
        });
    }
};
exports.registerUser = registerUser;
/**
 * Get current user information
 */
const getCurrentUser = async (userId) => {
    try {
        const user = await index_1.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            throw new server_1.TRPCError({
                code: "NOT_FOUND",
                message: "User not found"
            });
        }
        return (0, helpers_1.sanitizeUser)(user);
    }
    catch (error) {
        if (error instanceof server_1.TRPCError) {
            throw error;
        }
        console.error("Get user error:", error);
        throw new server_1.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to get user information"
        });
    }
};
exports.getCurrentUser = getCurrentUser;
/**
 * Refresh user token
 */
const refreshUserToken = async (userId) => {
    try {
        const user = await index_1.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            throw new server_1.TRPCError({
                code: "NOT_FOUND",
                message: "User not found"
            });
        }
        const token = (0, helpers_1.generateToken)(user.id);
        const sanitizedUser = (0, helpers_1.sanitizeUser)(user);
        return {
            token,
            user: sanitizedUser
        };
    }
    catch (error) {
        if (error instanceof server_1.TRPCError) {
            throw error;
        }
        console.error("Token refresh error:", error);
        throw new server_1.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to refresh token"
        });
    }
};
exports.refreshUserToken = refreshUserToken;
/**
 * Validate user token and get user info
 */
const validateUserToken = async (userId) => {
    try {
        const user = await index_1.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            throw new server_1.TRPCError({
                code: "UNAUTHORIZED",
                message: "Invalid token - user not found"
            });
        }
        return (0, helpers_1.sanitizeUser)(user);
    }
    catch (error) {
        if (error instanceof server_1.TRPCError) {
            throw error;
        }
        console.error("Token validation error:", error);
        throw new server_1.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Token validation failed"
        });
    }
};
exports.validateUserToken = validateUserToken;
//# sourceMappingURL=auth.services.js.map