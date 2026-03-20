import { usersApi } from "../api/users.api";

export const usersService = {
  getUsers: async () => {
    const response = await usersApi.getUsers();
    return response.data;
  },
  getUser: async (userId: string) => {
    const response = await usersApi.getUser(userId);
    return response.data;
  },
  createUser: async (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const response = await usersApi.createUser(data);
    return response.data;
  },
  updateUser: async (
    userId: string,
    data: Partial<{ name: string; email: string; password: string; role: string }>
  ) => {
    const response = await usersApi.updateUser(userId, data);
    return response.data;
  },
  deleteUser: async (userId: string) => {
    const response = await usersApi.deleteUser(userId);
    return response.data;
  },
};
