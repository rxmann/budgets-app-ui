"use client";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change: number;
  description: string;
  footer: string;
  trend?: "up" | "down";
  icon?: LucideIcon;
}

export function StatCard({
  label,
  value,
  change,
  description,
  footer,
  trend,
  icon: Icon,
}: StatCardProps) {
  const trendDirection = trend || (change >= 0 ? "up" : "down");
  const isPositive = trendDirection === "up";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendIcon />
            {isPositive ? "+" : ""}
            {change}%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {description}
          <TrendIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">{footer}</div>
      </CardFooter>
    </Card>
  );
}
