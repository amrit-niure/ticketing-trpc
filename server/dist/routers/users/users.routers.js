"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const trpc_1 = require("../../trpc");
const users_schemas_1 = require("./users.schemas");
const users_services_1 = require("./users.services");
exports.userRouter = (0, trpc_1.router)({
    getAll: trpc_1.adminProcedure
        .input(users_schemas_1.getAllUsersInputSchema)
        .query(({ input, ctx }) => (0, users_services_1.getAllUsersService)({ input, ctx })),
    getById: trpc_1.adminProcedure
        .input(users_schemas_1.getUserByIdInputSchema)
        .query(({ input, ctx }) => (0, users_services_1.getUserByIdService)({ input, ctx })),
    create: trpc_1.adminProcedure
        .input(users_schemas_1.createUserInputSchema)
        .mutation(({ input, ctx }) => (0, users_services_1.createUserService)({ input, ctx })),
    update: trpc_1.adminProcedure
        .input(users_schemas_1.updateUserInputSchema)
        .mutation(({ input, ctx }) => (0, users_services_1.updateUserService)({ input, ctx })),
    delete: trpc_1.adminProcedure
        .input(users_schemas_1.deleteUserInputSchema)
        .mutation(({ input, ctx }) => (0, users_services_1.deleteUserService)({ input, ctx })),
    updateProfile: trpc_1.protectedProcedure
        .input(users_schemas_1.updateProfileInputSchema)
        .mutation(({ input, ctx }) => (0, users_services_1.updateProfileService)({ input, ctx })),
});
//# sourceMappingURL=users.routers.js.map