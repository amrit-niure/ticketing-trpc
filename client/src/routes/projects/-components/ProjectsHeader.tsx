import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

interface ProjectsHeaderProps {
  onCreateProject: () => void;
}

export function ProjectsHeader({ onCreateProject }: ProjectsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <p className="text-muted-foreground">
          Manage your projects and their tickets
        </p>
      </div>
      <DialogTrigger asChild>
        <Button onClick={onCreateProject}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Project
        </Button>
      </DialogTrigger>
    </div>
  );
}
