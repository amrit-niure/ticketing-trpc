"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUser = exports.validateEmail = exports.createActivityLog = exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const hashPassword = async (password) => {
    const saltRounds = 12;
    return bcryptjs_1.default.hash(password, saltRounds);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hash) => {
    return bcryptjs_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
};
exports.generateToken = generateToken;
const createActivityLog = async (ticketId, userId, action, details) => {
    try {
        await index_1.prisma.activityLog.create({
            data: {
                ticketId,
                userId,
                action,
                details
            }
        });
    }
    catch (error) {
        console.error('Failed to create activity log:', error);
    }
};
exports.createActivityLog = createActivityLog;
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
const sanitizeUser = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
exports.sanitizeUser = sanitizeUser;
//# sourceMappingURL=helpers.js.map