import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: unknown;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h2 className="text-2xl font-semibold">Failed to load projects</h2>
      <p className="text-muted-foreground mb-4">
        {error instanceof Error ? error.message : "Please try again later"}
      </p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
}
