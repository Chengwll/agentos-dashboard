import { Bot, ArrowLeft, Activity, Clock, PauseCircle } from "lucide-react";
import type { Agent } from "@/types/agent";
import { getAgentCategoryStyle } from "@/config/categoryMeta";
import { cn } from "@/lib/utils";

interface WelcomeViewProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
}

function StatCard({
  label,
  count,
  icon,
  colorClass,
}: {
  label: string;
  count: number;
  icon: React.ReactNode;
  colorClass: string;
}) {
  return (
    <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-[#F9F9FA] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] flex-1">
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colorClass)}>
        {icon}
      </div>
      <div>
        <div className="text-lg font-bold text-[#18181B] dark:text-[#FAFAFA] leading-tight">{count}</div>
        <div className="text-[11px] text-[#A1A1AA]">{label}</div>
      </div>
    </div>
  );
}

export function WelcomeView({ agents, onSelectAgent }: WelcomeViewProps) {
  const total = agents.length;
  const running = agents.filter((a) => a.status === "running").length;
  const pending = agents.filter((a) => a.status === "pending").length;
  const disabled = agents.filter((a) => a.status === "disabled").length;

  const recentAgents = [...agents]
    .sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime())
    .slice(0, 4);

  return (
    <div className="flex flex-col items-center py-10 px-8">
      {/* Hero */}
      <div className="w-12 h-12 rounded-xl bg-[#F4F4F5] dark:bg-[#27272A] flex items-center justify-center mb-4">
        <Bot className="w-6 h-6 text-[#A1A1AA]" />
      </div>
      <h2 className="text-base font-semibold text-[#18181B] dark:text-[#FAFAFA] mb-1">
        Agent 管理中心
      </h2>
      <p className="text-[13px] text-[#A1A1AA] mb-6">
        选择一个 Agent 即可查看和编辑配置详情
      </p>

      {/* Stats Row */}
      <div className="flex gap-2 w-full max-w-[480px] mb-6">
        <StatCard
          label="全部"
          count={total}
          icon={<Activity size={16} />}
          colorClass="bg-[#F4F4F5] dark:bg-[#27272A] text-[#52525B] dark:text-[#A1A1AA]"
        />
        <StatCard
          label="运行中"
          count={running}
          icon={<Activity size={16} />}
          colorClass="bg-[#ECFDF5] dark:bg-[#065F46]/20 text-[#059669]"
        />
        <StatCard
          label="待发布"
          count={pending}
          icon={<Clock size={16} />}
          colorClass="bg-[#FFFBEB] dark:bg-[#78350F]/20 text-[#D97706]"
        />
        <StatCard
          label="已停用"
          count={disabled}
          icon={<PauseCircle size={16} />}
          colorClass="bg-[#FEF2F2] dark:bg-[#7F1D1D]/20 text-[#EF4444]"
        />
      </div>

      {/* Recent Agents */}
      {recentAgents.length > 0 && (
        <div className="w-full max-w-[480px]">
          <div className="text-[11px] font-semibold text-[#A1A1AA] mb-2">
            最近编辑
          </div>
          <div className="space-y-1">
            {recentAgents.map((agent) => {
              const meta = getAgentCategoryStyle(agent.category);
              return (
                <button
                  key={agent.id}
                  onClick={() => onSelectAgent(agent)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors text-left group"
                >
                  <div className={cn("w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0", meta.bg, meta.color)}>
                    <meta.Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA] truncate group-hover:text-brand transition-colors">
                      {agent.name}
                    </div>
                    <div className="text-[11px] text-[#A1A1AA]">{agent.version} · {agent.deployGroup}</div>
                  </div>
                  <div className="text-[11px] text-[#A1A1AA] flex-shrink-0">
                    {formatRelativeDate(agent.lastEdited)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hint */}
      <div className="flex items-center gap-1.5 text-[12px] text-[#A1A1AA] mt-6">
        <ArrowLeft className="w-3 h-3" />
        从左侧 Agent 列表点选
      </div>
    </div>
  );
}

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "今天";
  if (diffDays === 1) return "昨天";
  if (diffDays < 7) return `${diffDays}天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
  return `${Math.floor(diffDays / 30)}月前`;
}
