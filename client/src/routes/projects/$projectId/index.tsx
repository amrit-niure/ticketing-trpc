import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState, ErrorState } from "../-components";
import {
  useProjectTickets,
  ProjectHeader,
  TicketFilters,
  TicketsTable,
} from "./-components";

export const Route = createFileRoute("/projects/$projectId/")({
  component: ProjectTicketsPage,
});
function ProjectTicketsPage() {
  const {
    project,
    projectId,
    isLoading,
    isError,
    tickets,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleFilterChange,
    sortField,
    sortDirection,
    handleSort,
    refetch,
  } = useProjectTickets();

  if (isLoading) {
    return <LoadingState />;
  }
  if (isError || !project) {
    return <ErrorState error={"Failed to fetch tickets."} onRetry={refetch} />;
  }

  return (
    <div className="flex-1 space-y-4 ">
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
          />
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
