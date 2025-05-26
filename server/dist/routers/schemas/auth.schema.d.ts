export declare const authRouter: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    login: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            email: string;
            password: string;
        };
        output: {
            token: string;
            user: any;
        };
    }>;
    register: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            email: string;
            name: string;
            password: string;
        };
        output: {
            token: string;
            user: any;
        };
    }>;
    me: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: any;
    }>;
    refreshToken: import("@trpc/server").TRPCMutationProcedure<{
        input: void;
        output: {
            token: string;
            user: any;
        };
    }>;
}>>;
//# sourceMappingURL=auth.schema.d.ts.map