import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from "../../../server/src/routers"

export const trpcClient = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "http://localhost:5000/trpc",
            headers() {
                const token = localStorage.getItem('token');
                return token ? { Authorization: `Bearer ${token}` } : {};
            },
        })
    ]
})

