import type { BaseTableData } from "../components/Table/type";

export interface ProductVariantsTableData extends BaseTableData {
  id: string;
  product: string;
  productTitle: string;
  size: string;
  color: string;
  sku: string;
  stock: number;
  extraPrice: number;
}

// API response type (from backend)
export interface ProductVariantApiResponse {
  _id: string;
  product: string | { _id: string; title: string; price: number };
  size: string;
  color: string;
  sku: string;
  stock: number;
  extraPrice: number;
  createdAt?: string;
  updatedAt?: string;
}
