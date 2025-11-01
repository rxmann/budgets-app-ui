"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filter, X } from "lucide-react";

interface FilterCondition {
  id: string;
  field: string;
  operation: string;
  value: string;
}

interface FilterComponentProps {
  onApplyFilter: (filters: FilterCondition[]) => void;
}

const filterFields = [
  { label: "Name", value: "name" },
  { label: "Category", value: "budgetCategoryName" },
  { label: "Budget Type", value: "budgetType" },
  { label: "Amount", value: "amount" },
  { label: "Date", value: "createdAt" },
];

const filterOperations = [
  { label: "Equals", value: "equals" },
  { label: "Contains", value: "contains" },
  { label: "Greater Than", value: "gt" },
  { label: "Less Than", value: "lt" },
  { label: "Between", value: "between" },
];

export function FilterComponent({ onApplyFilter }: FilterComponentProps) {
  const [filters, setFilters] = useState<FilterCondition[]>([
    { id: "1", field: "", operation: "", value: "" },
  ]);

  const addFilter = () => {
    if (filters.length < 3) {
      setFilters([
        ...filters,
        {
          id: Date.now().toString(),
          field: "",
          operation: "",
          value: "",
        },
      ]);
    }
  };

  const removeFilter = (id: string) => {
    if (filters.length > 1) {
      setFilters(filters.filter((f) => f.id !== id));
    }
  };

  const updateFilter = (
    id: string,
    key: keyof FilterCondition,
    value: string
  ) => {
    setFilters(filters.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const handleApply = () => {
    const validFilters = filters.filter(
      (f) => f.field && f.operation && f.value
    );
    onApplyFilter(validFilters);
  };

  const handleClearAll = () => {
    setFilters([{ id: "1", field: "", operation: "", value: "" }]);
    onApplyFilter([]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-semibold text-sm">Filters</span>
            <Button
              variant={"ghost"}
              onClick={handleClearAll}
              className="ml-auto cursor-pointer "
              size="sm"
            >
              Reset Filters
            </Button>
          </div>

          <div className="space-y-3">
            {filters.map((filter, index) => (
              <div key={filter.id} className="flex items-center gap-2">
                <Select
                  value={filter.field}
                  onValueChange={(val) => updateFilter(filter.id, "field", val)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Field" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterFields.map((field) => (
                      <SelectItem key={field.value} value={field.value}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filter.operation}
                  onValueChange={(val) =>
                    updateFilter(filter.id, "operation", val)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Operation" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOperations.map((op) => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Value"
                  value={filter.value}
                  onChange={(e) =>
                    updateFilter(filter.id, "value", e.target.value)
                  }
                  className="flex-1"
                />

                <button
                  onClick={() => removeFilter(filter.id)}
                  className="text-gray-400 hover:text-red-600 p-1"
                  disabled={filters.length === 1}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t">
            {filters.length < 3 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={addFilter}
                className="cursor-pointer text-xs"
              >
                + Add Filter
              </Button>
            )}
            <Button
              onClick={handleApply}
              className="ml-auto cursor-pointer"
              size="sm"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
