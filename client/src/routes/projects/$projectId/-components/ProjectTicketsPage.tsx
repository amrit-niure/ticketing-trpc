import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { ProjectHeader } from "./ProjectHeader";
import { TicketFilters } from "./TicketFilters";
import { TicketsTable } from "./TicketsTable";
import { useProjectTickets } from "./useProjectTickets";

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
    <div className="flex-1 space-y-4 p-4 md:p-8">
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
