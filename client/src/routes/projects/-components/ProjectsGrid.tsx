import { type Project } from "@/lib/api";
import { ProjectCard } from "./ProjectCard";
import { EmptyProjectsState } from "./EmptyProjectsState";

interface ProjectsGridProps {
  projects: Project[] | undefined;
  onCreateProject: () => void;
  onProjectClick?: (project: Project) => void;
}

export function ProjectsGrid({
  projects,
  onCreateProject,
  onProjectClick,
}: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects && projects.length > 0 ? (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectClick?.(project)}
          />
        ))
      ) : (
        <EmptyProjectsState onCreateProject={onCreateProject} />
      )}
    </div>
  );
}
