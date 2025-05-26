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
        getAll: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                search?: string | undefined;
                status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | undefined;
                priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
                projectId?: string | undefined;
                assigneeId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
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
                    status: import(".prisma/client").$Enums.TicketStatus;
                    description: string;
                    subject: string;
                    priority: import(".prisma/client").$Enums.TicketPriority;
                    projectId: string;
                    requesterId: string;
                    assigneeId: string | null;
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
                    status: import(".prisma/client").$Enums.ProjectStatus;
                    description: string | null;
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
                status: import(".prisma/client").$Enums.TicketStatus;
                description: string;
                subject: string;
                priority: import(".prisma/client").$Enums.TicketPriority;
                projectId: string;
                requesterId: string;
                assigneeId: string | null;
            };
        }>;
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                subject: string;
                projectId: string;
                status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | undefined;
                description?: string | undefined;
                priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
                assigneeId?: string | undefined;
            };
            output: {
                project: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    status: import(".prisma/client").$Enums.ProjectStatus;
                    description: string | null;
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
                status: import(".prisma/client").$Enums.TicketStatus;
                description: string;
                subject: string;
                priority: import(".prisma/client").$Enums.TicketPriority;
                projectId: string;
                requesterId: string;
                assigneeId: string | null;
            };
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | undefined;
                description?: string | undefined;
                subject?: string | undefined;
                priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
                assigneeId?: string | null | undefined;
            };
            output: {
                project: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    status: import(".prisma/client").$Enums.ProjectStatus;
                    description: string | null;
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
                status: import(".prisma/client").$Enums.TicketStatus;
                description: string;
                subject: string;
                priority: import(".prisma/client").$Enums.TicketPriority;
                projectId: string;
                requesterId: string;
                assigneeId: string | null;
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
        getComments: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                ticketId: string;
            };
            output: ({
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
        }>;
        getActivityLogs: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                ticketId: string;
            };
            output: ({
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
        }>;
        getStats: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                totalTickets: number;
                ticketsByStatus: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.TicketGroupByOutputType, "status"[]> & {
                    _count: {
                        status: number;
                    };
                })[];
                ticketsByPriority: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.TicketGroupByOutputType, "priority"[]> & {
                    _count: {
                        priority: number;
                    };
                })[];
                recentActivity: ({
                    user: {
                        name: string;
                    };
                    ticket: {
                        subject: string;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    userId: string;
                    action: import(".prisma/client").$Enums.ActivityType;
                    details: string | null;
                    ticketId: string;
                })[];
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
}>>;
export type AppRouter = typeof appRouter;
export { createTRPCContext } from '../trpc';
//# sourceMappingURL=index.d.ts.map