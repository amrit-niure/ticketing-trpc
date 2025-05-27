export declare const ticketsRouter: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
//# sourceMappingURL=tickets.routers.d.ts.map