import {
    BudgetResponse,
    CreateBudgetRequest,
    GetPaginationParams,
    GetBudgetsResponse,
    UpdateBudgetRequest
} from "@/types/budget.types";
import { get, post, put, del } from "@/lib/api";

/**
 * Fetch all budgets with optional filters and sorting
 */
export const getBudgets = (params?: GetPaginationParams) =>
    get<GetBudgetsResponse>("/budgets", { params });

/**
 * Fetch a single budget by ID
 */
export const getBudgetById = (id: string) =>
    get<BudgetResponse>(`/budgets/${id}`);

/**
 * Create a new budget
 */
export const createBudget = (budget: CreateBudgetRequest) =>
    post<BudgetResponse>("/budgets", budget);

/**
 * Update an existing budget
 */
export const updateBudget = (id: string, budget: UpdateBudgetRequest) =>
    put<BudgetResponse>(`/budgets/${id}`, budget);

/**
 * Delete a budget
 */
export const deleteBudget = (id: string) =>
    del<void>(`/budgets/${id}`);