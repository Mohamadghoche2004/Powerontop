import { api } from "./axios";

export const productsApi = {
  getProducts: async () => {
    const response = await api.get("/api/products");
    return response;
  },
  getProduct: async (productId: string) => {
    const response = await api.get(`/api/products/${productId}`);
    return response;
  },
  createProduct: async (data: {
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
  }) => {
    const response = await api.post("/api/products", data);
    return response;
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
    const response = await api.put(`/api/products/${productId}`, data);
    return response;
  },
  deleteProduct: async (productId: string) => {
    const response = await api.delete(`/api/products/${productId}`);
    return response;
  },
};
