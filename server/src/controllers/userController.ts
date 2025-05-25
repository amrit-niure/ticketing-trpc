import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';
import { sanitizeUser } from '../utils/helpers';

/**
 * Get all users (for assignee dropdown)
 */
export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            },
            orderBy: { name: 'asc' }
        });

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get user profile
 */
export const getUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.id },
            include: {
                assignedTickets: {
                    select: {
                        id: true,
                        subject: true,
                        status: true,
                        priority: true,
                        createdAt: true
                    }
                },
                createdTickets: {
                    select: {
                        id: true,
                        subject: true,
                        status: true,
                        priority: true,
                        createdAt: true
                    }
                }
            }
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const sanitizedUser = sanitizeUser(user);
        res.json(sanitizedUser);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
