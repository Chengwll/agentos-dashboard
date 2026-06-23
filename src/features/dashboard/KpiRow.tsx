import { KpiCard } from "@/components/shared/KpiCard";
import type { DashboardMetrics } from "@/types/dashboard";

interface KpiRowProps {
  metrics: DashboardMetrics | undefined;
  isLoading: boolean;
}

export function KpiRow({ metrics, isLoading }: KpiRowProps) {
  const kpis = [
    {
      title: "总调用次数",
      value: metrics?.totalCalls?.toLocaleString() ?? "-",
      icon: (
        <svg width="18" height="18" fill="none" stroke="#4F46E5" strokeWidth="1.5" viewBox="0 0 24 24">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      trend: metrics?.trends?.calls,
      variant: "brand" as const,
    },
    {
      title: "平均满意度",
      value: metrics?.avgSatisfaction ?? "-",
      unit: "/5",
      icon: (
        <svg width="18" height="18" fill="none" stroke="#10B981" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z" />
        </svg>
      ),
      trend: metrics?.trends?.satisfaction,
      variant: "green" as const,
    },
    {
      title: "错误率",
      value: metrics?.errorRate ?? "-",
      unit: "%",
      icon: (
        <svg width="18" height="18" fill="none" stroke="#F59E0B" strokeWidth="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      trend: metrics?.trends?.errorRate,
      variant: "amber" as const,
      reverseTrend: true,
    },
    {
      title: "Token 消耗成本",
      value: metrics?.tokenCost ? `¥${metrics.tokenCost}` : "-",
      unit: "万",
      icon: (
        <svg width="18" height="18" fill="none" stroke="#EF4444" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
      trend: metrics?.trends?.cost,
      variant: "red" as const,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      {kpis.map((kpi) => (
        <KpiCard
          key={kpi.title}
          title={kpi.title}
          value={kpi.value}
          unit={kpi.unit}
          icon={kpi.icon}
          trend={kpi.trend}
          variant={kpi.variant}
          reverseTrend={"reverseTrend" in kpi ? kpi.reverseTrend : undefined}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
