"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectStatsInputSchema = exports.deleteProjectInputSchema = exports.updateProjectInputSchema = exports.createProjectInputSchema = exports.getProjectByIdInputSchema = exports.getAllProjectsInputSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.getAllProjectsInputSchema = zod_1.z.object({
    page: zod_1.z.number().min(1).default(1),
    limit: zod_1.z.number().min(1).max(100).default(10),
    search: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(client_1.ProjectStatus).optional(),
});
exports.getProjectByIdInputSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.createProjectInputSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Project name is required'),
    description: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(client_1.ProjectStatus).default('ACTIVE'),
});
exports.updateProjectInputSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1, 'Project name is required').optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(client_1.ProjectStatus).optional(),
});
exports.deleteProjectInputSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.getProjectStatsInputSchema = zod_1.z.object({});
//# sourceMappingURL=projects.schemas.js.map