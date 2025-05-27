export declare const ticketRouter: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
//# sourceMappingURL=tickets.schema.d.ts.map