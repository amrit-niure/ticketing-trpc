import React from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Plus, Search, Users } from "lucide-react";

interface UsersHeaderProps {
  onCreateUser: () => void;
  search: string;
  onSearchChange: (search: string) => void;
  roleFilter?: "ADMIN" | "AGENT" | "USER";
  onRoleFilterChange: (role?: "ADMIN" | "AGENT" | "USER") => void;
}

export const UsersHeader: React.FC<UsersHeaderProps> = ({
  onCreateUser,
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
          <Users className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold ">User Management</h1>
          <p className="text-xs ">Manage users, roles, and permissions</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-64 text-xs"
            />
          </div>

          <Select
            value={roleFilter || ""}
            onValueChange={(value) =>
              onRoleFilterChange((value as any) || undefined)
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">All Roles</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="AGENT">Agent</SelectItem>
              <SelectItem value="USER">User</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={onCreateUser}
          className="flex items-center gap-2"
          size={"sm"}
        >
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>
    </div>
  );
};
