import { z } from "zod";

// Input schemas
export const loginInput = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
});

export const registerInput = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["USER", "AGENT", "ADMIN"]).optional().default("USER")
});

export const validateTokenInput = z.object({
    token: z.string().optional()
});

// Output schemas
export const userOutput = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.enum(["USER", "AGENT", "ADMIN"]),
    createdAt: z.date(),
    updatedAt: z.date()
});

export const authOutput = z.object({
    token: z.string(),
    user: userOutput,
    message: z.string().optional()
});

export const refreshTokenOutput = z.object({
    token: z.string(),
    user: userOutput
});

export const validateTokenOutput = z.object({
    user: userOutput,
    valid: z.boolean()
});

// Type exports
export type LoginInput = z.infer<typeof loginInput>;
export type RegisterInput = z.infer<typeof registerInput>;
export type ValidateTokenInput = z.infer<typeof validateTokenInput>;
export type UserOutput = z.infer<typeof userOutput>;
export type AuthOutput = z.infer<typeof authOutput>;
export type RefreshTokenOutput = z.infer<typeof refreshTokenOutput>;
export type ValidateTokenOutput = z.infer<typeof validateTokenOutput>;
