import { ArrowLeft, Edit3, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "@tanstack/react-router";
import { type Ticket } from "@/lib/api";

interface TicketHeaderProps {
  ticket: Ticket;
  projectId: string;
  isEditing: boolean;
  onEditToggle: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export function TicketHeader({
  ticket,
  projectId,
  isEditing,
  onEditToggle,
  onDelete,
  isDeleting,
}: TicketHeaderProps) {
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

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <Link to="/projects/$projectId" params={{ projectId }}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tickets
          </Button>
        </Link>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">#{ticket.id.substring(0, 8)}</h1>
            {renderStatusBadge(ticket.status)}
            {renderPriorityBadge(ticket.priority)}
          </div>
          <p className="text-muted-foreground">
            Created {new Date(ticket.createdAt).toLocaleDateString()} by{" "}
            {ticket.requester.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={isEditing ? "secondary" : "outline"}
          onClick={onEditToggle}
          disabled={isDeleting}
        >
          {isEditing ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isDeleting}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Ticket</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this ticket? This action cannot
                be undone and will remove all associated comments, attachments,
                and activity logs.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className="bg-destructive hover:bg-destructive/90"
              >
                Delete Ticket
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
