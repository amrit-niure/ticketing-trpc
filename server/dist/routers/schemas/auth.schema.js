"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
// server/src/routers/schemas/auth.schema.ts
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const trpc_1 = require("../../trpc");
const helpers_1 = require("../../utils/helpers");
exports.authRouter = (0, trpc_1.router)({
    login: trpc_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(1, 'Password is required'),
    }))
        .mutation(async ({ input, ctx }) => {
        const { email, password } = input;
        // Find user
        const user = await ctx.prisma.user.findUnique({
            where: { email },
        });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            throw new server_1.TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Invalid email or password',
            });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
        return {
            token,
            user: (0, helpers_1.sanitizeUser)(user),
        };
    }),
    register: trpc_1.publicProcedure
        .input(zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
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
                role: 'USER', // Default role
            },
        });
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
        return {
            token,
            user: (0, helpers_1.sanitizeUser)(user),
        };
    }), // Get current user profile
    me: trpc_1.protectedProcedure
        .query(async ({ ctx }) => {
        return (0, helpers_1.sanitizeUser)(ctx.user);
    }),
    // Refresh token
    refreshToken: trpc_1.protectedProcedure
        .mutation(async ({ ctx }) => {
        const token = jsonwebtoken_1.default.sign({ userId: ctx.user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
        return {
            token,
            user: (0, helpers_1.sanitizeUser)(ctx.user),
        };
    }),
});
//# sourceMappingURL=auth.schema.js.map