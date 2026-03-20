import React from "react";
import type { TableConfig } from "../../../components/Table/type";
import type { OrdersTableData } from "../../../types/Order";
import Chip from "@mui/material/Chip";

const statusColorMap: Record<string, "default" | "warning" | "info" | "success" | "error"> = {
  pending: "warning",
  paid: "info",
  shipped: "primary" as any,
  delivered: "success",
  cancelled: "error",
};

export const ordersConfig: TableConfig<OrdersTableData> = {
  columns: [
    {
      id: "id",
      label: "Order ID",
      numeric: false,
      disablePadding: true,
      minWidth: 120,
      maxWidth: 160,
      render: (value) => {
        const id = String(value);
        return `#${id.slice(-6).toUpperCase()}`;
      },
    },
    {
      id: "userName",
      label: "Customer",
      numeric: false,
      disablePadding: false,
      minWidth: 150,
      maxWidth: 200,
    },
    {
      id: "totalAmount",
      label: "Total",
      numeric: true,
      disablePadding: false,
      minWidth: 100,
      maxWidth: 130,
      align: "right",
      render: (value) => {
        const amount = Number(value);
        return `$${amount.toFixed(2)}`;
      },
    },
    {
      id: "status",
      label: "Status",
      numeric: false,
      disablePadding: false,
      minWidth: 120,
      maxWidth: 150,
      render: (value) => {
        const status = String(value);
        const color = statusColorMap[status] || "default";
        return React.createElement(Chip, {
          label: status.charAt(0).toUpperCase() + status.slice(1),
          color,
          size: "small",
          sx: { fontWeight: 600 },
        });
      },
    },
    {
      id: "shippingAddress",
      label: "Shipping Address",
      numeric: false,
      disablePadding: false,
      minWidth: 200,
      maxWidth: 300,
    },
    {
      id: "createdAt",
      label: "Date",
      numeric: false,
      disablePadding: false,
      minWidth: 140,
      maxWidth: 180,
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
  title: "Orders",
  searchFields: ["userName", "shippingAddress", "status"],
  defaultOrderBy: "createdAt",
  showAdd: true,
  showFilter: true,
};
