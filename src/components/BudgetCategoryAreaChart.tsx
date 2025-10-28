"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export interface CategoryChartData {
  date: string;
  [key: string]: string | number;
}

interface BudgetCategoryAreaChartProps {
  title?: string;
  description?: string;
  data: CategoryChartData[];
  categories: {
    key: string;
    label: string;
    color: string;
  }[];
  timeRange?: "7d" | "30d" | "90d";
  onTimeRangeChange?: (range: "7d" | "30d" | "90d") => void;
}

export function BudgetCategoryAreaChart({
  title = "Budget Overview",
  description = "Category breakdown over time",
  data,
  categories,
  timeRange = "30d",
  onTimeRangeChange,
}: BudgetCategoryAreaChartProps) {
  const [selectedRange, setSelectedRange] = useState(timeRange);

  const handleRangeChange = (range: "7d" | "30d" | "90d") => {
    setSelectedRange(range);
    onTimeRangeChange?.(range);
  };

  // Build chart config dynamically
  const chartConfig: ChartConfig = {
    date: {
      label: "Date",
    },
  };

  categories.forEach((cat) => {
    chartConfig[cat.key] = {
      label: cat.label,
      color: cat.color,
    };
  });

  const timeRangeLabel = {
    "7d": "Last 7 days",
    "30d": "Last 30 days",
    "90d": "Last 90 days",
  };

  return (
    <Card className="@container/chart">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div className="space-y-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Select value={selectedRange} onValueChange={handleRangeChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data}
            margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
          >
            <defs>
              {categories.map((cat) => (
                <linearGradient
                  key={cat.key}
                  id={cat.key}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={cat.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={cat.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            {categories.map((cat) => (
              <Area
                key={cat.key}
                type="monotone"
                dataKey={cat.key}
                stroke={cat.color}
                fill={`url(#${cat.key})`}
                stackId="1"
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
