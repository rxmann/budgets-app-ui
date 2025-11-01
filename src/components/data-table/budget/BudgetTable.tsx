"use client";

import { DataTable } from "../DataTable";
import { budgetColumns } from "./BudgetColumns";
import { BudgetResponse } from "@/types/Budget";

interface BudgetTableProps {
  data: BudgetResponse[];
}

export function BudgetTable({ data }: BudgetTableProps) {
  return <DataTable columns={budgetColumns} data={data} />;
}
