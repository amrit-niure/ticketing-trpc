import { createFileRoute } from "@tanstack/react-router";
import { TicketDetailsPage } from "./-components";

export const Route = createFileRoute("/projects/$projectId/tickets/$ticketId/")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  return <TicketDetailsPage />;
}
