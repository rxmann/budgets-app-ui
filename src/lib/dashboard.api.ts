import { get } from "@/lib/api";
import {
    DashboardAnalyticsResponse,
    ExpenseDistributionMetric,
    CashFlowResponse,
    TreeMapResponse
} from "@/types/Dashboard";

export type DashboardFilter = "THIS_WEEK" | "THIS_MONTH" | "THIS_QUARTER" | "THIS_YEAR";

/**
 * Fetch dashboard analytics overview
 */
export const getDashboardAnalytics = async (filter: DashboardFilter): Promise<DashboardAnalyticsResponse | null> => {
    try {
        return await get<DashboardAnalyticsResponse>("/dashboard/analytics", {
            params: { filter },
        });
    } catch (err) {
        console.error("Dashboard API error:", err);
        return null;
    }
};

/**
 * Fetch expense distribution metrics
 */
export const getExpenseDistribution = (filter: DashboardFilter) =>
    get<ExpenseDistributionMetric[]>("/dashboard/analytics/expense-distribution", {
        params: { filter },
    });

/**
 * Fetch cashflow analytics
 */
export const getCashflowAnalytics = (filter: DashboardFilter) =>
    get<CashFlowResponse[]>("/dashboard/analytics/cashflow", {
        params: { filter },
    });

/**
 * Fetch budget splits composition
 */
export const getBudgetSplits = (filter: DashboardFilter) =>
    get<TreeMapResponse>("/dashboard/analytics/budget-composition", {
        params: { filter },
    });