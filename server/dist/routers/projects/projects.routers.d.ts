export declare const projectRouter: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
            search?: string | undefined;
            status?: "ACTIVE" | "COMPLETED" | "ARCHIVED" | undefined;
            page?: number | undefined;
            limit?: number | undefined;
        };
        output: {
            projects: ({
                _count: {
                    tickets: number;
                };
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                status: import(".prisma/client").$Enums.ProjectStatus;
            })[];
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
            _count: {
                tickets: number;
            };
            tickets: ({
                requester: {
                    id: string;
                    name: string;
                };
                assignee: {
                    id: string;
                    email: string;
                    name: string;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                status: import(".prisma/client").$Enums.TicketStatus;
                priority: import(".prisma/client").$Enums.TicketPriority;
                projectId: string;
                assigneeId: string | null;
                subject: string;
                requesterId: string;
            })[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            status: import(".prisma/client").$Enums.ProjectStatus;
        };
    }>;
    create: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name: string;
            description?: string | undefined;
            status?: "ACTIVE" | "COMPLETED" | "ARCHIVED" | undefined;
        };
        output: {
            _count: {
                tickets: number;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            status: import(".prisma/client").$Enums.ProjectStatus;
        };
    }>;
    update: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            name?: string | undefined;
            description?: string | undefined;
            status?: "ACTIVE" | "COMPLETED" | "ARCHIVED" | undefined;
        };
        output: {
            _count: {
                tickets: number;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            status: import(".prisma/client").$Enums.ProjectStatus;
        };
    }>;
    delete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
        };
        output: {
            success: boolean;
        };
    }>;
    getStats: import("@trpc/server").TRPCQueryProcedure<{
        input: {};
        output: {
            totalProjects: number;
            projectsByStatus: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.ProjectGroupByOutputType, "status"[]> & {
                _count: {
                    status: number;
                };
            })[];
            topProjectsByTickets: {
                id: string;
                name: string;
                _count: {
                    tickets: number;
                };
                status: import(".prisma/client").$Enums.ProjectStatus;
            }[];
        };
    }>;
}>>;
//# sourceMappingURL=projects.routers.d.ts.map