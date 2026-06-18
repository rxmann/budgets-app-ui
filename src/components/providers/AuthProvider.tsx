"use client"
import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { authApi } from "@/lib/auth.api";

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => { },
  register: async () => { },
  logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/register");

  const checkAuth = async () => {
    try {
      const data = await authApi.getUser();
      if (data) {
        setUser(data);
        if (isAuthPage) {
          router.replace("/dashboard");
        }
      } else {
        setUser(null);
        if (!isAuthPage) {
          router.replace("/login");
        }
      }
    } catch (error) {
      setUser(null);
      if (!isAuthPage) {
        router.replace("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount only – re-running on pathname changes causes redirect loops

  const login = async (data: any) => {
    await authApi.login(data);
    const userProfile = await authApi.getUser();
    setUser(userProfile);
    router.push("/dashboard");
  };

  const register = async (data: any) => {
    await authApi.register(data);
    router.push("/login");
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {loading && !isAuthPage ? (
        <div className="flex h-svh w-full items-center justify-center bg-background">
          <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
