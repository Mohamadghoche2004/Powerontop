import React from "react";
import type { TableConfig } from "../../../components/Table/type";
import type { ProductsTableData } from "../../../types/Product";

// Define Product data structure for table display
export const productsConfig: TableConfig<ProductsTableData> = {
  columns: [
    {
      id: "images",
      label: "Image",
      numeric: false,
      disablePadding: false,
      minWidth: 70,
      maxWidth: 70,
      sortable: false,
      render: (value: ProductsTableData[keyof ProductsTableData]) => {
        const images = value as string[];
        if (!images || images.length === 0) {
          return React.createElement("div", {
            style: {
              width: 40,
              height: 40,
              borderRadius: 6,
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              color: "#999",
            },
          }, "N/A");
        }
        return React.createElement("img", {
          src: images[0],
          alt: "Product",
          style: {
            width: 40,
            height: 40,
            objectFit: "cover",
            borderRadius: 6,
          },
        });
      },
    },
    {
      id: "title",
      label: "Title",
      numeric: false,
      disablePadding: true,
      minWidth: 200,
      maxWidth: 250,
    },
    {
      id: "description",
      label: "Description",
      numeric: false,
      disablePadding: false,
      minWidth: 300,
      maxWidth: 400,
    },
    {
      id: "price",
      label: "Price",
      numeric: true,
      disablePadding: false,
      minWidth: 100,
      maxWidth: 150,
      align: "right",
      render: (value: ProductsTableData[keyof ProductsTableData]) => {
        const price = Number(value);
        return `$${price.toFixed(2)}`;
      },
    },
    {
      id: "category",
      label: "Category",
      numeric: false,
      disablePadding: false,
      minWidth: 150,
      maxWidth: 200,
    },
  ],
  title: "Products",
  searchFields: ["title", "description", "category"],
  defaultOrderBy: "title",
  showAdd: true,
  showFilter: true,
};
