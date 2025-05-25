import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { projectsAPI, usersAPI, type Project, type User } from "@/lib/api";

export function useCreateTicket() {
    const { projectId } = useParams({ from: "/projects/$projectId/tickets/create/" });

    // Fetch projects for dropdown
    const {
        data: projects,
        isLoading: isLoadingProjects
    } = useQuery<Project[]>({
        queryKey: ["projects"],
        queryFn: () => projectsAPI.getAll(),
    });

    // Fetch users for assignee dropdown
    const {
        data: users,
        isLoading: isLoadingUsers
    } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => usersAPI.getAll(),
    });

    return {
        // Data
        projects,
        users,
        projectId,

        // States
        isLoading: isLoadingProjects || isLoadingUsers,
    };
}
