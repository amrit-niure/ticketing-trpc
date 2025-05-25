import { Outlet } from "@tanstack/react-router";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-2 md:px-0 py-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
