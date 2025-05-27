"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentProcedure = exports.adminProcedure = exports.protectedProcedure = exports.publicProcedure = exports.router = exports.isAgentOrAdmin = exports.isAdmin = exports.isAuthenticated = exports.t = exports.createTRPCContext = void 0;
// server/src/trpc/index.ts
var context_1 = require("./context");
Object.defineProperty(exports, "createTRPCContext", { enumerable: true, get: function () { return context_1.createTRPCContext; } });
var init_1 = require("./init");
Object.defineProperty(exports, "t", { enumerable: true, get: function () { return init_1.t; } });
var middleware_1 = require("./middleware");
Object.defineProperty(exports, "isAuthenticated", { enumerable: true, get: function () { return middleware_1.isAuthenticated; } });
Object.defineProperty(exports, "isAdmin", { enumerable: true, get: function () { return middleware_1.isAdmin; } });
Object.defineProperty(exports, "isAgentOrAdmin", { enumerable: true, get: function () { return middleware_1.isAgentOrAdmin; } });
var procedures_1 = require("./procedures");
Object.defineProperty(exports, "router", { enumerable: true, get: function () { return procedures_1.router; } });
Object.defineProperty(exports, "publicProcedure", { enumerable: true, get: function () { return procedures_1.publicProcedure; } });
Object.defineProperty(exports, "protectedProcedure", { enumerable: true, get: function () { return procedures_1.protectedProcedure; } });
Object.defineProperty(exports, "adminProcedure", { enumerable: true, get: function () { return procedures_1.adminProcedure; } });
Object.defineProperty(exports, "agentProcedure", { enumerable: true, get: function () { return procedures_1.agentProcedure; } });
//# sourceMappingURL=index.js.map