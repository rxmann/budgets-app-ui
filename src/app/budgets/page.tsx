"use client";

import { BudgetTable } from "@/components/data-table/budget/BudgetTable";
import { Button } from "@/components/ui/button";
import { getBudgetData } from "@/lib/mock-data";
import { BudgetResponse } from "@/types/Budget";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function BudgetsPage() {
  const [data, setData] = useState<BudgetResponse[]>([]);

  useEffect(() => {
    getBudgetData().then(setData);
  }, []);

  return (
    <div className="@container/main flex mx-auto p-4 space-y-4 flex-col">
      {/* <div className="container mx-auto py-4 space-y-4"> */}
      <div>
        <h1 className="text-3xl font-bold">Budgets</h1>
        <p className="text-muted-foreground">
          Manage your budgets and expenses
        </p>
      </div>

      <BudgetTable data={data} />
      {/* </div> */}
    </div>
  );
}
