export interface DashboardMetrics {
  totalCalls: number;
  avgSatisfaction: number;
  errorRate: number;
  tokenCost: number;
  tokenUsage: number;
  trends: {
    calls: { direction: "up" | "down"; value: string };
    satisfaction: { direction: "up" | "down"; value: string };
    errorRate: { direction: "up" | "down"; value: string };
    cost: { direction: "up" | "down"; value: string };
  };
}

export interface ChartDataPoint {
  date: string;
  value: number;
  isHighlight?: boolean;
}

export interface DistributionItem {
  name: string;
  percentage: number;
  color: string;
}

export interface AgentPerformanceRow {
  agentId: string;
  agentName: string;
  icon: string;
  type: string;
  version: string;
  orgName: string;
  tenantId: string;
  regionId: string;
  status: "running" | "pending" | "disabled";
  calls: number | null;
  successRate: number | null;
  avgLatency: string | null;
  rating: number | null;
  tokenUsage: string | null;
}

export interface RankingItem {
  name: string;
  value: number;
  icon?: string;
  subtitle?: string;
  subValue?: string | number;
}
