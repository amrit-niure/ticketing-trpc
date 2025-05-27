import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
export declare const createTRPCContext: ({ req, res }: CreateExpressContextOptions) => Promise<{
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user: {
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    } | null;
    prisma: import(".prisma/client").PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
}>;
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
//# sourceMappingURL=context.d.ts.map