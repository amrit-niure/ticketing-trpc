import { z } from 'zod';
export declare const getAllUsersInputSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodNativeEnum<{
        ADMIN: "ADMIN";
        AGENT: "AGENT";
        USER: "USER";
    }>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    role?: "ADMIN" | "AGENT" | "USER" | undefined;
    search?: string | undefined;
}, {
    role?: "ADMIN" | "AGENT" | "USER" | undefined;
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type GetAllUsersInput = z.infer<typeof getAllUsersInputSchema>;
export declare const getUserByIdInputSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type GetUserByIdInput = z.infer<typeof getUserByIdInputSchema>;
export declare const createUserInputSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodNativeEnum<{
        ADMIN: "ADMIN";
        AGENT: "AGENT";
        USER: "USER";
    }>>;
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
export type CreateUserInput = z.infer<typeof createUserInputSchema>;
export declare const updateUserInputSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodNativeEnum<{
        ADMIN: "ADMIN";
        AGENT: "AGENT";
        USER: "USER";
    }>>;
    password: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email?: string | undefined;
    name?: string | undefined;
    password?: string | undefined;
    role?: "ADMIN" | "AGENT" | "USER" | undefined;
}, {
    id: string;
    email?: string | undefined;
    name?: string | undefined;
    password?: string | undefined;
    role?: "ADMIN" | "AGENT" | "USER" | undefined;
}>;
export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;
export declare const deleteUserInputSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type DeleteUserInput = z.infer<typeof deleteUserInputSchema>;
export declare const updateProfileInputSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    currentPassword: z.ZodOptional<z.ZodString>;
    newPassword: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    name?: string | undefined;
    currentPassword?: string | undefined;
    newPassword?: string | undefined;
}, {
    email?: string | undefined;
    name?: string | undefined;
    currentPassword?: string | undefined;
    newPassword?: string | undefined;
}>;
export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;
//# sourceMappingURL=users.schemas.d.ts.map