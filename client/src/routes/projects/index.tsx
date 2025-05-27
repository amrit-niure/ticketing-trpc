import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { Dialog } from "../../components/ui/dialog";
import {
  useProjects,
  LoadingState,
  ErrorState,
  ProjectsGrid,
  CreateProjectDialog,
  ProjectsHeader,
} from "./-components";

export const Route = createFileRoute("/projects/")({
  component: ProjectsListPage,
});

export default function ProjectsListPage() {
  const navigate = useNavigate();
  const {
    projects,
    isLoading,
    isError,
    error,
    refetch,
    createDialogOpen,
    setCreateDialogOpen,
  } = useProjects();

  const handleProjectClick = (project: Project) => {
    navigate({
      to: "/projects/$projectId",
      params: { projectId: project.id },
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <div className="flex-1 space-y-6 ">
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <ProjectsHeader onCreateProject={() => setCreateDialogOpen(true)} />
        <CreateProjectDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />
      </Dialog>

      <ProjectsGrid
        projects={projects}
        onCreateProject={() => setCreateDialogOpen(true)}
        onProjectClick={handleProjectClick}
      />
    </div>
  );
}
