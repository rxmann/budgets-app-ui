// src/lib/auth.api.ts
import { api } from "./api";

type AuthResponse<T> = T;

export const authApi = {
  getUser: async (): Promise<any | null> => {
    try {
      const res = await api.get("/users/profile");
      return res.data;
    } catch (error: any) {
      console.log("[authApi.getUser] Failed:", error.response?.data || error.message);
      return null;
    }
  },
  register: async (data: { email: string; password: string }): Promise<any> => {
    return api.post("/auth/register", data);
  },
  login: async (data: { email: string; password: string }): Promise<any> => {
    return api.post("/auth/login", data);
  },
  logout: async (): Promise<any> => {
    return api.post("/auth/logout");
  },
};


