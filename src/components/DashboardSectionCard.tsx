"use client";

import { StatCard } from "./StatCard";

export interface CardData {
  label: string;
  value: string | number;
  change: number;
  description: string;
  footer: string;
  trend?: "up" | "down";
}

interface SectionCardsProps {
  cards: CardData[];
}

export function DashboardSectionCards({ cards }: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
}
