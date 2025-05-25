import { Request, Response } from 'express';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

export type AsyncRequestHandler = (
    req: AuthRequest,
    res: Response
) => Promise<void>;

export interface DashboardStats {
    totalTickets: number;
    openTickets: number;
    urgentTickets: number;
    unassignedTickets: number;
    recentTickets: any[];
}

export interface TicketFilters {
    status?: string;
    priority?: string;
    assigneeId?: string;
    projectId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: string;
    limit?: string;
}

export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

export interface ProjectFilters {
    status?: ProjectStatus;
}
