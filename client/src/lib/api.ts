import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Export types explicitly
// export type {
//     User,
//     Project,
//     Ticket,
//     Comment,
//     Attachment,
//     ActivityLog,
//     DashboardStats,
//     PaginatedResponse
// };

// Create axios instance
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

// Types
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'MANAGER' | 'USER';
    createdAt: string;
}

export interface Project {
    id: string;
    name: string;
    description?: string;
    status: 'ACTIVE' | 'INACTIVE';
    managerId: string;
    manager: Pick<User, 'id' | 'name' | 'email'>;
    createdAt: string;
    updatedAt: string;
    _count: {
        tickets: number;
    };
}

export interface Ticket {
    id: string;
    subject: string;
    description: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    projectId: string;
    project: Pick<Project, 'id' | 'name'>;
    requesterId: string;
    requester: Pick<User, 'id' | 'name' | 'email'>;
    assigneeId?: string;
    assignee?: Pick<User, 'id' | 'name' | 'email'>;
    createdAt: string;
    updatedAt: string;
    _count?: {
        comments: number;
        attachments: number;
    };
    comments?: Comment[];
    attachments?: Attachment[];
    activityLogs?: ActivityLog[];
}

export interface Comment {
    id: string;
    content: string;
    ticketId: string;
    authorId: string;
    author: Pick<User, 'id' | 'name' | 'email'>;
    createdAt: string;
}

export interface Attachment {
    id: string;
    filename: string;
    filepath: string;
    mimeType: string;
    size: number;
    ticketId: string;
    createdAt: string;
}

export interface ActivityLog {
    id: string;
    action: string;
    details: string;
    ticketId: string;
    userId: string;
    user: Pick<User, 'id' | 'name'>;
    createdAt: string;
    type?: string; // Type property equivalent to action for backward compatibility
}

export interface DashboardStats {
    totalTickets: number;
    openTickets: number;
    urgentTickets: number;
    unassignedTickets: number;
    recentTickets: Ticket[];
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

// Auth API
export const authAPI = {
    login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    register: async (name: string, email: string, password: string): Promise<{ token: string; user: User }> => {
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
    },

    getProfile: async (): Promise<User> => {
        const response = await api.get('/users/profile');
        return response.data;
    },
};

// Users API
export const usersAPI = {
    getAll: async (): Promise<User[]> => {
        const response = await api.get('/users');
        return response.data;
    },

    getProfile: async (): Promise<User> => {
        const response = await api.get('/users/profile');
        return response.data;
    },

    getById: async (id: string): Promise<User> => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    create: async (data: { name: string; email: string; password: string; role: string }): Promise<User> => {
        const response = await api.post('/users', data);
        return response.data;
    },

    update: async (id: string, data: Partial<User>): Promise<User> => {
        const response = await api.put(`/users/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/users/${id}`);
    },
};

// Projects API
export const projectsAPI = {
    getAll: async (): Promise<Project[]> => {
        const response = await api.get('/projects');
        return response.data;
    },

    getById: async (id: string): Promise<Project> => {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    },

    create: async (data: { name: string; description?: string; managerId: string }): Promise<Project> => {
        const response = await api.post('/projects', data);
        return response.data;
    },

    update: async (id: string, data: Partial<Project>): Promise<Project> => {
        const response = await api.put(`/projects/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/projects/${id}`);
    },
};

// Tickets API
export const ticketsAPI = {
    getAll: async (params?: {
        status?: string;
        priority?: string;
        assigneeId?: string;
        projectId?: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<Ticket[]> => {
        const response = await api.get('/tickets', { params });
        return response.data;
    },

    getById: async (id: string): Promise<Ticket> => {
        const response = await api.get(`/tickets/${id}`);
        return response.data;
    },

    create: async (data: {
        subject: string;
        description: string;
        priority?: string;
        assigneeId?: string;
        projectId: string;
    }): Promise<Ticket> => {
        const response = await api.post('/tickets', data);
        return response.data;
    },

    update: async (id: string, data: Partial<Ticket>): Promise<Ticket> => {
        const response = await api.put(`/tickets/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/tickets/${id}`);
    },

    addComment: async (id: string, content: string): Promise<Comment> => {
        const response = await api.post(`/tickets/${id}/comments`, { content });
        return response.data;
    },

    getComments: async (id: string): Promise<Comment[]> => {
        const response = await api.get(`/tickets/${id}/comments`);
        return response.data;
    },

    addAttachment: async (id: string, formData: FormData): Promise<Attachment> => {
        const response = await api.post(`/tickets/${id}/attachments`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    uploadAttachment: async (id: string, file: File): Promise<Attachment> => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post(`/tickets/${id}/attachments`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }, downloadAttachment: async (attachmentId: string): Promise<void> => {
        const response = await api.get(`/tickets/attachments/${attachmentId}/download`, {
            responseType: 'blob',
        });

        // Create download link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', ''); // Browser will use the filename from Content-Disposition header
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    }, deleteAttachment: async (ticketId: string, attachmentId: string): Promise<void> => {
        await api.delete(`/tickets/${ticketId}/attachments/${attachmentId}`);
    },

    getAttachments: async (id: string): Promise<Attachment[]> => {
        const response = await api.get(`/tickets/${id}/attachments`);
        return response.data;
    },

    getActivityLogs: async (id: string): Promise<ActivityLog[]> => {
        const response = await api.get(`/tickets/${id}/activity`);
        return response.data;
    },

    getDashboardStats: async (): Promise<DashboardStats> => {
        const response = await api.get('/tickets/dashboard/stats');
        return response.data;
    },
};
