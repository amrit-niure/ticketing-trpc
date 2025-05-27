import type { GetAllProjectsInput, GetProjectByIdInput, CreateProjectInput, UpdateProjectInput, DeleteProjectInput, GetProjectStatsInput } from './projects.schemas';
import { Context } from '../../trpc';
export declare const getAllProjectsService: ({ input, ctx, }: {
    input: GetAllProjectsInput;
    ctx: Context;
}) => Promise<{
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
}>;
export declare const getProjectByIdService: ({ input, ctx, }: {
    input: GetProjectByIdInput;
    ctx: Context;
}) => Promise<{
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
}>;
export declare const createProjectService: ({ input, ctx, }: {
    input: CreateProjectInput;
    ctx: Context;
}) => Promise<{
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
}>;
export declare const updateProjectService: ({ input, ctx, }: {
    input: UpdateProjectInput;
    ctx: Context;
}) => Promise<{
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
}>;
export declare const deleteProjectService: ({ input, ctx, }: {
    input: DeleteProjectInput;
    ctx: Context;
}) => Promise<{
    success: boolean;
}>;
export declare const getProjectStatsService: ({ input, ctx, }: {
    input: GetProjectStatsInput;
    ctx: Context;
}) => Promise<{
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
}>;
//# sourceMappingURL=projects.services.d.ts.map