// server/src/trpc/context.ts
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';

// Create context
export const createTRPCContext = async ({ req, res }: CreateExpressContextOptions) => {
    // Get user from token if present
    let user = null;
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
            user = await prisma.user.findUnique({
                where: { id: decoded.userId },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                }
            });
        } catch (error) {
            // Token is invalid, but we'll allow unauthenticated requests for public procedures
        }
    }

    return {
        req,
        res,
        user,
        prisma,
    };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
