import { createFileRoute } from "@tanstack/react-router";
import { CreateTicketPage } from "./-components";

export const Route = createFileRoute("/projects/$projectId/tickets/create/")({
  component: CreateTicketPage,
});
