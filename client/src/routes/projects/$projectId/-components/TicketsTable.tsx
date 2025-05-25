import { ArrowUp, ArrowDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Badge } from "../../../../components/ui/badge";
import { Link } from "@tanstack/react-router";
import { type Ticket } from "../../../../lib/api";
import { type SortField, type SortDirection } from "./useProjectTickets";

interface TicketsTableProps {
  tickets: Ticket[];
  projectId: string;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export function TicketsTable({
  tickets,
  projectId,
  sortField,
  sortDirection,
  onSort,
}: TicketsTableProps) {
  // Helper for rendering status badges
  const renderStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "OPEN":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Open
          </Badge>
        );
      case "IN_PROGRESS":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            In Progress
          </Badge>
        );
      case "RESOLVED":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Resolved
          </Badge>
        );
      case "CLOSED":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            Closed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Helper for rendering priority badges
  const renderPriorityBadge = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "URGENT":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Urgent
          </Badge>
        );
      case "HIGH":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800">
            High
          </Badge>
        );
      case "MEDIUM":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Medium
          </Badge>
        );
      case "LOW":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Low
          </Badge>
        );
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <div
      className="flex items-center cursor-pointer hover:text-foreground"
      onClick={() => onSort(field)}
    >
      {children}
      {sortField === field &&
        (sortDirection === "asc" ? (
          <ArrowUp className="ml-1 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-1 h-4 w-4" />
        ))}
    </div>
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="min-w-[200px]">Subject</TableHead>
            <TableHead className="hidden md:table-cell">Requester</TableHead>
            <TableHead>
              <SortableHeader field="status">Status</SortableHeader>
            </TableHead>
            <TableHead>
              <SortableHeader field="priority">Priority</SortableHeader>
            </TableHead>
            <TableHead className="hidden lg:table-cell">
              <SortableHeader field="createdAt">Created</SortableHeader>
            </TableHead>
            <TableHead className="hidden lg:table-cell">
              <SortableHeader field="updatedAt">Updated</SortableHeader>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No tickets found for this project.
              </TableCell>
            </TableRow>
          ) : (
            tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                {" "}
                <TableCell className="font-medium">
                  <Link
                    to="/projects/$projectId/tickets/$ticketId"
                    params={{ projectId, ticketId: ticket.id }}
                    className="text-blue-600 hover:underline"
                  >
                    #{ticket.id.substring(0, 8)}
                  </Link>
                </TableCell>
                <TableCell className="font-medium">
                  <Link
                    to="/projects/$projectId/tickets/$ticketId"
                    params={{ projectId, ticketId: ticket.id }}
                    className="hover:underline"
                  >
                    {ticket.subject}
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {ticket.requester.name}
                </TableCell>
                <TableCell>{renderStatusBadge(ticket.status)}</TableCell>
                <TableCell>{renderPriorityBadge(ticket.priority)}</TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">
                  {new Date(ticket.updatedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
