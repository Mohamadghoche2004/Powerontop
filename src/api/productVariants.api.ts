import { api } from "./axios";

export const productVariantsApi = {
  getVariants: async (productId?: string) => {
    const params = productId ? `?productId=${productId}` : "";
    const response = await api.get(`/api/product-variants${params}`);
    return response;
  },
  getVariant: async (variantId: string) => {
    const response = await api.get(`/api/product-variants/${variantId}`);
    return response;
  },
  createVariant: async (data: {
    product: string;
    size: string;
    color: string;
    sku: string;
    stock: number;
    extraPrice: number;
  }) => {
    const response = await api.post("/api/product-variants", data);
    return response;
  },
  updateVariant: async (
    variantId: string,
    data: Partial<{
      size: string;
      color: string;
      sku: string;
      stock: number;
      extraPrice: number;
    }>
  ) => {
    const response = await api.put(
      `/api/product-variants/${variantId}`,
      data
    );
    return response;
  },
  deleteVariant: async (variantId: string) => {
    const response = await api.delete(`/api/product-variants/${variantId}`);
    return response;
  },
};
