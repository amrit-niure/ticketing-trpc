// User types for the frontend
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'AGENT' | 'USER';
    createdAt: string;
    updatedAt?: string; // Make optional since not all endpoints return it
    _count?: {
        assignedTickets: number;
        createdTickets: number;
        comments?: number;
    };
}

export interface CreateUserInput {
    email: string;
    name: string;
    password: string;
    role: 'ADMIN' | 'AGENT' | 'USER';
}

export interface UpdateUserInput {
    email?: string;
    name?: string;
    password?: string;
    role?: 'ADMIN' | 'AGENT' | 'USER';
}

export interface UsersResponse {
    users: User[];
    pagination: {
        total: number;
        pages: number;
        page: number;
        limit: number;
    };
}

export interface UseUsersParams {
    page: number;
    search?: string;
    role?: 'ADMIN' | 'AGENT' | 'USER';
}
