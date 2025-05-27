"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.register = exports.login = void 0;
const index_1 = require("../index");
const helpers_1 = require("../utils/helpers");
/**
 * Login a user
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        if (!(0, helpers_1.validateEmail)(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }
        const user = await index_1.prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const isValidPassword = await (0, helpers_1.comparePassword)(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const token = (0, helpers_1.generateToken)(user.id);
        const sanitizedUser = (0, helpers_1.sanitizeUser)(user);
        res.json({
            message: 'Login successful',
            token,
            user: sanitizedUser
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = login;
/**
 * Register a new user
 */
const register = async (req, res) => {
    try {
        const { email, password, name, role = 'AGENT' } = req.body;
        if (!email || !password || !name) {
            res.status(400).json({ error: 'Email, password, and name are required' });
            return;
        }
        if (!(0, helpers_1.validateEmail)(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ error: 'Password must be at least 6 characters long' });
            return;
        }
        const existingUser = await index_1.prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });
        if (existingUser) {
            res.status(409).json({ error: 'User already exists' });
            return;
        }
        const hashedPassword = await (0, helpers_1.hashPassword)(password);
        const user = await index_1.prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                name,
                role
            }
        });
        const token = (0, helpers_1.generateToken)(user.id);
        const sanitizedUser = (0, helpers_1.sanitizeUser)(user);
        res.status(201).json({
            message: 'User created successfully',
            token,
            user: sanitizedUser
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.register = register;
/**
 * Validate user's token and return user information
 */
const validateToken = async (req, res) => {
    try {
        // The user object is attached to the request by the authenticateToken middleware
        const user = req.user;
        if (!user) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
        const fullUser = await index_1.prisma.user.findUnique({
            where: { id: user.id }
        });
        if (!fullUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const sanitizedUser = (0, helpers_1.sanitizeUser)(fullUser);
        res.json({ user: sanitizedUser });
    }
    catch (error) {
        console.error('Token validation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.validateToken = validateToken;
//# sourceMappingURL=authController.js.map