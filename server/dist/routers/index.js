"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTRPCContext = exports.appRouter = void 0;
// backend/src/routers/index.ts
const trpc_1 = require("../trpc");
const auth_routers_1 = require("./auth/auth.routers");
const users_routers_1 = require("./users/users.routers");
const tickets_routers_1 = require("./tickets/tickets.routers");
const projects_routers_1 = require("./projects/projects.routers");
// Main app router
exports.appRouter = (0, trpc_1.router)({
    auth: auth_routers_1.authRouter,
    users: users_routers_1.userRouter,
    tickets: tickets_routers_1.ticketsRouter,
    projects: projects_routers_1.projectRouter,
});
// Re-export the context creation function
var trpc_2 = require("../trpc");
Object.defineProperty(exports, "createTRPCContext", { enumerable: true, get: function () { return trpc_2.createTRPCContext; } });
//# sourceMappingURL=index.js.map