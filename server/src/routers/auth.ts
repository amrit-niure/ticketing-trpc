// backend/src/routers/auth.ts
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { router, publicProcedure } from './trpc';
import { sanitizeUser } from '../utils/helpers';

export const authRouter = router({
    login: publicProcedure
        .input(
            z.object({
                email: z.string().email('Invalid email address'),
                password: z.string().min(1, 'Password is required'),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { email, password } = input;

            // Find user
            const user = await ctx.prisma.user.findUnique({
                where: { email },
            });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Invalid email or password',
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '7d' }
            );

            return {
                token,
                user: sanitizeUser(user),
            };
        }),

    register: publicProcedure
        .input(
            z.object({
                name: z.string().min(1, 'Name is required'),
                email: z.string().email('Invalid email address'),
                password: z.string().min(6, 'Password must be at least 6 characters'),
            })
        )
        .mutation(async ({ input, ctx }) => {
            // Check if user already exists
            const existingUser = await ctx.prisma.user.findUnique({
                where: { email: input.email },
            });

            if (existingUser) {
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'User with this email already exists',
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(input.password, 10);

            const user = await ctx.prisma.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    password: hashedPassword,
                    role: 'USER', // Default role
                },
            });

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '7d' }
            );

            return {
                token,
                user: sanitizeUser(user),
            };
        }),
});
