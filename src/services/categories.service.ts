import { categoriesApi } from "../api/categories.api";

export const categoriesService = {
  getCategories: async () => {
    const response = await categoriesApi.getCategories();
    return response.data;
  },
  getCategory: async (categoryId: string) => {
    const response = await categoriesApi.getCategory(categoryId);
    return response.data;
  },
  createCategory: async (data: { name: string; slug?: string }) => {
    const response = await categoriesApi.createCategory(data);
    return response.data;
  },
  updateCategory: async (
    categoryId: string,
    data: Partial<{ name: string; slug: string }>
  ) => {
    const response = await categoriesApi.updateCategory(categoryId, data);
    return response.data;
  },
  deleteCategory: async (categoryId: string) => {
    const response = await categoriesApi.deleteCategory(categoryId);
    return response.data;
  },
};
