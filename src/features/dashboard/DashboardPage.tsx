import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  useDashboardMetrics,
  useDashboardCallVolume,
  useDashboardPerformance,
} from "@/hooks/useDashboardData";
import { KpiRow } from "./KpiRow";
import { CallVolumeChart } from "./CallVolumeChart";
import { AgentPerformanceTable } from "./AgentPerformanceTable";
import { TokenRanking } from "./TokenRanking";
import { AgentCountRanking } from "./AgentCountRanking";
import { ChartCard } from "@/components/shared/ChartCard";
import { timeRanges } from "@/config/constants";
import { regionLabels } from "@/config/constants";
import { mockTenants } from "@/mocks/data/organizations";
import { CascadingFilter, type FilterSelection } from "@/components/shared/CascadingFilter";

const timeLabelMap: Record<string, string> = {
  "7d": "近 7 天",
  "30d": "近 30 天",
  "90d": "近 90 天",
};

export function DashboardPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [filterTenant, setFilterTenant] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterOrg, setFilterOrg] = useState("");

  const { data: metrics, isLoading: metricsLoading } =
    useDashboardMetrics(timeRange);
  const { data: callVolume, isLoading: chartLoading } =
    useDashboardCallVolume(timeRange);
  const { data: performance, isLoading: perfLoading } =
    useDashboardPerformance(timeRange);

  const subtitle = timeLabelMap[timeRange] || "近 30 天";

  const filterSelection: FilterSelection = {
    tenantId: filterTenant,
    regionId: filterRegion,
    orgId: filterOrg,
    orgName: filterOrg,
  };

  const rankingFilter = useMemo(() => ({
    tenantId: filterTenant || undefined,
    regionId: filterRegion || undefined,
    orgId: filterOrg || undefined,
  }), [filterTenant, filterRegion, filterOrg]);

  // Filter performance data (client-side supplement to API filtering)
  const filteredPerformance = useMemo(() => {
    if (!performance) return undefined;
    return performance.filter((row: { tenantId?: string; regionId?: string; orgName?: string }) => {
      if (filterTenant && row.tenantId !== filterTenant) return false;
      if (filterRegion && row.regionId !== filterRegion) return false;
      if (filterOrg && row.orgName !== filterOrg) return false;
      return true;
    });
  }, [performance, filterTenant, filterRegion, filterOrg]);

  const hasFilter = filterTenant || filterRegion || filterOrg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="p-6"
    >
      {/* Header: title + global filter + time range + export */}
      <div className="flex items-center justify-between mb-4 mt-1">
        <div>
          <h1 className="text-lg font-bold text-[#18181B] dark:text-[#FAFAFA]">
            运营监测
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            {hasFilter ? (
              <>
                {mockTenants.find((t) => t.id === filterTenant)?.name || "全部租户"}
                {filterRegion ? ` · ${regionLabels[filterRegion] || filterRegion}` : ""}
                {filterOrg ? ` · ${filterOrg}` : ""}
                {" · "}{subtitle}
              </>
            ) : (
              <>多租户全局监控 · {subtitle}</>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Global cascading filter (clear button integrated) */}
          <CascadingFilter
            value={filterSelection}
            onChange={(sel: FilterSelection) => {
              setFilterTenant(sel.tenantId);
              setFilterRegion(sel.regionId);
              setFilterOrg(sel.orgName);
            }}
          />

          {/* Separator */}
          <span className="w-px h-5 bg-[#E4E4E7] dark:bg-[#27272A] mx-0.5" />

          {/* Time range — ButtonGroup */}
          <div className="flex bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg p-0.5">
            {timeRanges.map((tr) => (
              <button
                key={tr.value}
                onClick={() => setTimeRange(tr.value)}
                className={`text-[12px] px-3 py-1.5 rounded-[7px] font-medium transition-colors ${
                  timeRange === tr.value
                    ? "bg-white dark:bg-[#3F3F46] text-[#18181B] dark:text-[#FAFAFA] shadow-sm"
                    : "text-[#71717A] hover:text-[#52525B] dark:hover:text-[#A1A1AA]"
                }`}
              >
                {tr.label}
              </button>
            ))}
          </div>

          {/* Export — coming soon */}
          <button
            title="即将上线"
            className="text-[12.5px] px-3 py-1.5 rounded-lg border border-dashed border-[#D1D1D6] dark:border-[#3F3F46] text-[#A1A1AA] flex items-center gap-1 flex-shrink-0 cursor-not-allowed opacity-60"
          >
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            导出报告
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <KpiRow metrics={metrics} isLoading={metricsLoading} />

      {/* Call Volume Chart */}
      <ChartCard title="调用量趋势" subtitle={<span className="text-xs text-[#A1A1AA]">{subtitle} · 日维度</span>} className="mb-4">
        <CallVolumeChart data={callVolume} isLoading={chartLoading} />
      </ChartCard>

      {/* Ranking Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <TokenRanking filter={rankingFilter} />
        <AgentCountRanking filter={rankingFilter} />
      </div>

      {/* Performance Table */}
      <ChartCard title="Agent 运行明细" subtitle={<span className="text-xs text-[#A1A1AA]">{subtitle}各 Agent 性能一览</span>}>
        <AgentPerformanceTable
          data={filteredPerformance}
          isLoading={perfLoading}
        />
      </ChartCard>
    </motion.div>
  );
}
