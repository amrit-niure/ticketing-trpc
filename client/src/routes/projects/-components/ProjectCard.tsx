import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Project } from "@/lib/api";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold ">
            {project.name}
          </CardTitle>{" "}
          {project.status === "ACTIVE" ? (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300"
            >
              Active
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-muted text-muted-foreground">
              Inactive
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {project.description || "No description available"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>{project._count?.tickets || 0} tickets</span>
            <span>
              Created {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </CardContent>
    </Card>
  );
}
