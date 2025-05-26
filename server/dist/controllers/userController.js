"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.getAllUsers = void 0;
const index_1 = require("../index");
const helpers_1 = require("../utils/helpers");
/**
 * Get all users (for assignee dropdown)
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await index_1.prisma.user.findMany({
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
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllUsers = getAllUsers;
/**
 * Get user profile
 */
const getUserProfile = async (req, res) => {
    try {
        const user = await index_1.prisma.user.findUnique({
            where: { id: req.user.id },
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
        const sanitizedUser = (0, helpers_1.sanitizeUser)(user);
        res.json(sanitizedUser);
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=userController.js.map