"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTRPCContext = exports.appRouter = void 0;
// backend/src/routers/index.ts
const trpc_1 = require("../trpc");
const auth_schema_1 = require("./schemas/auth.schema");
const users_schema_1 = require("./schemas/users.schema");
const tickets_schema_1 = require("./schemas/tickets.schema");
const projects_schema_1 = require("./schemas/projects.schema");
// Main app router
exports.appRouter = (0, trpc_1.router)({
    auth: auth_schema_1.authRouter,
    users: users_schema_1.userRouter,
    tickets: tickets_schema_1.ticketRouter,
    projects: projects_schema_1.projectRouter,
});
// Re-export the context creation function
var trpc_2 = require("../trpc");
Object.defineProperty(exports, "createTRPCContext", { enumerable: true, get: function () { return trpc_2.createTRPCContext; } });
//# sourceMappingURL=index.js.map