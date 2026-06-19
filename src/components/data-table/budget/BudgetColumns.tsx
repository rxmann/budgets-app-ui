import { ColumnDef } from "@tanstack/react-table";
import { BudgetResponse } from "@/types/budget.types";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Calendar } from "lucide-react";

const budgetTypeColors: Record<string, string> = {
  INCOME: "bg-emerald-100/90 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 font-bold border-none text-[10px] tracking-wide px-2.5 py-0.75 rounded-md select-none",
  SAVINGS: "bg-emerald-100/90 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 font-bold border-none text-[10px] tracking-wide px-2.5 py-0.75 rounded-md select-none",
  EXPENSE: "bg-red-100/90 text-red-800 dark:bg-red-900/40 dark:text-red-200 font-bold border-none text-[10px] tracking-wide px-2.5 py-0.75 rounded-md select-none",
  INVESTMENT: "bg-red-100/90 text-red-800 dark:bg-red-900/40 dark:text-red-200 font-bold border-none text-[10px] tracking-wide px-2.5 py-0.75 rounded-md select-none",
  LOAN: "bg-red-100/90 text-red-800 dark:bg-red-900/40 dark:text-red-200 font-bold border-none text-[10px] tracking-wide px-2.5 py-0.75 rounded-md select-none",
  LEND: "bg-red-100/90 text-red-800 dark:bg-red-900/40 dark:text-red-200 font-bold border-none text-[10px] tracking-wide px-2.5 py-0.75 rounded-md select-none",
  EXTRA: "bg-red-100/90 text-red-800 dark:bg-red-900/40 dark:text-red-200 font-bold border-none text-[10px] tracking-wide px-2.5 py-0.75 rounded-md select-none",
};

export const budgetColumns: ColumnDef<BudgetResponse>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 hover:text-foreground cursor-pointer font-semibold uppercase text-xs text-muted-foreground select-none"
      >
        NAME
        <ArrowUpDown className="h-3 w-3 text-muted-foreground/70" />
      </button>
    ),
    cell: ({ getValue }) => (
      <div className="font-semibold text-slate-800 dark:text-slate-100">{getValue<string>()}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "budgetCategoryName",
    header: () => (
      <span className="font-semibold uppercase text-xs text-muted-foreground select-none">
        CATEGORY
      </span>
    ),
    cell: ({ getValue }) => (
      <div className="text-slate-600 dark:text-slate-300 font-medium">{getValue<string>()}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "budgetType",
    header: () => (
      <span className="font-semibold uppercase text-xs text-muted-foreground select-none">
        TYPE
      </span>
    ),
    cell: (info) => {
      const type = info.getValue() as string;
      return (
        <div className="flex">
          <Badge className={budgetTypeColors[type] || ""}>{type}</Badge>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 hover:text-foreground cursor-pointer font-semibold uppercase text-xs text-muted-foreground select-none"
      >
        AMOUNT
        <ArrowUpDown className="h-3 w-3 text-muted-foreground/70" />
      </button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const type = row.original.budgetType;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      let colorClass = "text-slate-600 dark:text-slate-400 font-medium";
      if (type === "INCOME" || type === "SAVINGS") {
        colorClass = "text-emerald-600 dark:text-emerald-400 font-semibold";
      } else {
        colorClass = "text-red-500 dark:text-red-400 font-semibold";
      }

      return (
        <div className={colorClass}>
          {formatted}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "budgetDate",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 hover:text-foreground cursor-pointer font-semibold uppercase text-xs text-muted-foreground select-none"
      >
        DATE
        <Calendar className="h-3.5 w-3.5 text-muted-foreground/70" />
      </button>
    ),
    cell: (info) => {
      const value = info.getValue() as string;
      const date = new Date(value);
      const formatted = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return <div className="text-slate-600 dark:text-slate-300">{formatted}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    size: 20,
    header: () => <div className="text-center">ACTIONS</div>,
    cell: ({ row, table }) => {
      const payment = row.original;
      const meta = table.options.meta;
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => meta?.onEdit?.(payment)}
              >
                Edit{" "}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                variant="destructive"
                onClick={() => meta?.onDelete?.(payment)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];