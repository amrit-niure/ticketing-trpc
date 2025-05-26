"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentProcedure = exports.adminProcedure = exports.protectedProcedure = exports.publicProcedure = exports.router = void 0;
// server/src/trpc/procedures.ts
const init_1 = require("./init");
const middleware_1 = require("./middleware");
// Export router and base procedures
exports.router = init_1.t.router;
exports.publicProcedure = init_1.t.procedure;
exports.protectedProcedure = init_1.t.procedure.use(middleware_1.isAuthenticated);
exports.adminProcedure = init_1.t.procedure.use(middleware_1.isAuthenticated).use(middleware_1.isAdmin);
exports.agentProcedure = init_1.t.procedure.use(middleware_1.isAuthenticated).use(middleware_1.isAgentOrAdmin);
//# sourceMappingURL=procedures.js.map