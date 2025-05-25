import { AlertCircle } from "lucide-react";
import { Button } from "../../../../components/ui/button";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h2 className="text-2xl font-semibold">Failed to load project tickets</h2>
      <p className="text-muted-foreground mb-4">Please try again later</p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
}
