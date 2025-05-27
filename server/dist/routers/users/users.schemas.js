"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileInputSchema = exports.deleteUserInputSchema = exports.updateUserInputSchema = exports.createUserInputSchema = exports.getUserByIdInputSchema = exports.getAllUsersInputSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.getAllUsersInputSchema = zod_1.z.object({
    page: zod_1.z.number().min(1).default(1),
    limit: zod_1.z.number().min(1).max(100).default(10),
    search: zod_1.z.string().optional(),
    role: zod_1.z.nativeEnum(client_1.Role).optional(),
});
exports.getUserByIdInputSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.createUserInputSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    role: zod_1.z.nativeEnum(client_1.Role).default('USER'),
});
exports.updateUserInputSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1, 'Name is required').optional(),
    email: zod_1.z.string().email('Invalid email address').optional(),
    role: zod_1.z.nativeEnum(client_1.Role).optional(),
    password: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .optional(),
});
exports.deleteUserInputSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.updateProfileInputSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').optional(),
    email: zod_1.z.string().email('Invalid email address').optional(),
    currentPassword: zod_1.z.string().optional(),
    newPassword: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .optional(),
});
//# sourceMappingURL=users.schemas.js.map