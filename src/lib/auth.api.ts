import { get, post } from "./api";
import {
  RegisterRequest,
  AuthenticationRequest,
  AuthenticationResponse,
  UserResponse
} from "@/types/user.types";

export const authApi = {
  getUser: async (): Promise<UserResponse | null> => {
    try {
      return await get<UserResponse>("/users/profile");
    } catch {
      return null;
    }
  },
  register: (data: RegisterRequest) =>
    post<AuthenticationResponse>("/auth/register", data),
  login: (data: AuthenticationRequest) =>
    post<AuthenticationResponse>("/auth/login", data),
  logout: () =>
    post<void>("/auth/logout"),
};
