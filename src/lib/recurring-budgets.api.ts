import { get, post, put, patch, del } from "./api";
import { GetPaginationParams } from "@/types/budget.types";
import {
  RecurringBudgetRequest,
  RecurringBudgetResponse,
  GetRecurringBudgetsResponse
} from "@/types/recurring-budget.types";

/**
 * Fetch all recurring budgets with optional filters and sorting
 */
export const getRecurringBudgets = (params?: GetPaginationParams) =>
  get<GetRecurringBudgetsResponse>("/budgets/recurring", { params });

/**
 * Fetch a single recurring budget by ID
 */
export const getRecurringBudget = (id: string) =>
  get<RecurringBudgetResponse>(`/budgets/recurring/${id}`);

/**
 * Create a new recurring budget
 */
export const createRecurringBudget = (data: RecurringBudgetRequest) =>
  post<RecurringBudgetResponse>("/budgets/recurring", data);

/**
 * Update an existing recurring budget
 */
export const updateRecurringBudget = (id: string, data: RecurringBudgetRequest) =>
  put<RecurringBudgetResponse>(`/budgets/recurring/${id}`, data);

/**
 * Delete a recurring budget
 */
export const deleteRecurringBudget = (id: string) =>
  del<void>(`/budgets/recurring/${id}`);

/**
 * Enable a recurring budget
 */
export const enableRecurringBudget = (id: string) =>
  patch<RecurringBudgetResponse>(`/budgets/recurring/${id}/enable`);

/**
 * Disable a recurring budget
 */
export const disableRecurringBudget = (id: string) =>
  patch<RecurringBudgetResponse>(`/budgets/recurring/${id}/disable`);
