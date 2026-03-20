import type { TableConfig } from "../../../components/Table/type";
import type { CategoriesTableData } from "../../../types/Category";

// Define Category data structure for table display
export const categoriesConfig: TableConfig<CategoriesTableData> = {
  columns: [
    {
      id: "name",
      label: "Name",
      numeric: false,
      disablePadding: true,
      minWidth: 200,
      maxWidth: 300,
    },
    {
      id: "slug",
      label: "Slug",
      numeric: false,
      disablePadding: false,
      minWidth: 200,
      maxWidth: 300,
    },
  ],
  title: "Categories",
  searchFields: ["name", "slug"],
  defaultOrderBy: "name",
  showAdd: true,
  showFilter: false,
};
