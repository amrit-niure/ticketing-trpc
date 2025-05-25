import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { ticketsAPI, projectsAPI } from "../../../../lib/api";

// Types for filtering and sorting
export type SortField = "createdAt" | "updatedAt" | "status" | "priority";
export type SortDirection = "asc" | "desc";
export type FilterType = {
    status?: string;
    priority?: string;
    assigneeId?: string;
    search?: string;
};

export function useProjectTickets() {
    const { projectId } = useParams({ from: "/projects/$projectId/" });
    const [filters, setFilters] = useState<FilterType>({});
    const [sortField, setSortField] = useState<SortField>("createdAt");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [searchQuery, setSearchQuery] = useState("");

    // Query project details
    const {
        data: project,
        isLoading: isProjectLoading,
        isError: isProjectError,
        refetch: refetchProject,
    } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => projectsAPI.getById(projectId),
    });

    // Query tickets with filters and sorting
    const {
        data: ticketsResponse,
        isLoading: isTicketsLoading,
        isError: isTicketsError,
        refetch: refetchTickets,
    } = useQuery({
        queryKey: ["tickets", projectId, filters, sortField, sortDirection],
        queryFn: () =>
            ticketsAPI.getAll({
                ...filters,
                projectId,
                sortBy: sortField,
                sortOrder: sortDirection,
            }),
    });

    const tickets = ticketsResponse || [];

    // Handle search input
    const handleSearch = () => {
        setFilters({ ...filters, search: searchQuery });
    };

    // Handle filter changes
    const handleFilterChange = (key: string, value: string | undefined) => {
        if (value === "all" || value === undefined) {
            const newFilters = { ...filters };
            delete newFilters[key as keyof FilterType];
            setFilters(newFilters);
        } else {
            setFilters({ ...filters, [key]: value });
        }
    };

    // Handle sort changes
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    return {
        // Data
        project,
        tickets,
        projectId,

        // Loading states
        isLoading: isProjectLoading || isTicketsLoading,
        isError: isProjectError || isTicketsError,

        // Actions
        refetch: () => {
            refetchProject();
            refetchTickets();
        },

        // Search & filters
        searchQuery,
        setSearchQuery,
        handleSearch,
        filters,
        handleFilterChange,

        // Sorting
        sortField,
        sortDirection,
        handleSort,
    };
}
