import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/$projectId/tickets/")({
  component: ProjectTicketsPage,
});

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  useProjectTickets,
  LoadingState,
  ErrorState,
  ProjectHeader,
  TicketFilters,
  TicketsTable,
} from "../-components";

export function ProjectTicketsPage() {
  const {
    project,
    tickets,
    projectId,
    isLoading,
    isError,
    refetch,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleFilterChange,
    sortField,
    sortDirection,
    handleSort,
  } = useProjectTickets();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !project) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <div className="flex-1 space-y-4">
      <ProjectHeader project={project} />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Project Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          {" "}
          <TicketFilters
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />{" "}
          <TicketsTable
            tickets={tickets}
            projectId={projectId}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        </CardContent>
      </Card>
    </div>
  );
}
