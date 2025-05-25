import { Search } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

interface TicketFiltersProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  onFilterChange: (key: string, value: string | undefined) => void;
}

export function TicketFilters({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onFilterChange,
}: TicketFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex w-full md:w-2/3 gap-2">
        <div className="flex-1">
          <Input
            placeholder="Search tickets by subject or ID..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full"
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
        </div>
        <Button variant="secondary" onClick={onSearch}>
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-1 gap-2">
        <Select
          onValueChange={(value) => onFilterChange("status", value)}
          defaultValue="all"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => onFilterChange("priority", value)}
          defaultValue="all"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="URGENT">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
