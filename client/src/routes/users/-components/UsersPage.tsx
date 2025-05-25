import React, { useState } from "react";
import { Card } from "../../../components/ui/card";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Loader2, AlertCircle, Shield } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import type { User } from "../../../types/user";
import { CreateUserDialog } from "./CreateUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { EditUserDialog } from "./EditUserDialog";
import { UsersHeader } from "./UsersHeader";
import { UsersTable } from "./UsersTable";
import { useUsers } from "./useUsers";

export const UsersPage: React.FC = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<
    "ADMIN" | "AGENT" | "USER" | undefined
  >();
  const [page, setPage] = useState(1);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const { users, isLoading, error, refetch } = useUsers({
    page,
    search,
    role: roleFilter,
  });

  // Check if user is admin
  if (user?.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-8 max-w-md w-full text-center">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold  mb-2">Access Denied</h2>
          <p className="text-muted-foreground text-sm">
            You need administrator privileges to access the user management
            page.
          </p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <UsersHeader
          onCreateUser={() => setCreateDialogOpen(true)}
          search={search}
          onSearchChange={setSearch}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load users. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UsersHeader
        onCreateUser={() => setCreateDialogOpen(true)}
        search={search}
        onSearchChange={setSearch}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
      />

      <div className="p-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-12 border-2">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            <span className="ml-2 ">Loading users...</span>
          </div>
        ) : (
          <UsersTable
            users={users?.users || []}
            pagination={users?.pagination}
            onPageChange={setPage}
            onEditUser={setEditingUser}
            onDeleteUser={setDeletingUser}
          />
        )}
      </div>

      {/* Dialogs */}
      <CreateUserDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={() => {
          refetch();
          setCreateDialogOpen(false);
        }}
      />

      {editingUser && (
        <EditUserDialog
          user={editingUser}
          open={!!editingUser}
          onOpenChange={(open: boolean) => !open && setEditingUser(null)}
          onSuccess={() => {
            refetch();
            setEditingUser(null);
          }}
        />
      )}

      {deletingUser && (
        <DeleteUserDialog
          user={deletingUser}
          open={!!deletingUser}
          onOpenChange={(open: boolean) => !open && setDeletingUser(null)}
          onSuccess={() => {
            refetch();
            setDeletingUser(null);
          }}
        />
      )}
    </div>
  );
};
