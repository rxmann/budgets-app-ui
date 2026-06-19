import { get } from "./api";
import { GetPaginationParams } from "@/types/budget.types";
import { User } from "@/types/user.types";

/**
 * Fetch all users with pagination and filtering
 */
export const getUsers = (params?: GetPaginationParams) =>
  get<User[]>("/users", { params });
