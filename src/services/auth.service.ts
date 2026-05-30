import { authApi } from "../api/auth.api";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

const AUTH_KEYS = ["token", "userRole", "userId", "userName", "userEmail"] as const;

export const authService = {
  register: async (data: { name: string; email: string; password: string }) => {
    const res = await authApi.register(data);
    const payload = res.data;
    const rawUser = payload.user ?? payload;
    authService.persistSession(payload.token, rawUser);
    return authService.normalizeUser(rawUser, payload.role);
  },

  login: async (data: { email: string; password: string }) => {
    const res = await authApi.login(data);
    const payload = res.data;
    const rawUser = payload.user ?? payload;
    authService.persistSession(payload.token, rawUser);
    return authService.normalizeUser(rawUser, payload.role);
  },

  persistSession: (
    token: string,
    user: { _id?: string; id?: string; role?: string; name?: string; email?: string }
  ) => {
    localStorage.setItem("token", token);
    const role = user.role;
    if (role != null) {
      localStorage.setItem("userRole", String(role));
    }
    const id = user._id ?? user.id;
    if (id != null) {
      localStorage.setItem("userId", String(id));
    }
    if (user.name != null) {
      localStorage.setItem("userName", String(user.name));
    }
    if (user.email != null) {
      localStorage.setItem("userEmail", String(user.email));
    }
  },

  normalizeUser: (
    user: { _id?: string; id?: string; name?: string; email?: string; role?: string },
    fallbackRole?: string
  ): AuthUser => ({
    _id: String(user._id ?? user.id ?? localStorage.getItem("userId") ?? ""),
    name: user.name ?? localStorage.getItem("userName") ?? "",
    email: user.email ?? localStorage.getItem("userEmail") ?? "",
    role: (user.role ?? fallbackRole ?? localStorage.getItem("userRole") ?? "user") as
      | "user"
      | "admin",
  }),

  getStoredUser: (): AuthUser | null => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userRole = (localStorage.getItem("userRole") as "user" | "admin" | null) ?? "user";

    return {
      _id: userId ?? "",
      name: userName ?? "",
      email: userEmail ?? "",
      role: userRole,
    };
  },

  logout: () => {
    AUTH_KEYS.forEach((key) => localStorage.removeItem(key));
  },

  isAuthenticated: () => Boolean(localStorage.getItem("token")),
};
