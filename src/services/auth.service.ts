import { authApi } from "../api/auth.api";

export const authService = {
  register: async (data: { name: string; email: string; password: string }) => {
    const res = await authApi.register(data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userRole", res.data.user.role);

    return res.data.user;
  },

  login: async (data: { email: string; password: string }) => {
    const res = await authApi.login(data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userRole", res.data.user.role);

    return res.data.user;
  },
};
