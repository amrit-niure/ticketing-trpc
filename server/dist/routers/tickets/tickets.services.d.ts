import type { GetAllTicketsInput, GetTicketByIdInput, CreateTicketInput, UpdateTicketInput, DeleteTicketInput, AddCommentInput, GetCommentsInput, AddAttachmentInput, GetAttachmentsInput, DeleteAttachmentInput, GetActivityLogsInput, GetTicketStatsInput } from './tickets.schemas';
import { Context } from '../../trpc';
export declare const getAllTicketsService: ({ input, ctx, }: {
    input: GetAllTicketsInput;
    ctx: Context;
}) => Promise<{
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
}>;
export declare const getTicketByIdService: ({ input, ctx, }: {
    input: GetTicketByIdInput;
    ctx: Context;
}) => Promise<{
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
}>;
export declare const createTicketService: ({ input, ctx, }: {
    input: CreateTicketInput;
    ctx: Context;
}) => Promise<{
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
}>;
export declare const updateTicketService: ({ input, ctx, }: {
    input: UpdateTicketInput;
    ctx: Context;
}) => Promise<{
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
}>;
export declare const deleteTicketService: ({ input, ctx, }: {
    input: DeleteTicketInput;
    ctx: Context;
}) => Promise<{
    success: boolean;
}>;
export declare const addCommentService: ({ input, ctx, }: {
    input: AddCommentInput;
    ctx: Context;
}) => Promise<{
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
}>;
export declare const getCommentsService: ({ input, ctx, }: {
    input: GetCommentsInput;
    ctx: Context;
}) => Promise<({
    author: {
        id: string;
        email: string;
        name: string;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ticketId: string;
    content: string;
    authorId: string;
})[]>;
export declare const addAttachmentService: ({ input, ctx, }: {
    input: AddAttachmentInput;
    ctx: Context;
}) => Promise<{
    id: string;
    createdAt: Date;
    ticketId: string;
    filename: string;
    filepath: string;
    mimeType: string;
    size: number;
}>;
export declare const getAttachmentsService: ({ input, ctx, }: {
    input: GetAttachmentsInput;
    ctx: Context;
}) => Promise<{
    id: string;
    createdAt: Date;
    ticketId: string;
    filename: string;
    filepath: string;
    mimeType: string;
    size: number;
}[]>;
export declare const deleteAttachmentService: ({ input, ctx, }: {
    input: DeleteAttachmentInput;
    ctx: Context;
}) => Promise<{
    success: boolean;
}>;
export declare const getActivityLogsService: ({ input, ctx, }: {
    input: GetActivityLogsInput;
    ctx: Context;
}) => Promise<({
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
})[]>;
export declare const getTicketStatsService: ({ input, ctx, }: {
    input: GetTicketStatsInput;
    ctx: Context;
}) => Promise<{
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
}>;
//# sourceMappingURL=tickets.services.d.ts.map