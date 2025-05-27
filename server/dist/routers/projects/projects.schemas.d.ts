import { z } from 'zod';
export declare const getAllProjectsInputSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<{
        ACTIVE: "ACTIVE";
        COMPLETED: "COMPLETED";
        ARCHIVED: "ARCHIVED";
    }>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    search?: string | undefined;
    status?: "ACTIVE" | "COMPLETED" | "ARCHIVED" | undefined;
}, {
    search?: string | undefined;
    status?: "ACTIVE" | "COMPLETED" | "ARCHIVED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type GetAllProjectsInput = z.infer<typeof getAllProjectsInputSchema>;
export declare const getProjectByIdInputSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type GetProjectByIdInput = z.infer<typeof getProjectByIdInputSchema>;
export declare const createProjectInputSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodNativeEnum<{
        ACTIVE: "ACTIVE";
        COMPLETED: "COMPLETED";
        ARCHIVED: "ARCHIVED";
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status: "ACTIVE" | "COMPLETED" | "ARCHIVED";
    description?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    status?: "ACTIVE" | "COMPLETED" | "ARCHIVED" | undefined;
}>;
export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;
export declare const updateProjectInputSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<{
        ACTIVE: "ACTIVE";
        COMPLETED: "COMPLETED";
        ARCHIVED: "ARCHIVED";
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name?: string | undefined;
    description?: string | undefined;
    status?: "ACTIVE" | "COMPLETED" | "ARCHIVED" | undefined;
}, {
    id: string;
    name?: string | undefined;
    description?: string | undefined;
    status?: "ACTIVE" | "COMPLETED" | "ARCHIVED" | undefined;
}>;
export type UpdateProjectInput = z.infer<typeof updateProjectInputSchema>;
export declare const deleteProjectInputSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type DeleteProjectInput = z.infer<typeof deleteProjectInputSchema>;
export declare const getProjectStatsInputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export type GetProjectStatsInput = z.infer<typeof getProjectStatsInputSchema>;
//# sourceMappingURL=projects.schemas.d.ts.map