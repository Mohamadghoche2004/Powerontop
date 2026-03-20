import { productsApi } from "../api/products.api";

export const productsService = {
  getProducts: async () => {
    const response = await productsApi.getProducts();
    return response.data;
  },
  getProduct: async (productId: string) => {
    const response = await productsApi.getProduct(productId);
    return response.data;
  },
  createProduct: async (data: {
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
  }) => {
    const response = await productsApi.createProduct(data);
    return response.data;
  },
  updateProduct: async (
    productId: string,
    data: Partial<{
      title: string;
      description: string;
      price: number;
      category: string;
      images: string[];
    }>
  ) => {
    const response = await productsApi.updateProduct(productId, data);
    return response.data;
  },
  deleteProduct: async (productId: string) => {
    const response = await productsApi.deleteProduct(productId);
    return response.data;
  },
};
