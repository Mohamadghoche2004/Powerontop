import type { BaseTableData } from "../components/Table/type";

export interface CategoriesTableData extends BaseTableData {
  id: string;
  name: string;
  slug: string;
}

// API response type for category (from backend)
export interface CategoryApiResponse {
  _id: string;
  name: string;
  slug: string;
}
