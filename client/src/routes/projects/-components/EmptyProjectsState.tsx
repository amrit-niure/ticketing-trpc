import { FolderOpen, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyProjectsStateProps {
  onCreateProject: () => void;
}

export function EmptyProjectsState({
  onCreateProject,
}: EmptyProjectsStateProps) {
  return (
    <div className="col-span-full">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4 text-center">
            Create your first project to start organizing tickets and managing
            your workflow.
          </p>
          <Button onClick={onCreateProject}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Project
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
