export type BudgetFrequency =
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "YEARLY"
  | "QUARTERLY"
  | "ONE_TIME";

export interface RecurringBudgetRequest {
  id: string;
  budgetCategoryId: string;
  amount: number;
  name: string;
  description?: string;
  frequency: BudgetFrequency;
  frequencyInterval: number;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
}

export interface RecurringBudgetResponse {
  id: string;
  userId: string;
  budgetCategoryId: string;
  amount: number;
  name: string;
  description?: string;
  frequency: string;
  frequencyInterval: number;
  startDate: string;
  endDate?: string;
  nextOccurrence?: string;
  isActive?: boolean;
}

export type GetRecurringBudgetsResponse = RecurringBudgetResponse[];
