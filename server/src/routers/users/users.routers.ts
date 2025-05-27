import { router, protectedProcedure, adminProcedure } from '../../trpc';
import {
  getAllUsersInputSchema,
  getUserByIdInputSchema,
  createUserInputSchema,
  updateUserInputSchema,
  deleteUserInputSchema,
  updateProfileInputSchema,
} from './users.schemas';
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
  updateProfileService,
} from './users.services';

export const userRouter = router({
  getAll: adminProcedure
    .input(getAllUsersInputSchema)
    .query(({ input, ctx }) => getAllUsersService({ input, ctx })),

  getById: adminProcedure
    .input(getUserByIdInputSchema)
    .query(({ input, ctx }) => getUserByIdService({ input, ctx })),

  create: adminProcedure
    .input(createUserInputSchema)
    .mutation(({ input, ctx }) => createUserService({ input, ctx })),

  update: adminProcedure
    .input(updateUserInputSchema)
    .mutation(({ input, ctx }) => updateUserService({ input, ctx })),

  delete: adminProcedure
    .input(deleteUserInputSchema)
    .mutation(({ input, ctx }) => deleteUserService({ input, ctx })),

  updateProfile: protectedProcedure
    .input(updateProfileInputSchema)
    .mutation(({ input, ctx }) => updateProfileService({ input, ctx })),
});
