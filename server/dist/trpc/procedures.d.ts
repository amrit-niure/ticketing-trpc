export declare const router: <TInput extends import("@trpc/server/dist/unstable-core-do-not-import").CreateRouterOptions>(input: TInput) => import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
}, import("@trpc/server/dist/unstable-core-do-not-import").DecorateCreateRouterOptions<TInput>>;
export declare const publicProcedure: import("@trpc/server/dist/unstable-core-do-not-import").ProcedureBuilder<{
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user: {
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    } | null;
    prisma: import(".prisma/client").PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
}, object, object, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, false>;
export declare const protectedProcedure: import("@trpc/server/dist/unstable-core-do-not-import").ProcedureBuilder<{
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user: {
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    } | null;
    prisma: import(".prisma/client").PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
}, object, {
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user: {
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    };
    prisma: import(".prisma/client").PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
}, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, false>;
export declare const adminProcedure: import("@trpc/server/dist/unstable-core-do-not-import").ProcedureBuilder<{
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user: {
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    } | null;
    prisma: import(".prisma/client").PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
}, object, {
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user: {
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    };
    prisma: import(".prisma/client").PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
}, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, false>;
export declare const agentProcedure: import("@trpc/server/dist/unstable-core-do-not-import").ProcedureBuilder<{
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user: {
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    } | null;
    prisma: import(".prisma/client").PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
}, object, {
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user: {
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    };
    prisma: import(".prisma/client").PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
}, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, false>;
//# sourceMappingURL=procedures.d.ts.map