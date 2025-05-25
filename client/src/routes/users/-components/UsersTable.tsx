import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import type { User } from "../../../types/user";

interface Pagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

interface UsersTableProps {
  users: User[];
  pagination?: Pagination;
  onPageChange: (page: number) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "destructive";
    case "AGENT":
      return "default";
    case "USER":
      return "secondary";
    default:
      return "secondary";
  }
};

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  pagination,
  onPageChange,
  onEditUser,
  onDeleteUser,
}) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-sm">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MoreHorizontal className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No users found</h3>
        <p className="">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Tickets</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={getRoleBadgeVariant(user.role)}
                  className="capitalize rounded-sm"
                >
                  {user.role.toLowerCase()}
                </Badge>
              </TableCell>{" "}
              <TableCell>
                <div className="text-xs">
                  <div>Assigned: {user._count?.assignedTickets || 0}</div>
                  <div className="text-gray-500">
                    Created: {user._count?.createdTickets || 0}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-xs ">
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditUser(user)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteUser(user)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <div className="text-sm ">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} users
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
