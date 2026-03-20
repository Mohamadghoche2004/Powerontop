import { api } from "./axios";

export const usersApi = {
  getUsers: async () => {
    const response = await api.get("/api/users");
    return response;
  },
  getUser: async (userId: string) => {
    const response = await api.get(`/api/users/${userId}`);
    return response;
  },
  createUser: async (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const response = await api.post("/api/users", data);
    return response;
  },
  updateUser: async (
    userId: string,
    data: Partial<{ name: string; email: string; password: string; role: string }>
  ) => {
    const response = await api.put(`/api/users/${userId}`, data);
    return response;
  },
  deleteUser: async (userId: string) => {
    const response = await api.delete(`/api/users/${userId}`);
    return response;
  },
};