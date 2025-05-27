export declare const userRouter: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
    ctx: {
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: import("express").Response<any, Record<string, any>>;
        user: {
            id: string;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
        } | null;
        prisma: import(".prisma/client").PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    };
    meta: object;
    errorShape: import("@trpc/server/dist/unstable-core-do-not-import").DefaultErrorShape;
    transformer: false;
}, import("@trpc/server/dist/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    getAll: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            role?: "ADMIN" | "AGENT" | "USER" | undefined;
            search?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        output: {
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
        };
    }>;
    getById: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: string;
        };
        output: {
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
        };
    }>;
    create: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            email: string;
            name: string;
            password: string;
            role?: "ADMIN" | "AGENT" | "USER" | undefined;
        };
        output: any;
    }>;
    update: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            email?: string | undefined;
            name?: string | undefined;
            password?: string | undefined;
            role?: "ADMIN" | "AGENT" | "USER" | undefined;
        };
        output: any;
    }>;
    delete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
        };
        output: {
            success: boolean;
        };
    }>;
    updateProfile: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            email?: string | undefined;
            name?: string | undefined;
            currentPassword?: string | undefined;
            newPassword?: string | undefined;
        };
        output: any;
    }>;
}>>;
//# sourceMappingURL=users.schema.d.ts.map