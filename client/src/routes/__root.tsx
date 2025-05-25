import { Layout } from "@/components/Layout";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthContext";

function RootComponent() {
  const { isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while auth is being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // For auth routes, don't use the main layout
  const isAuthRoute = location.pathname.startsWith("/auth");

  if (isAuthRoute) {
    return <Outlet />;
  }

  // For non-auth routes, always use the main layout (authentication will be handled by individual route components)
  return <Layout />;
}

export const Route = createRootRoute({
  component: RootComponent,
});
