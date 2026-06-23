import { useQuery } from "@tanstack/react-query";

interface FetchOptions {
  enabled?: boolean;
}

function getBaseUrl() {
  return "/api";
}

// ===== Dashboard =====
export function useDashboardMetrics(timeRange: string) {
  return useQuery({
    queryKey: ["dashboard", "metrics", timeRange],
    queryFn: async () => {
      const res = await fetch(
        `${getBaseUrl()}/dashboard/metrics?timeRange=${timeRange}`
      );
      if (!res.ok) throw new Error("Failed to fetch dashboard metrics");
      return res.json();
    },
    staleTime: 60_000,
  });
}

export function useDashboardCallVolume(timeRange: string) {
  return useQuery({
    queryKey: ["dashboard", "callVolume", timeRange],
    queryFn: async () => {
      const res = await fetch(
        `${getBaseUrl()}/dashboard/call-volume?timeRange=${timeRange}`
      );
      if (!res.ok) throw new Error("Failed to fetch call volume");
      return res.json();
    },
    staleTime: 60_000,
  });
}

export function useDashboardDistribution(timeRange: string) {
  return useQuery({
    queryKey: ["dashboard", "distribution", timeRange],
    queryFn: async () => {
      const res = await fetch(
        `${getBaseUrl()}/dashboard/agent-distribution?timeRange=${timeRange}`
      );
      if (!res.ok) throw new Error("Failed to fetch distribution");
      return res.json();
    },
    staleTime: 60_000,
  });
}

export interface RankingFilter {
  tenantId?: string;
  regionId?: string;
  orgId?: string;
}

export function useTokenRanking(dimension: "tenant" | "org", filter?: RankingFilter) {
  const params = new URLSearchParams();
  if (filter?.tenantId) params.set("tenantId", filter.tenantId);
  if (filter?.regionId) params.set("regionId", filter.regionId);
  if (filter?.orgId) params.set("orgId", filter.orgId);

  return useQuery({
    queryKey: ["dashboard", "token-ranking", dimension, filter],
    queryFn: async () => {
      const qs = params.toString();
      const url = `${getBaseUrl()}/dashboard/token-ranking/${dimension}${qs ? `?${qs}` : ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch token ranking");
      return res.json();
    },
    staleTime: 60_000,
  });
}

export function useAgentCountRanking(dimension: "tenant" | "org", filter?: RankingFilter) {
  const params = new URLSearchParams();
  if (filter?.tenantId) params.set("tenantId", filter.tenantId);
  if (filter?.regionId) params.set("regionId", filter.regionId);
  if (filter?.orgId) params.set("orgId", filter.orgId);

  return useQuery({
    queryKey: ["dashboard", "agent-count", dimension, filter],
    queryFn: async () => {
      const qs = params.toString();
      const url = `${getBaseUrl()}/dashboard/agent-count/${dimension}${qs ? `?${qs}` : ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch agent count ranking");
      return res.json();
    },
    staleTime: 60_000,
  });
}

export function useDashboardPerformance(timeRange: string) {
  return useQuery({
    queryKey: ["dashboard", "performance", timeRange],
    queryFn: async () => {
      const res = await fetch(
        `${getBaseUrl()}/dashboard/agent-performance?timeRange=${timeRange}`
      );
      if (!res.ok) throw new Error("Failed to fetch performance");
      return res.json();
    },
    staleTime: 60_000,
  });
}
