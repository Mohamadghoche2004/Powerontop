import { api } from "./axios";

export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post("/api/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post("/api/auth/login", data),
};
