export declare const appRouter: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    auth: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
                user: {
                    id: string;
                    email: string;
                    name: string;
                    role: "ADMIN" | "AGENT" | "USER";
                    createdAt: Date;
                    updatedAt: Date;
                };
                token: string;
                message?: string | undefined;
            };
        }>;
        register: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                email: string;
                name: string;
                password: string;
                role?: "ADMIN" | "AGENT" | "USER" | undefined;
            };
            output: {
                user: {
                    id: string;
                    email: string;
                    name: string;
                    role: "ADMIN" | "AGENT" | "USER";
                    createdAt: Date;
                    updatedAt: Date;
                };
                token: string;
                message?: string | undefined;
            };
        }>;
        me: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: string;
                email: string;
                name: string;
                role: "ADMIN" | "AGENT" | "USER";
                createdAt: Date;
                updatedAt: Date;
            };
        }>;
        refreshToken: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: {
                user: {
                    id: string;
                    email: string;
                    name: string;
                    role: "ADMIN" | "AGENT" | "USER";
                    createdAt: Date;
                    updatedAt: Date;
                };
                token: string;
            };
        }>;
        validate: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: string;
                email: string;
                name: string;
                role: "ADMIN" | "AGENT" | "USER";
                createdAt: Date;
                updatedAt: Date;
            };
        }>;
    }>>;
    users: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
                page?: number | undefined;
                limit?: number | undefined;
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
    tickets: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                projectId: string;
                subject: string;
                description?: string | undefined;
                status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | undefined;
                priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
                assigneeId?: string | undefined;
            };
            output: {
                project: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    status: import(".prisma/client").$Enums.ProjectStatus;
                };
                requester: {
                    id: string;
                    name: string;
                };
                assignee: {
                    id: string;
                    email: string;
                    name: string;
                    password: string;
                    role: import(".prisma/client").$Enums.Role;
                    createdAt: Date;
                    updatedAt: Date;
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
            };
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                description?: string | undefined;
                status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | undefined;
                priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
                assigneeId?: string | null | undefined;
                subject?: string | undefined;
            };
            output: {
                project: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    status: import(".prisma/client").$Enums.ProjectStatus;
                };
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
            };
        }>;
        getById: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: string;
            };
            output: {
                comments: ({
                    author: {
                        id: string;
                        name: string;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    ticketId: string;
                    content: string;
                    authorId: string;
                })[];
                activityLogs: ({
                    user: {
                        id: string;
                        name: string;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    userId: string;
                    action: import(".prisma/client").$Enums.ActivityType;
                    details: string | null;
                    ticketId: string;
                })[];
                project: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    status: import(".prisma/client").$Enums.ProjectStatus;
                };
                requester: {
                    id: string;
                    name: string;
                };
                assignee: {
                    id: string;
                    email: string;
                    name: string;
                } | null;
                attachments: {
                    id: string;
                    createdAt: Date;
                    ticketId: string;
                    filename: string;
                    filepath: string;
                    mimeType: string;
                    size: number;
                }[];
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
            };
        }>;
        getAll: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                search?: string | undefined;
                status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | undefined;
                page?: number | undefined;
                limit?: number | undefined;
                priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
                projectId?: string | undefined;
                assigneeId?: string | undefined;
                sortBy?: "createdAt" | "updatedAt" | "status" | "priority" | undefined;
                sortOrder?: "asc" | "desc" | undefined;
            };
            output: {
                tickets: ({
                    project: {
                        id: string;
                        name: string;
                    };
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
                pagination: {
                    total: number;
                    pages: number;
                    page: number;
                    limit: number;
                };
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
        addComment: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ticketId: string;
                content: string;
            };
            output: {
                author: {
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                ticketId: string;
                content: string;
                authorId: string;
            };
        }>;
        addAttachment: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ticketId: string;
                filename: string;
                filepath: string;
                mimeType: string;
                size: number;
            };
            output: {
                id: string;
                createdAt: Date;
                ticketId: string;
                filename: string;
                filepath: string;
                mimeType: string;
                size: number;
            };
        }>;
        deleteAttachment: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ticketId: string;
                attachmentId: string;
            };
            output: {
                success: boolean;
            };
        }>;
    }>>;
    projects: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
}>>;
export type AppRouter = typeof appRouter;
export { createTRPCContext } from '../trpc';
//# sourceMappingURL=index.d.ts.map