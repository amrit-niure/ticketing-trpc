import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorStateProps {
  error?: Error | null;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4 max-w-md">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
        <div>
          <h3 className="text-lg font-semibold">Failed to load ticket</h3>
          <p className="text-muted-foreground">
            We couldn't load the ticket details. Please try again.
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              {error.message || "An unexpected error occurred"}
            </AlertDescription>
          </Alert>
        )}

        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
