"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = exports.ticketRouter = exports.userRouter = exports.authRouter = void 0;
// server/src/routers/schemas/index.ts
var auth_schema_1 = require("./auth.schema");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return auth_schema_1.authRouter; } });
var users_schema_1 = require("./users.schema");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return users_schema_1.userRouter; } });
var tickets_schema_1 = require("./tickets.schema");
Object.defineProperty(exports, "ticketRouter", { enumerable: true, get: function () { return tickets_schema_1.ticketRouter; } });
var projects_schema_1 = require("./projects.schema");
Object.defineProperty(exports, "projectRouter", { enumerable: true, get: function () { return projects_schema_1.projectRouter; } });
//# sourceMappingURL=index.js.map