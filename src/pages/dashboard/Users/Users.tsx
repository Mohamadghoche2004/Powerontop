import { useState, useEffect, useMemo } from "react";
import GenericTable from "../../../components/Table/GenericTable";
import { usersConfig } from "./config";
import UsersFilter from "./UsersFilterComponent";
import UserDrawer from "./UserDrawer";
import type { UsersTableData } from "../../../types/User";
import { usersService } from "../../../services/users.service";

export default function Users() {
  const [users, setUsers] = useState<UsersTableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UsersTableData | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await usersService.getUsers();
      const transformedUsers: UsersTableData[] = data.map((user: any) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
        createdAt: user.createdAt
          ? new Date(user.createdAt).toISOString()
          : "",
        updatedAt: user.updatedAt
          ? new Date(user.updatedAt).toISOString()
          : "",
      }));
      setUsers(transformedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on role filter
  const filteredUsers = useMemo(() => {
    if (roleFilter === "all") {
      return users;
    }
    return users.filter((user) => user.role === roleFilter);
  }, [users, roleFilter]);

  const handleFilterChange = (next: { role: string }) => {
    setRoleFilter(next.role);
  };

  const handleFilterClear = () => {
    setRoleFilter("all");
  };

  const handleAdd = () => {
    setEditingUser(null);
    setDrawerOpen(true);
  };

  const handleEdit = (user: UsersTableData) => {
    setEditingUser(user);
    setDrawerOpen(true);
  };

  const handleDelete = async (ids: readonly (string | number)[]) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${ids.length} user(s)?`
      )
    ) {
      return;
    }

    try {
      await Promise.all(
        ids.map((id) => usersService.deleteUser(String(id)))
      );
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting users:", error);
      alert("Failed to delete users");
    }
  };

  const handleSubmitUser = async (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    if (editingUser) {
      // For update, only send password if it was changed
      const updateData: Partial<typeof data> = {
        name: data.name,
        email: data.email,
        role: data.role,
      };
      if (data.password) {
        updateData.password = data.password;
      }
      await usersService.updateUser(editingUser.id, updateData);
    } else {
      await usersService.createUser(data);
    }
    await fetchUsers();
  };

  // Create config with filter component and handlers
  const config = {
    ...usersConfig,
    filterComponent: (
      <UsersFilter
        role={roleFilter}
        onChange={handleFilterChange}
        onClear={handleFilterClear}
      />
    ),
    onAdd: handleAdd,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <>
      <GenericTable data={filteredUsers} config={config} />
      <UserDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditingUser(null);
        }}
        user={editingUser}
        onSubmit={handleSubmitUser}
      />
    </>
  );
}
