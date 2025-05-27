import type { GetAllUsersInput, GetUserByIdInput, CreateUserInput, UpdateUserInput, DeleteUserInput, UpdateProfileInput } from './users.schemas';
import { Context } from '../../trpc';
export declare const getAllUsersService: ({ input, ctx, }: {
    input: GetAllUsersInput;
    ctx: Context;
}) => Promise<{
    users: {
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            assignedTickets: number;
            createdTickets: number;
        };
    }[];
    pagination: {
        total: number;
        pages: number;
        page: number;
        limit: number;
    };
}>;
export declare const getUserByIdService: ({ input, ctx, }: {
    input: GetUserByIdInput;
    ctx: Context;
}) => Promise<{
    id: string;
    email: string;
    name: string;
    role: import(".prisma/client").$Enums.Role;
    createdAt: Date;
    updatedAt: Date;
    _count: {
        assignedTickets: number;
        createdTickets: number;
        comments: number;
    };
}>;
export declare const createUserService: ({ input, ctx, }: {
    input: CreateUserInput;
    ctx: Context;
}) => Promise<any>;
export declare const updateUserService: ({ input, ctx, }: {
    input: UpdateUserInput;
    ctx: Context;
}) => Promise<any>;
export declare const deleteUserService: ({ input, ctx, }: {
    input: DeleteUserInput;
    ctx: Context;
}) => Promise<{
    success: boolean;
}>;
export declare const updateProfileService: ({ input, ctx, }: {
    input: UpdateProfileInput;
    ctx: Context;
}) => Promise<any>;
//# sourceMappingURL=users.services.d.ts.map