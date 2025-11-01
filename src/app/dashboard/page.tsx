"use client";

import { BudgetCategoryAreaChart } from "@/components/BudgetCategoryAreaChart";
import { ChartAreaInteractive } from "@/components/ChartAreaInteractive";
import {
  CardData,
  DashboardSectionCards,
} from "@/components/DashboardSectionCard";

const chartData = [
  { date: "Jan 01", groceries: 1200, utilities: 300, entertainment: 400 },
  { date: "Jan 02", groceries: 1400, utilities: 320, entertainment: 350 },
  { date: "Jan 03", groceries: 1100, utilities: 310, entertainment: 500 },
  { date: "Jan 04", groceries: 1300, utilities: 280, entertainment: 420 },
  { date: "Jan 05", groceries: 1500, utilities: 330, entertainment: 380 },
  { date: "Jan 06", groceries: 1200, utilities: 300, entertainment: 450 },
  { date: "Jan 07", groceries: 1400, utilities: 320, entertainment: 400 },
  // Add more data as needed
];
const categories = [
  { key: "groceries", label: "Groceries", color: "hsl(var(--chart-1))" },
  { key: "utilities", label: "Utilities", color: "hsl(var(--chart-2))" },
  {
    key: "entertainment",
    label: "Entertainment",
    color: "hsl(var(--chart-3))",
  },
];
export default function DashboardPage() {
  const dashboardCards: CardData[] = [
    {
      label: "Total Budget",
      value: "$5,250.00",
      change: 12.5,
      description: "Trending up this month",
      footer: "Budget allocation for this period",
      trend: "up",
    },
    {
      label: "Income",
      value: "$8,500.00",
      change: 8.2,
      description: "Strong income this month",
      footer: "Total earnings received",
      trend: "up",
    },
    {
      label: "Expense",
      value: "$3,250.00",
      change: -5.3,
      description: "Down from last month",
      footer: "Total spending this period",
      trend: "down",
    },
    {
      label: "Recurring Budgets",
      value: "2",
      change: 1,
      description: "New today",
      footer: "Payments auto added today",
      trend: "up",
    },
    {
      label: "Reminders Today",
      value: "3",
      change: 0,
      description: "Pending actions",
      footer: "Payments due today",
      trend: "up",
    },
  ];

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <DashboardSectionCards cards={dashboardCards} />
        <div className="px-4 lg:px-4">
          <ChartAreaInteractive />
        </div>
        {/* <DataTable data={data} /> */}
      </div>
    </div>
  );
}
