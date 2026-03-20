import React from "react";
import type { TableConfig } from "../../../components/Table/type";
import type { UsersTableData } from "../../../types/User";
import Chip from "@mui/material/Chip";

// Define User data structure for table display

export const usersConfig: TableConfig<UsersTableData> = {
  columns: [
    {
      id: "name",
      label: "Name",
      numeric: false,
      disablePadding: true,
      minWidth: 200,
      maxWidth: 250,
    },
    {
      id: "email",
      label: "Email",
      numeric: false,
      disablePadding: false,
      minWidth: 250,
      maxWidth: 300,
    },
    {
      id: "role",
      label: "Role",
      numeric: false,
      disablePadding: false,
      minWidth: 120,
      maxWidth: 150,
      render: (value: UsersTableData[keyof UsersTableData]) => {
        const role = String(value);
        const color = role === "admin" ? "error" : "primary";
        return React.createElement(Chip, {
          label: role.toUpperCase(),
          color: color as "error" | "primary",
          size: "small",
          sx: { fontWeight: 600 },
        });
      },
    },
    {
      id: "createdAt",
      label: "Created At",
      numeric: false,
      disablePadding: false,
      minWidth: 180,
      maxWidth: 200,
      render: (value) => {
        if (!value) return "-";
        const date = new Date(String(value));
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
  ],
  title: "Users",
  searchFields: ["name", "email", "role"],
  defaultOrderBy: "name",
  showAdd: true,
  showFilter: true,
};
