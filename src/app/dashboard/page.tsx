"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardAnalyticsResponse } from "@/types/Dashboard";
import { useAuth } from "@/components/providers/AuthProvider";
import { analyticsToCardsMapper } from "@/mapper/dashboard.mapper";
import { DashboardSectionCards } from "@/components/cards/cards";
import { ChartAreaInteractive } from "@/components/ChartAreaInteractive";
import { getDashboardAnalytics } from "@/lib/dashboard.api";

// Dashboard Page
export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] =
    useState<DashboardAnalyticsResponse | null>(null);

  // Auth guard
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  // Fetch analytics
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const data = await getDashboardAnalytics("THIS_MONTH");
      setAnalyticsData(data);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-destructive">Failed to load dashboard</p>
      </div>
    );
  }


  const { statCards, net } = analyticsToCardsMapper(analyticsData);

  return (
    <div className="@container/main flex flex-1 flex-col">
      {/* TOP SECTION - CLEANED & ALIGNED */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 pb-2">
        <div className="select-none">
          <h2 className="text-xl font-bold text-foreground">Monthly Financial Overview</h2>
          <p className="text-sm text-muted-foreground">Real-time tracking of your assets and liabilities.</p>
        </div>
      {/* Net Balance Card */}
      {(() => {
        const isPositive = net >= 0;
        const textColor = isPositive ? "text-primary" : "text-tertiary";
        return (
          <div className="p-4 border dark:border-gray-700 rounded-xl shadow-sm min-w-[200px] bg-muted/10 flex flex-col items-center justify-center text-center">
            <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">NET BALANCE</h3>
            <p className={`text-2xl font-bold mt-1 ${textColor}`}>${net.toFixed(2)}</p>
          </div>
        );
      })()}

      </div>

      <div className="flex flex-col gap-4 md:gap-6">
        {/* 4 Stat Cards */}
        <DashboardSectionCards cards={statCards} />
        {/* Chart */}
        <div className="px-4 lg:px-4">
          <ChartAreaInteractive />
        </div>
      </div>
    </div>
  );
}