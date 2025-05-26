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
            limit?: number | undefined;
            page?: number | undefined;
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
                status: import(".prisma/client").$Enums.ProjectStatus;
                description: string | null;
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
                status: import(".prisma/client").$Enums.TicketStatus;
                description: string;
                subject: string;
                priority: import(".prisma/client").$Enums.TicketPriority;
                projectId: string;
                requesterId: string;
                assigneeId: string | null;
            })[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProjectStatus;
            description: string | null;
        };
    }>;
    create: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name: string;
            status?: "ACTIVE" | "COMPLETED" | "ARCHIVED" | undefined;
            description?: string | undefined;
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
            status: import(".prisma/client").$Enums.ProjectStatus;
            description: string | null;
        };
    }>;
    update: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            name?: string | undefined;
            status?: "ACTIVE" | "COMPLETED" | "ARCHIVED" | undefined;
            description?: string | undefined;
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
            status: import(".prisma/client").$Enums.ProjectStatus;
            description: string | null;
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
        input: void;
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
            }[];
        };
    }>;
}>>;
//# sourceMappingURL=projects.schema.d.ts.map