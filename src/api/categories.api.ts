import { api } from "./axios";

export const categoriesApi = {
  getCategories: async () => {
    const response = await api.get("/api/categories");
    return response;
  },
  getCategory: async (categoryId: string) => {
    const response = await api.get(`/api/categories/${categoryId}`);
    return response;
  },
  createCategory: async (data: { name: string; slug?: string }) => {
    const response = await api.post("/api/categories", data);
    return response;
  },
  updateCategory: async (
    categoryId: string,
    data: Partial<{ name: string; slug: string }>
  ) => {
    const response = await api.put(`/api/categories/${categoryId}`, data);
    return response;
  },
  deleteCategory: async (categoryId: string) => {
    const response = await api.delete(`/api/categories/${categoryId}`);
    return response;
  },
};
