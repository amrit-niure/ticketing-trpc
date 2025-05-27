import { Role } from '@prisma/client';
import { z } from 'zod';

export const getAllUsersInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
});
export type GetAllUsersInput = z.infer<typeof getAllUsersInputSchema>;

export const getUserByIdInputSchema = z.object({
  id: z.string(),
});
export type GetUserByIdInput = z.infer<typeof getUserByIdInputSchema>;

export const createUserInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.nativeEnum(Role).default('USER'),
});
export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const updateUserInputSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  role: z.nativeEnum(Role).optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
});
export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

export const deleteUserInputSchema = z.object({
  id: z.string(),
});
export type DeleteUserInput = z.infer<typeof deleteUserInputSchema>;

export const updateProfileInputSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
});
export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;
