import { CreateTicketHeader } from "./CreateTicketHeader";
import { CreateTicketForm } from "./CreateTicketForm";
import { useCreateTicket } from "./useCreateTicket";

export function CreateTicketPage() {
  const { projectId } = useCreateTicket();

  return (
    <div className="flex-1 space-y-4 ">
      <CreateTicketHeader projectId={projectId} />
      <CreateTicketForm />
    </div>
  );
}
