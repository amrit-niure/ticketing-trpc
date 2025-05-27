"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileService = exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserByIdService = exports.getAllUsersService = void 0;
const server_1 = require("@trpc/server");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("../../utils/helpers");
const getAllUsersService = async ({ input, ctx, }) => {
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
};
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = async ({ input, ctx, }) => {
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
        throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
    }
    return user;
};
exports.getUserByIdService = getUserByIdService;
const createUserService = async ({ input, ctx, }) => {
    const existingUser = await ctx.prisma.user.findUnique({
        where: { email: input.email },
    });
    if (existingUser) {
        throw new server_1.TRPCError({
            code: 'CONFLICT',
            message: 'User with this email already exists',
        });
    }
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
};
exports.createUserService = createUserService;
const updateUserService = async ({ input, ctx, }) => {
    const { id, password, ...updateData } = input;
    const existingUser = await ctx.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
        throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
    }
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
    const hashedPassword = password
        ? await bcryptjs_1.default.hash(password, 10)
        : undefined;
    const user = await ctx.prisma.user.update({
        where: { id },
        data: {
            ...updateData,
            ...(hashedPassword && { password: hashedPassword }),
        },
    });
    return (0, helpers_1.sanitizeUser)(user);
};
exports.updateUserService = updateUserService;
const deleteUserService = async ({ input, ctx, }) => {
    const user = await ctx.prisma.user.findUnique({ where: { id: input.id } });
    if (!user) {
        throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
    }
    if (user.id === ctx.user.id) {
        throw new server_1.TRPCError({
            code: 'BAD_REQUEST',
            message: 'You cannot delete your own account',
        });
    }
    await ctx.prisma.user.delete({ where: { id: input.id } });
    return { success: true };
};
exports.deleteUserService = deleteUserService;
const updateProfileService = async ({ input, ctx, }) => {
    const { currentPassword, newPassword, ...updateData } = input;
    if (newPassword) {
        if (!currentPassword) {
            throw new server_1.TRPCError({
                code: 'BAD_REQUEST',
                message: 'Current password is required to change password',
            });
        }
        const userFromDb = await ctx.prisma.user.findUnique({
            where: { id: ctx.user.id },
        });
        if (!userFromDb ||
            !(await bcryptjs_1.default.compare(currentPassword, userFromDb.password))) {
            throw new server_1.TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Current password is incorrect',
            });
        }
    }
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
    const hashedPassword = newPassword
        ? await bcryptjs_1.default.hash(newPassword, 10)
        : undefined;
    const updatedUser = await ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: {
            ...updateData,
            ...(hashedPassword && { password: hashedPassword }),
        },
    });
    return (0, helpers_1.sanitizeUser)(updatedUser);
};
exports.updateProfileService = updateProfileService;
//# sourceMappingURL=users.services.js.map