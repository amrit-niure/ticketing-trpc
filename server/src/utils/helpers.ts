import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';
import { ActivityType } from '@prisma/client';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const generateToken = (userId: string): string => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
    );
};

export const createActivityLog = async (
    ticketId: string,
    userId: string,
    action: ActivityType,
    details?: string
) => {
    try {
        await prisma.activityLog.create({
            data: {
                ticketId,
                userId,
                action,
                details
            }
        });
    } catch (error) {
        console.error('Failed to create activity log:', error);
    }
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const sanitizeUser = (user: any) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
