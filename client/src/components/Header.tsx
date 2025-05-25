import React, { useState } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
  Users,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ThemeToggle } from "./ThemeToggle";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    name: "Users",
    href: "/users",
    icon: Users,
    adminOnly: true,
  },
];

export const Header: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 md:px-0 ">
          <div className="flex items-center justify-between h-14">
            {" "}
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <img
                src="/logo-light.png"
                alt="Case Pilot | Ticketing System"
                className="h-6 dark:invert dark:brightness-0 dark:contrast-200"
              />{" "}
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {navigationItems.map((item) => {
                  // Hide admin-only items for non-admin users
                  if (item.adminOnly && user?.role !== "ADMIN") {
                    return null;
                  }

                  const isActive =
                    location.pathname === item.href ||
                    (item.href !== "/" &&
                      location.pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center px-3 py-1 text-xs font-medium rounded-sm transition-all duration-200 group ",
                        isActive
                          ? " text-primary border "
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "w-3 h-3 mr-2 transition-colors",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>{" "}
            {/* Desktop User Menu & Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
              {/* Desktop User Menu */}{" "}
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-xs font-medium">
                          {user?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="text-xs font-medium text-foreground">
                          {user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {user?.role?.toLowerCase()}
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>{" "}
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-foreground">
                        {user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-background border-b border-border shadow-lg">
            {" "}
            <div className="px-6 py-4 space-y-2">
              {/* Mobile Navigation */}
              {navigationItems.map((item) => {
                // Hide admin-only items for non-admin users
                if (item.adminOnly && user?.role !== "ADMIN") {
                  return null;
                }

                const isActive =
                  location.pathname === item.href ||
                  (item.href !== "/" &&
                    location.pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5 mr-3",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    {item.name}{" "}
                  </Link>
                );
              })}
              {/* Mobile User Section */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center px-4 py-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>{" "}
                  </Avatar>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>{" "}
                    <p className="text-xs text-muted-foreground capitalize">
                      {user?.role?.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Mobile Theme Toggle */}
                <div className="px-4 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      Theme
                    </span>
                    <ThemeToggle />
                  </div>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
