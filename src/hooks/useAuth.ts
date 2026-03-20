import { useState } from "react";
import { authService } from "../services/auth.service";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    const user = await authService.register(data);
    setUser(user);
    setLoading(false);
  };

  const login = async (data: { email: string; password: string }) => {
    setLoading(true);
    const user = await authService.login(data);
    setUser(user);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setUser(null);
  };

  return { user, loading, register, login, logout };
};
