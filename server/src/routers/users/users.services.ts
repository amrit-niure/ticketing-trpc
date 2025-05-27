import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { sanitizeUser } from '../../utils/helpers';
import type {
  GetAllUsersInput,
  GetUserByIdInput,
  CreateUserInput,
  UpdateUserInput,
  DeleteUserInput,
  UpdateProfileInput,
} from './users.schemas';
import { Context } from '../../trpc';


export const getAllUsersService = async ({
  input,
  ctx,
}: {
  input: GetAllUsersInput;
  ctx: Context;
}) => {
  const { page, limit, search, role } = input;
  const skip = (page - 1) * limit;

  const where: any = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
    }),
    ...(role && { role }),
  };

  const [users, total] = await Promise.all([
    ctx.prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            assignedTickets: true,
            createdTickets: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    ctx.prisma.user.count({ where }),
  ]);

  return {
    users,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      page,
      limit,
    },
  };
};

export const getUserByIdService = async ({
  input,
  ctx,
}: {
  input: GetUserByIdInput;
  ctx: Context;
}) => {
  const user = await ctx.prisma.user.findUnique({
    where: { id: input.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          assignedTickets: true,
          createdTickets: true,
          comments: true,
        },
      },
    },
  });

  if (!user) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
  }
  return user;
};

export const createUserService = async ({
  input,
  ctx,
}: {
  input: CreateUserInput;
  ctx: Context;
}) => {
  const existingUser = await ctx.prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: 'User with this email already exists',
    });
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  const user = await ctx.prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: input.role,
    },
  });
  return sanitizeUser(user);
};

export const updateUserService = async ({
  input,
  ctx,
}: {
  input: UpdateUserInput;
  ctx: Context;
}) => {
  const { id, password, ...updateData } = input;
  const existingUser = await ctx.prisma.user.findUnique({ where: { id } });

  if (!existingUser) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
  }

  if (input.email && input.email !== existingUser.email) {
    const emailExists = await ctx.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (emailExists) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'User with this email already exists',
      });
    }
  }

  const hashedPassword = password
    ? await bcrypt.hash(password, 10)
    : undefined;
  const user = await ctx.prisma.user.update({
    where: { id },
    data: {
      ...updateData,
      ...(hashedPassword && { password: hashedPassword }),
    },
  });
  return sanitizeUser(user);
};

export const deleteUserService = async ({
  input,
  ctx,
}: {
  input: DeleteUserInput;
  ctx: Context;
}) => {
  const user = await ctx.prisma.user.findUnique({ where: { id: input.id } });

  if (!user) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
  }
  if (user.id === ctx.user!.id) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'You cannot delete your own account',
    });
  }

  await ctx.prisma.user.delete({ where: { id: input.id } });
  return { success: true };
};

export const updateProfileService = async ({
  input,
  ctx,
}: {
  input: UpdateProfileInput;
  ctx: Context;
}) => {
  const { currentPassword, newPassword, ...updateData } = input;

  if (newPassword) {
    if (!currentPassword) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Current password is required to change password',
      });
    }
    const userFromDb = await ctx.prisma.user.findUnique({
      where: { id: ctx.user!.id },
    });
    if (
      !userFromDb ||
      !(await bcrypt.compare(currentPassword, userFromDb.password))
    ) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Current password is incorrect',
      });
    }
  }

  if (input.email && input.email !== ctx.user!.email) {
    const emailExists = await ctx.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (emailExists) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'User with this email already exists',
      });
    }
  }

  const hashedPassword = newPassword
    ? await bcrypt.hash(newPassword, 10)
    : undefined;
  const updatedUser = await ctx.prisma.user.update({
    where: { id: ctx.user!.id },
    data: {
      ...updateData,
      ...(hashedPassword && { password: hashedPassword }),
    },
  });
  return sanitizeUser(updatedUser);
};
