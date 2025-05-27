import { z } from 'zod';
import { ProjectStatus, Project } from '@prisma/client';

export const getAllProjectsInputSchema = z.object({
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(10),
    search: z.string().optional(),
    status: z.nativeEnum(ProjectStatus).optional(),
});

export type IProject = Project;
export type GetAllProjectsInput = z.infer<typeof getAllProjectsInputSchema>;

export const getProjectByIdInputSchema = z.object({
    id: z.string(),
});
export type GetProjectByIdInput = z.infer<typeof getProjectByIdInputSchema>;

export const createProjectInputSchema = z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().optional(),
    status: z.nativeEnum(ProjectStatus).default('ACTIVE'),
});
export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;

export const updateProjectInputSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Project name is required').optional(),
    description: z.string().optional(),
    status: z.nativeEnum(ProjectStatus).optional(),
});
export type UpdateProjectInput = z.infer<typeof updateProjectInputSchema>;

export const deleteProjectInputSchema = z.object({
    id: z.string(),
});
export type DeleteProjectInput = z.infer<typeof deleteProjectInputSchema>;

export const getProjectStatsInputSchema = z.object({});
export type GetProjectStatsInput = z.infer<typeof getProjectStatsInputSchema>;
