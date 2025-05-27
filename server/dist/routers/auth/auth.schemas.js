"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenOutput = exports.refreshTokenOutput = exports.authOutput = exports.userOutput = exports.validateTokenInput = exports.registerInput = exports.loginInput = void 0;
const zod_1 = require("zod");
// Input schemas
exports.loginInput = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(1, "Password is required")
});
exports.registerInput = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    role: zod_1.z.enum(["USER", "AGENT", "ADMIN"]).optional().default("USER")
});
exports.validateTokenInput = zod_1.z.object({
    token: zod_1.z.string().optional()
});
// Output schemas
exports.userOutput = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    role: zod_1.z.enum(["USER", "AGENT", "ADMIN"]),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
exports.authOutput = zod_1.z.object({
    token: zod_1.z.string(),
    user: exports.userOutput,
    message: zod_1.z.string().optional()
});
exports.refreshTokenOutput = zod_1.z.object({
    token: zod_1.z.string(),
    user: exports.userOutput
});
exports.validateTokenOutput = zod_1.z.object({
    user: exports.userOutput,
    valid: zod_1.z.boolean()
});
//# sourceMappingURL=auth.schemas.js.map