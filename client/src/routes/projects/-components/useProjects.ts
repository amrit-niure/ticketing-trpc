import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { projectsAPI, type Project } from "@/lib/api";

export function useProjects() {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const {
        data: projects,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<Project[]>({
        queryKey: ["projects"],
        queryFn: () => projectsAPI.getAll(),
    });

    return {
        // Data
        projects,
        isLoading,
        isError,
        error,

        // Actions
        refetch,

        // Dialog state
        createDialogOpen,
        setCreateDialogOpen,
    };
}
