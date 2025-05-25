interface CreateTicketHeaderProps {
  projectId?: string;
}

export function CreateTicketHeader({ projectId }: CreateTicketHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create New Ticket</h2>
        {projectId && (
          <p className="text-muted-foreground mt-1">
            Creating ticket for this project
          </p>
        )}
      </div>
    </div>
  );
}
