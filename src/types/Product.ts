import type { BaseTableData } from "../components/Table/type";

export interface ProductsTableData extends BaseTableData {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: string;
  images: string[];
}
