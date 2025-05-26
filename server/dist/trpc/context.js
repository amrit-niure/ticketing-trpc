"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTRPCContext = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
// Create context
const createTRPCContext = async ({ req, res }) => {
    // Get user from token if present
    let user = null;
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            user = await index_1.prisma.user.findUnique({
                where: { id: decoded.userId },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                }
            });
        }
        catch (error) {
            // Token is invalid, but we'll allow unauthenticated requests for public procedures
        }
    }
    return {
        req,
        res,
        user,
        prisma: index_1.prisma,
    };
};
exports.createTRPCContext = createTRPCContext;
//# sourceMappingURL=context.js.map