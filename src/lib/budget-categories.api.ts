import { GetPaginationParams } from "@/types/budget.types";
import { get, post, put, del } from "@/lib/api";
import {
    GetBudgetsCategoriesResponse,
    BudgetCategoryRequest,
    BudgetCategoryResponse
} from "@/types/budget-categories.types";

/**
 * Fetch all budget categories with optional filters and sorting
 */
export const getBudgetCategories = (params?: GetPaginationParams) =>
    get<GetBudgetsCategoriesResponse>("/budgets/categories", { params });

/**
 * Fetch a single budget category by ID
 */
export const getBudgetCategoryById = (categoryId: string) =>
    get<BudgetCategoryResponse>(`/budgets/categories/${categoryId}`);

/**
 * Create a new budget category
 */
export const createBudgetCategory = (data: BudgetCategoryRequest) =>
    post<BudgetCategoryResponse>("/budgets/categories", data);

/**
 * Update an existing budget category
 */
export const updateBudgetCategory = (categoryId: string, data: BudgetCategoryRequest) =>
    put<BudgetCategoryResponse>(`/budgets/categories/${categoryId}`, data);

/**
 * Delete a budget category
 */
export const deleteBudgetCategory = (categoryId: string) =>
    del<void>(`/budgets/categories/${categoryId}`);