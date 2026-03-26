import type { ProductsTableData } from "../../types/Product";

/** Normalize API product payload for storefront pages. */
export function mapApiProduct(product: Record<string, unknown>): ProductsTableData {
  const category = product.category as
    | { name?: string; _id?: string }
    | string
    | undefined;
  const isObj = category != null && typeof category === "object";

  return {
    id: String((product._id as string) || (product.id as string) || ""),
    title: String(product.title ?? ""),
    description: String(product.description ?? ""),
    price: Number(product.price) || 0,
    category: isObj ? String((category as { name?: string }).name ?? "") : "",
    categoryId: isObj
      ? String((category as { _id?: string })._id ?? "")
      : String(category ?? ""),
    images: Array.isArray(product.images) ? (product.images as string[]) : [],
  };
}
