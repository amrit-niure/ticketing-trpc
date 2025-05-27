import { TRPCError } from "@trpc/server";
import { prisma } from "../../index";
import {
    hashPassword,
    comparePassword,
    generateToken,
    validateEmail,
    sanitizeUser
} from "../../utils/helpers";
import type {
    LoginInput,
    RegisterInput,
    AuthOutput,
    UserOutput,
    RefreshTokenOutput
} from "./auth.schemas";

/**
 * Authenticate user with email and password
 */
export const loginUser = async (input: LoginInput): Promise<AuthOutput> => {
    try {
        const { email, password } = input;

        if (!validateEmail(email)) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Invalid email format"
            });
        }

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (!user) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Invalid credentials"
            });
        }

        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user.id);
        const sanitizedUser = sanitizeUser(user);

        return {
            message: "Login successful",
            token,
            user: sanitizedUser
        };
    } catch (error) {
        if (error instanceof TRPCError) {
            throw error;
        }
        console.error("Login error:", error);
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Login failed"
        });
    }
};

/**
 * Register a new user
 */
export const registerUser = async (input: RegisterInput): Promise<AuthOutput> => {
    try {
        const { email, password, name, role = "USER" } = input;

        if (!validateEmail(email)) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Invalid email format"
            });
        }

        if (password.length < 6) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Password must be at least 6 characters long"
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            throw new TRPCError({
                code: "CONFLICT",
                message: "User with this email already exists"
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                name,
                role
            }
        });

        const token = generateToken(user.id);
        const sanitizedUser = sanitizeUser(user);

        return {
            message: "User created successfully",
            token,
            user: sanitizedUser
        };
    } catch (error) {
        if (error instanceof TRPCError) {
            throw error;
        }
        console.error("Registration error:", error);
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Registration failed"
        });
    }
};

/**
 * Get current user information
 */
export const getCurrentUser = async (userId: string): Promise<UserOutput> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "User not found"
            });
        }

        return sanitizeUser(user);
    } catch (error) {
        if (error instanceof TRPCError) {
            throw error;
        }
        console.error("Get user error:", error);
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to get user information"
        });
    }
};

/**
 * Refresh user token
 */
export const refreshUserToken = async (userId: string): Promise<RefreshTokenOutput> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "User not found"
            });
        }

        const token = generateToken(user.id);
        const sanitizedUser = sanitizeUser(user);

        return {
            token,
            user: sanitizedUser
        };
    } catch (error) {
        if (error instanceof TRPCError) {
            throw error;
        }
        console.error("Token refresh error:", error);
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to refresh token"
        });
    }
};

/**
 * Validate user token and get user info
 */
export const validateUserToken = async (userId: string): Promise<UserOutput> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Invalid token - user not found"
            });
        }

        return sanitizeUser(user);
    } catch (error) {
        if (error instanceof TRPCError) {
            throw error;
        }
        console.error("Token validation error:", error);
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Token validation failed"
        });
    }
};
