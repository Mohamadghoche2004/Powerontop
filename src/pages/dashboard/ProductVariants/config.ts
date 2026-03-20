import type { TableConfig } from "../../../components/Table/type";
import type { ProductVariantsTableData } from "../../../types/ProductVariant";

export const productVariantsConfig: TableConfig<ProductVariantsTableData> = {
  columns: [
    {
      id: "productTitle",
      label: "Product",
      numeric: false,
      disablePadding: true,
      minWidth: 180,
      maxWidth: 250,
    },
    {
      id: "sku",
      label: "SKU",
      numeric: false,
      disablePadding: false,
      minWidth: 140,
      maxWidth: 180,
    },
    {
      id: "size",
      label: "Size",
      numeric: false,
      disablePadding: false,
      minWidth: 80,
      maxWidth: 120,
    },
    {
      id: "color",
      label: "Color",
      numeric: false,
      disablePadding: false,
      minWidth: 100,
      maxWidth: 140,
    },
    {
      id: "stock",
      label: "Stock",
      numeric: true,
      disablePadding: false,
      minWidth: 80,
      maxWidth: 100,
      align: "right",
    },
    {
      id: "extraPrice",
      label: "Extra Price",
      numeric: true,
      disablePadding: false,
      minWidth: 100,
      maxWidth: 130,
      align: "right",
      render: (value) => {
        const price = Number(value);
        return price > 0 ? `+$${price.toFixed(2)}` : "$0.00";
      },
    },
  ],
  title: "Product Variants",
  searchFields: ["productTitle", "sku", "size", "color"],
  defaultOrderBy: "productTitle",
  showAdd: true,
  showFilter: true,
};
