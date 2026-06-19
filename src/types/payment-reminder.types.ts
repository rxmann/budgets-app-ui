export type ReminderFrequency =
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "YEARLY"
  | "QUARTERLY"
  | "ONE_TIME";

export type ReminderStatus =
  | "ACTIVE"
  | "SNOOZED"
  | "COMPLETED"
  | "CANCELLED";

export interface PaymentReminderRequest {
  id: string;
  categoryId: string;
  reminderName: string;
  frequency: ReminderFrequency;
  nextDueDate: string; // YYYY-MM-DD
  status?: ReminderStatus;
}

export interface PaymentReminderResponse {
  id: string;
  categoryId: string;
  categoryName?: string;
  reminderName: string;
  frequency: ReminderFrequency;
  nextDueDate: string;
  status: ReminderStatus;
  createdAt?: string;
  updatedAt?: string;
  daysUntilDue?: number;
  shouldNotifyToday?: boolean;
}

export interface AcknowledgeReminderRequest {
  amount: number;
  name?: string;
  budgetDate: string; // date-time string
  receiptUrl?: string;
  tags?: string[];
}
