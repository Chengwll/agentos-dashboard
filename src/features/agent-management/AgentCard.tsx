import { Star, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Agent } from "@/types/agent";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { getAgentCategoryStyle } from "@/config/categoryMeta";

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onSelect: (agent: Agent) => void;
  isSelectionMode?: boolean;
  isChecked?: boolean;
  onToggleCheck?: (agentId: string) => void;
}

export function AgentCard({
  agent,
  isSelected,
  onSelect,
  isSelectionMode,
  isChecked,
  onToggleCheck,
}: AgentCardProps) {
  const meta = getAgentCategoryStyle(agent.category);

  return (
    <div
      onClick={() => {
        if (isSelectionMode && onToggleCheck) {
          onToggleCheck(agent.id);
        } else {
          onSelect(agent);
        }
      }}
      className={cn(
        "bg-white dark:bg-[#18181B] border rounded-xl p-3.5 cursor-pointer transition-all duration-150 group",
        isSelected
          ? "border-brand shadow-sm"
          : "border-[#E4E4E7] dark:border-[#27272A] hover:border-brand/50 hover:shadow-sm"
      )}
    >
      <div className="flex items-center gap-3 mb-2.5">
        {/* Checkbox or Icon */}
        {(isSelectionMode || isChecked) ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onToggleCheck?.(agent.id);
            }}
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border-2 transition-colors cursor-pointer",
              isChecked
                ? "bg-brand border-brand text-white"
                : "border-[#D1D1D6] dark:border-[#3F3F46] hover:border-brand"
            )}
          >
            {isChecked && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        ) : (
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", meta.bg, meta.color)}>
            <meta.Icon size={18} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-medium text-[#18181B] dark:text-[#FAFAFA] truncate">
            {agent.name}
          </div>
          <div className="text-[11px] text-[#A1A1AA]">{agent.type}</div>
        </div>
        <StatusBadge status={agent.status} />
      </div>
      <div className="text-[12px] text-[#A1A1AA] leading-relaxed line-clamp-2 mb-2.5">
        {agent.description}
      </div>
      <div className="flex items-center gap-3 text-[11px] text-[#A1A1AA]">
        <span className="flex items-center gap-1">
          <Activity size={11} />
          {agent.runs > 0 ? `已运行 ${agent.runs} 次` : "未运行"}
        </span>
        {agent.rating > 0 && (
          <span className="flex items-center gap-0.5">
            <Star size={11} className="fill-[#F59E0B] text-[#F59E0B]" />
            {agent.rating}
          </span>
        )}
        <span className="ml-auto">{agent.version}</span>
      </div>
    </div>
  );
}
