import { PlusCircle } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { type Project } from "../../../../lib/api";

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
        <p className="text-muted-foreground">
          {project.description || "Manage tickets for this project"}
        </p>
      </div>
      <Button
        onClick={() =>
          navigate({ to: "/projects/$projectId/tickets/create", params: { projectId: project.id } })
        }
      >
        <PlusCircle className="mr-2 h-4 w-4" /> New Ticket
      </Button>
    </div>
  );
}
