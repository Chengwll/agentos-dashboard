import { useState, useMemo } from "react";
import { Search, X, Bot } from "lucide-react";
import type { Agent } from "@/types/agent";
import { FilterBar } from "@/components/shared/FilterBar";
import { EmptyState } from "@/components/shared/EmptyState";
import { AgentCard } from "../AgentCard";
import { useAgentStore } from "@/stores/useAgentStore";

interface AgentListPanelProps {
  agents: Agent[];
  selectedAgentId: string | null;
  filter: string;
  onFilterChange: (filter: "all" | "running" | "pending" | "disabled") => void;
  onSelectAgent: (agent: Agent) => void;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export function AgentListPanel({
  agents,
  selectedAgentId,
  filter,
  onFilterChange,
  onSelectAgent,
  isLoading,
  isError,
  onRetry,
}: AgentListPanelProps) {
  const [search, setSearch] = useState("");
  const { selectedAgentIds, toggleAgentSelection, clearSelection } = useAgentStore();

  const isSelectionMode = selectedAgentIds.size > 0;

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: agents.length };
    ["running", "pending", "disabled"].forEach((s) => {
      counts[s] = agents.filter((a) => a.status === s).length;
    });
    return counts;
  }, [agents]);

  const filtered = useMemo(() => {
    let result = [...agents];
    if (filter !== "all") {
      result = result.filter((a) => a.status === filter);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [agents, filter, search]);

  const filterOptions = [
    { key: "all", label: "全部", count: statusCounts.all },
    { key: "running", label: "运行中", count: statusCounts.running },
    { key: "pending", label: "待发布", count: statusCounts.pending },
    { key: "disabled", label: "已停用", count: statusCounts.disabled },
  ];

  const publishedCount = agents.filter(
    (a) => a.status === "running" || a.status === "pending"
  ).length;

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-4 py-3.5 border-b border-[#E4E4E7] dark:border-[#27272A]">
          <div className="h-4 w-20 bg-[#E4E4E7] dark:bg-[#27272A] rounded animate-pulse mb-1" />
          <div className="h-3 w-32 bg-[#F4F4F5] dark:bg-[#27272A] rounded animate-pulse" />
        </div>
        <div className="p-3 space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl p-3.5 animate-pulse">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#E4E4E7] dark:bg-[#27272A]" />
                <div className="flex-1">
                  <div className="h-3.5 w-24 bg-[#E4E4E7] dark:bg-[#27272A] rounded mb-1" />
                  <div className="h-2.5 w-16 bg-[#F4F4F5] dark:bg-[#3F3F46] rounded" />
                </div>
              </div>
              <div className="h-2.5 w-full bg-[#F4F4F5] dark:bg-[#27272A] rounded mb-1" />
              <div className="h-2.5 w-2/3 bg-[#F4F4F5] dark:bg-[#27272A] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center">
          <EmptyState
            icon={<Bot className="w-10 h-10 text-[#EF4444]" />}
            title="加载失败"
            description="无法获取 Agent 列表，请检查网络后重试"
            action={
              onRetry
                ? { label: "重新加载", onClick: onRetry }
                : undefined
            }
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Batch Bar */}
      {isSelectionMode && (
        <div className="px-4 py-2.5 bg-brand-50 dark:bg-brand-50/10 border-b border-brand/20 flex items-center gap-2">
          <span className="text-[12px] font-medium text-brand">
            已选 {selectedAgentIds.size} 个 Agent
          </span>
          <div className="flex-1" />
          <button
            onClick={clearSelection}
            className="text-[11px] px-2 py-1 rounded text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7] transition-colors"
          >
            取消
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex-shrink-0 bg-[#F9F9FA] dark:bg-[#18181B]">
        <div className="px-4 py-4 border-b border-[#E4E4E7] dark:border-[#27272A]">
          <div className="mb-4">
            <div className="text-sm font-semibold text-[#18181B] dark:text-[#FAFAFA] mb-0.5">
              Agent 列表
            </div>
            <div className="text-[11px] text-[#A1A1AA]">
              共 {agents.length} 个 Agent · 已发布 {publishedCount} 个
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-[#F4F4F5] dark:bg-[#27272A] rounded-md px-2 py-1.5">
            <Search size={13} className="text-[#A1A1AA] flex-shrink-0" />
            <input
              placeholder="搜索 Agent 名称、描述…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-[#18181B] dark:text-[#FAFAFA] placeholder:text-[#A1A1AA]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-[#A1A1AA] hover:text-[#52525B] flex-shrink-0"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Filter */}
        <div className="px-4 py-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
          <FilterBar
            options={filterOptions}
            activeKey={filter}
            className="grid grid-cols-4"
            onChange={(key) => onFilterChange(key as "all" | "running" | "pending" | "disabled")}
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
        {filtered.length === 0 ? (
          <EmptyState
            title="暂无 Agent"
            description="当前筛选条件下没有匹配的 Agent"
          />
        ) : (
          filtered.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              isSelected={selectedAgentId === agent.id}
              onSelect={onSelectAgent}
              isSelectionMode={isSelectionMode}
              isChecked={selectedAgentIds.has(agent.id)}
              onToggleCheck={toggleAgentSelection}
            />
          ))
        )}
      </div>
    </>
  );
}
