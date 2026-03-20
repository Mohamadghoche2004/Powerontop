import { productVariantsApi } from "../api/productVariants.api";

export const productVariantsService = {
  getVariants: async (productId?: string) => {
    const response = await productVariantsApi.getVariants(productId);
    return response.data;
  },
  getVariant: async (variantId: string) => {
    const response = await productVariantsApi.getVariant(variantId);
    return response.data;
  },
  createVariant: async (data: {
    product: string;
    size: string;
    color: string;
    sku: string;
    stock: number;
    extraPrice: number;
  }) => {
    const response = await productVariantsApi.createVariant(data);
    return response.data;
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
    const response = await productVariantsApi.updateVariant(variantId, data);
    return response.data;
  },
  deleteVariant: async (variantId: string) => {
    const response = await productVariantsApi.deleteVariant(variantId);
    return response.data;
  },
};
