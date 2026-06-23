import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import type { AgentPerformanceRow } from "@/types/dashboard";

interface AgentPerformanceTableProps {
  data: AgentPerformanceRow[] | undefined;
  isLoading: boolean;
}

export function AgentPerformanceTable({
  data,
  isLoading,
}: AgentPerformanceTableProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <table className="w-full">
          <thead>
            <tr>
              {Array.from({ length: 8 }).map((_, i) => (
                <th key={i} className="text-left p-3">
                  <div className="h-3 bg-[#F4F4F5] dark:bg-[#27272A] rounded w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-t border-[#E4E4E7] dark:border-[#27272A]">
                {Array.from({ length: 8 }).map((_, j) => (
                  <td key={j} className="p-3">
                    <div className="h-4 bg-[#F4F4F5] dark:bg-[#27272A] rounded w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState title="暂无数据" description="当前时间范围内没有 Agent 运行数据" />;
  }

  const columns = [
    { key: "name", label: "Agent 名称", width: "" },
    { key: "version", label: "版本", width: "w-[70px]" },
    { key: "status", label: "状态", width: "w-[90px]" },
    { key: "calls", label: "调用次数", width: "w-[90px]" },
    { key: "successRate", label: "成功率", width: "w-[120px]" },
    { key: "latency", label: "平均延迟", width: "w-[90px]" },
    { key: "rating", label: "满意度", width: "w-[80px]" },
    { key: "tokens", label: "Token 消耗", width: "w-[100px]" },
  ];

  return (
    <div className="-mx-[22px] -mb-[22px]">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider px-4 py-3 text-left border-b border-[#E4E4E7] dark:border-[#27272A] bg-[#F9F9FA] dark:bg-[#0C0C0F] whitespace-nowrap ${col.width}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.agentId}
              className="border-b border-[#E4E4E7] dark:border-[#27272A] hover:bg-brand-50/30 dark:hover:bg-brand-50/5 transition-colors"
            >
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 bg-brand-50 dark:bg-brand-50/10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                    {row.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-[#18181B] dark:text-[#FAFAFA] truncate">
                      {row.agentName}
                    </div>
                    <div className="text-[11px] text-[#A1A1AA] truncate">
                      {row.type} · {row.orgName}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-[13px] text-[#52525B] dark:text-[#A1A1AA] whitespace-nowrap">
                {row.version}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <StatusBadge status={row.status} />
              </td>
              <td className="px-4 py-3 text-[13px] text-[#52525B] dark:text-[#A1A1AA] whitespace-nowrap">
                {row.calls?.toLocaleString() ?? "-"}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {row.successRate != null ? (
                  <div className="flex items-center gap-2">
                    <div className="h-[5px] bg-[#E4E4E7] dark:bg-[#27272A] rounded-[3px] flex-1 max-w-[80px] overflow-hidden">
                      <div
                        className="h-full rounded-[3px] bg-gradient-to-r from-brand to-brand-300"
                        style={{ width: `${row.successRate}%` }}
                      />
                    </div>
                    <span className="text-[12px] font-medium text-[#52525B] dark:text-[#A1A1AA]">
                      {row.successRate}%
                    </span>
                  </div>
                ) : (
                  <span className="text-[13px] text-[#A1A1AA]">-</span>
                )}
              </td>
              <td className="px-4 py-3 text-[13px] text-[#52525B] dark:text-[#A1A1AA] whitespace-nowrap">
                {row.avgLatency ?? "-"}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {row.rating != null ? (
                  <span className="text-[12px] font-medium text-[#F59E0B]">
                    {"★".repeat(Math.floor(row.rating))}
                    {row.rating % 1 >= 0.5 ? "★" : "☆"}
                    <span className="text-[#52525B] dark:text-[#A1A1AA] ml-1">
                      {row.rating}
                    </span>
                  </span>
                ) : (
                  <span className="text-[13px] text-[#A1A1AA]">-</span>
                )}
              </td>
              <td className="px-4 py-3 text-[13px] text-[#52525B] dark:text-[#A1A1AA] whitespace-nowrap">
                {row.tokenUsage ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
