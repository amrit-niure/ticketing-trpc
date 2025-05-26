"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
// server/src/routers/schemas/users.schema.ts
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const trpc_1 = require("../../trpc");
const helpers_1 = require("../../utils/helpers");
exports.userRouter = (0, trpc_1.router)({
    // Get all users (admin only)
    getAll: trpc_1.adminProcedure
        .input(zod_1.z.object({
        page: zod_1.z.number().min(1).default(1),
        limit: zod_1.z.number().min(1).max(100).default(10),
        search: zod_1.z.string().optional(),
        role: zod_1.z.enum(['ADMIN', 'AGENT', 'USER']).optional(),
    }))
        .query(async ({ input, ctx }) => {
        const { page, limit, search, role } = input;
        const skip = (page - 1) * limit;
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(role && { role }),
        };
        const [users, total] = await Promise.all([
            ctx.prisma.user.findMany({
                where,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: {
                        select: {
                            assignedTickets: true,
                            createdTickets: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            ctx.prisma.user.count({ where }),
        ]);
        return {
            users,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit,
            },
        };
    }),
    // Get user by ID (admin only)
    getById: trpc_1.adminProcedure
        .input(zod_1.z.object({ id: zod_1.z.string() }))
        .query(async ({ input, ctx }) => {
        const user = await ctx.prisma.user.findUnique({
            where: { id: input.id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        assignedTickets: true,
                        createdTickets: true,
                        comments: true,
                    },
                },
            },
        });
        if (!user) {
            throw new server_1.TRPCError({
                code: 'NOT_FOUND',
                message: 'User not found',
            });
        }
        return user;
    }),
    // Create user (admin only)
    create: trpc_1.adminProcedure
        .input(zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
        role: zod_1.z.enum(['ADMIN', 'AGENT', 'USER']).default('USER'),
    }))
        .mutation(async ({ input, ctx }) => {
        // Check if user already exists
        const existingUser = await ctx.prisma.user.findUnique({
            where: { email: input.email },
        });
        if (existingUser) {
            throw new server_1.TRPCError({
                code: 'CONFLICT',
                message: 'User with this email already exists',
            });
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(input.password, 10);
        const user = await ctx.prisma.user.create({
            data: {
                name: input.name,
                email: input.email,
                password: hashedPassword,
                role: input.role,
            },
        });
        return (0, helpers_1.sanitizeUser)(user);
    }),
    // Update user (admin only)
    update: trpc_1.adminProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string().min(1, 'Name is required').optional(),
        email: zod_1.z.string().email('Invalid email address').optional(),
        role: zod_1.z.enum(['ADMIN', 'AGENT', 'USER']).optional(),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters').optional(),
    }))
        .mutation(async ({ input, ctx }) => {
        const { id, password, ...updateData } = input;
        // Check if user exists
        const existingUser = await ctx.prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            throw new server_1.TRPCError({
                code: 'NOT_FOUND',
                message: 'User not found',
            });
        }
        // Check email uniqueness if email is being updated
        if (input.email && input.email !== existingUser.email) {
            const emailExists = await ctx.prisma.user.findUnique({
                where: { email: input.email },
            });
            if (emailExists) {
                throw new server_1.TRPCError({
                    code: 'CONFLICT',
                    message: 'User with this email already exists',
                });
            }
        }
        // Hash password if provided
        const hashedPassword = password ? await bcryptjs_1.default.hash(password, 10) : undefined;
        const user = await ctx.prisma.user.update({
            where: { id },
            data: {
                ...updateData,
                ...(hashedPassword && { password: hashedPassword }),
            },
        });
        return (0, helpers_1.sanitizeUser)(user);
    }),
    // Delete user (admin only)
    delete: trpc_1.adminProcedure
        .input(zod_1.z.object({ id: zod_1.z.string() }))
        .mutation(async ({ input, ctx }) => {
        const user = await ctx.prisma.user.findUnique({
            where: { id: input.id },
        });
        if (!user) {
            throw new server_1.TRPCError({
                code: 'NOT_FOUND',
                message: 'User not found',
            });
        }
        // Prevent admin from deleting themselves
        if (user.id === ctx.user.id) {
            throw new server_1.TRPCError({
                code: 'BAD_REQUEST',
                message: 'You cannot delete your own account',
            });
        }
        await ctx.prisma.user.delete({
            where: { id: input.id },
        });
        return { success: true };
    }),
    // Update current user profile
    updateProfile: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required').optional(),
        email: zod_1.z.string().email('Invalid email address').optional(),
        currentPassword: zod_1.z.string().optional(),
        newPassword: zod_1.z.string().min(6, 'Password must be at least 6 characters').optional(),
    }))
        .mutation(async ({ input, ctx }) => {
        const { currentPassword, newPassword, ...updateData } = input;
        // If changing password, verify current password
        if (newPassword) {
            if (!currentPassword) {
                throw new server_1.TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Current password is required to change password',
                });
            }
            const user = await ctx.prisma.user.findUnique({
                where: { id: ctx.user.id },
            });
            if (!user || !(await bcryptjs_1.default.compare(currentPassword, user.password))) {
                throw new server_1.TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Current password is incorrect',
                });
            }
        }
        // Check email uniqueness if email is being updated
        if (input.email && input.email !== ctx.user.email) {
            const emailExists = await ctx.prisma.user.findUnique({
                where: { email: input.email },
            });
            if (emailExists) {
                throw new server_1.TRPCError({
                    code: 'CONFLICT',
                    message: 'User with this email already exists',
                });
            }
        }
        // Hash new password if provided
        const hashedPassword = newPassword ? await bcryptjs_1.default.hash(newPassword, 10) : undefined;
        const user = await ctx.prisma.user.update({
            where: { id: ctx.user.id },
            data: {
                ...updateData,
                ...(hashedPassword && { password: hashedPassword }),
            },
        });
        return (0, helpers_1.sanitizeUser)(user);
    }),
});
//# sourceMappingURL=users.schema.js.map