import { get, post, put, patch, del } from "./api";
import {
  PaymentReminderRequest,
  PaymentReminderResponse,
  AcknowledgeReminderRequest
} from "@/types/payment-reminder.types";

/**
 * Fetch all payment reminders
 */
export const getAllPaymentReminders = () =>
  get<PaymentReminderResponse[]>("/payment-reminders");

/**
 * Create a new payment reminder
 */
export const createPaymentReminder = (data: PaymentReminderRequest) =>
  post<PaymentReminderResponse>("/payment-reminders", data);

/**
 * Update an existing payment reminder
 */
export const updatePaymentReminder = (id: string, data: PaymentReminderRequest) =>
  put<PaymentReminderResponse>(`/payment-reminders/${id}`, data);

/**
 * Delete a payment reminder
 */
export const deletePaymentReminder = (id: string) =>
  del<void>(`/payment-reminders/${id}`);

/**
 * Snooze a payment reminder
 */
export const snoozeReminder = (id: string) =>
  patch<PaymentReminderResponse>(`/payment-reminders/${id}/snooze`);

/**
 * Acknowledge a payment reminder (marking it paid and generating a budget entry)
 */
export const acknowledgeReminder = (id: string, data: AcknowledgeReminderRequest) =>
  patch<PaymentReminderResponse>(`/payment-reminders/${id}/acknowledge`, data);

/**
 * Get upcoming payment reminders
 */
export const getUpcomingPaymentReminders = () =>
  get<PaymentReminderResponse[]>("/payment-reminders/upcoming");

/**
 * Get reminders that need notification today
 */
export const getRemindersToNotify = () =>
  get<PaymentReminderResponse[]>("/payment-reminders/notifications");
