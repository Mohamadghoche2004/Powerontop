import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authService, type AuthUser } from "../services/auth.service";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  register: (data: { name: string; email: string; password: string }) => Promise<AuthUser>;
  login: (data: { email: string; password: string }) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => authService.getStoredUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const syncFromStorage = () => {
      setUser(authService.getStoredUser());
    };
    syncFromStorage();
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener("auth-changed", syncFromStorage);
    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener("auth-changed", syncFromStorage);
    };
  }, []);

  const register = useCallback(async (data: { name: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const loggedIn = await authService.register(data);
      setUser(loggedIn);
      window.dispatchEvent(new Event("auth-changed"));
      return loggedIn;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const loggedIn = await authService.login(data);
      setUser(loggedIn);
      window.dispatchEvent(new Event("auth-changed"));
      return loggedIn;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    window.dispatchEvent(new Event("auth-changed"));
  }, []);

  const isAuthenticated = authService.isAuthenticated();

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      register,
      login,
      logout,
    }),
    [user, loading, isAuthenticated, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
