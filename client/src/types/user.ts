import type { AppRouter } from "../../../server/src/routers";
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutput = inferRouterOutputs<AppRouter>;

export type UserProfile = RouterOutput['auth']['getProfile'];

export interface UseUsersParams {
    page: number;
    search?: string;
    role?: 'ADMIN' | 'AGENT' | 'USER';
}
