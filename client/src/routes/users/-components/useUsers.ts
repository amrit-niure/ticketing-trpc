import { useState, useEffect } from 'react';
import { trpcClient } from '../../../lib/trpc';
import type { UseUsersParams, UsersResponse } from '../../../types/user';

export const useUsers = ({ page, search, role }: UseUsersParams) => {
    const [users, setUsers] = useState<UsersResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const result = await trpcClient.users.getAll.query({
                page,
                search: search || undefined,
                role: role || undefined,
                limit: 10,
            });

            setUsers(result);
        } catch (err: any) {
            console.error('Error fetching users:', err);
            setError(err.message || 'Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, search, role]);

    return {
        users,
        isLoading,
        error,
        refetch: fetchUsers,
    };
};
