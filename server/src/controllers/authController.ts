import { Request, Response } from 'express';
import { prisma } from '../index';
import { hashPassword, comparePassword, generateToken, validateEmail, sanitizeUser } from '../utils/helpers';

/**
 * Login a user
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        if (!validateEmail(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = generateToken(user.id);
        const sanitizedUser = sanitizeUser(user);

        res.json({
            message: 'Login successful',
            token,
            user: sanitizedUser
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name, role = 'AGENT' } = req.body;

        if (!email || !password || !name) {
            res.status(400).json({ error: 'Email, password, and name are required' });
            return;
        }

        if (!validateEmail(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ error: 'Password must be at least 6 characters long' });
            return;
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            res.status(409).json({ error: 'User already exists' });
            return;
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                name,
                role
            }
        });

        const token = generateToken(user.id);
        const sanitizedUser = sanitizeUser(user);

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: sanitizedUser
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Validate user's token and return user information
 */
export const validateToken = async (req: Request, res: Response): Promise<void> => {
    try {
        // The user object is attached to the request by the authenticateToken middleware
        const user = (req as any).user;

        if (!user) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }

        const fullUser = await prisma.user.findUnique({
            where: { id: user.id }
        });

        if (!fullUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const sanitizedUser = sanitizeUser(fullUser);
        res.json({ user: sanitizedUser });
    } catch (error) {
        console.error('Token validation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
