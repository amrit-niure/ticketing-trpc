import { z } from "zod";
export declare const loginInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const registerInput: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodOptional<z.ZodEnum<["USER", "AGENT", "ADMIN"]>>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
    role: "ADMIN" | "AGENT" | "USER";
}, {
    email: string;
    name: string;
    password: string;
    role?: "ADMIN" | "AGENT" | "USER" | undefined;
}>;
export declare const validateTokenInput: z.ZodObject<{
    token: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    token?: string | undefined;
}, {
    token?: string | undefined;
}>;
export declare const userOutput: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<["USER", "AGENT", "ADMIN"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    name: string;
    role: "ADMIN" | "AGENT" | "USER";
    createdAt: Date;
    updatedAt: Date;
}, {
    id: string;
    email: string;
    name: string;
    role: "ADMIN" | "AGENT" | "USER";
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const authOutput: z.ZodObject<{
    token: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        role: z.ZodEnum<["USER", "AGENT", "ADMIN"]>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        name: string;
        role: "ADMIN" | "AGENT" | "USER";
        createdAt: Date;
        updatedAt: Date;
    }, {
        id: string;
        email: string;
        name: string;
        role: "ADMIN" | "AGENT" | "USER";
        createdAt: Date;
        updatedAt: Date;
    }>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    user: {
        id: string;
        email: string;
        name: string;
        role: "ADMIN" | "AGENT" | "USER";
        createdAt: Date;
        updatedAt: Date;
    };
    token: string;
    message?: string | undefined;
}, {
    user: {
        id: string;
        email: string;
        name: string;
        role: "ADMIN" | "AGENT" | "USER";
        createdAt: Date;
        updatedAt: Date;
    };
    token: string;
    message?: string | undefined;
}>;
export declare const refreshTokenOutput: z.ZodObject<{
    token: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        role: z.ZodEnum<["USER", "AGENT", "ADMIN"]>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        name: string;
        role: "ADMIN" | "AGENT" | "USER";
        createdAt: Date;
        updatedAt: Date;
    }, {
        id: string;
        email: string;
        name: string;
        role: "ADMIN" | "AGENT" | "USER";
        createdAt: Date;
        updatedAt: Date;
    }>;
}, "strip", z.ZodTypeAny, {
    user: {
        id: string;
        email: string;
        name: string;
        role: "ADMIN" | "AGENT" | "USER";
        createdAt: Date;
        updatedAt: Date;
    };
    token: string;
}, {
    user: {
        id: string;
        email: string;
        name: string;
        role: "ADMIN" | "AGENT" | "USER";
        createdAt: Date;
        updatedAt: Date;
    };
    token: string;
}>;
export declare const validateTokenOutput: z.ZodObject<{
    user: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        role: z.ZodEnum<["USER", "AGENT", "ADMIN"]>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        name: string;
        role: "ADMIN" | "AGENT" | "USER";
        createdAt: Date;
        updatedAt: Date;
    }, {
        id: string;
        email: string;
        name: string;
        role: "ADMIN" | "AGENT" | "USER";
        createdAt: Date;
        updatedAt: Date;
    }>;
    valid: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    user: {
        id: string;
        email: string;
        name: string;
        role: "ADMIN" | "AGENT" | "USER";
        createdAt: Date;
        updatedAt: Date;
    };
    valid: boolean;
}, {
    user: {
        id: string;
        email: string;
        name: string;
        role: "ADMIN" | "AGENT" | "USER";
        createdAt: Date;
        updatedAt: Date;
    };
    valid: boolean;
}>;
export type LoginInput = z.infer<typeof loginInput>;
export type RegisterInput = z.infer<typeof registerInput>;
export type ValidateTokenInput = z.infer<typeof validateTokenInput>;
export type UserOutput = z.infer<typeof userOutput>;
export type AuthOutput = z.infer<typeof authOutput>;
export type RefreshTokenOutput = z.infer<typeof refreshTokenOutput>;
export type ValidateTokenOutput = z.infer<typeof validateTokenOutput>;
//# sourceMappingURL=auth.schemas.d.ts.map