import { cn } from "@/lib/utils";
import type { AgentStatus } from "@/types/agent";
import type { FileStatus } from "@/types/knowledge";

type StatusType = AgentStatus | FileStatus;

const statusConfig: Record<
  string,
  { bg: string; fg: string; dot: string; label: string }
> = {
  running: {
    bg: "bg-[#ECFDF5] dark:bg-[#064E3B]/30",
    fg: "text-[#059669] dark:text-[#34D399]",
    dot: "bg-[#10B981]",
    label: "运行中",
  },
  pending: {
    bg: "bg-[#FFFBEB] dark:bg-[#78350F]/30",
    fg: "text-[#D97706] dark:text-[#FBBF24]",
    dot: "bg-[#F59E0B]",
    label: "待发布",
  },
  disabled: {
    bg: "bg-[#F4F4F5] dark:bg-[#27272A]",
    fg: "text-[#52525B] dark:text-[#A1A1AA]",
    dot: "bg-[#A1A1AA]",
    label: "已停用",
  },
  vectorized: {
    bg: "bg-[#ECFDF5] dark:bg-[#064E3B]/30",
    fg: "text-[#059669] dark:text-[#34D399]",
    dot: "bg-[#10B981]",
    label: "已向量化",
  },
  failed: {
    bg: "bg-[#FEF2F2] dark:bg-[#7F1D1D]/30",
    fg: "text-[#DC2626] dark:text-[#F87171]",
    dot: "bg-[#EF4444]",
    label: "失败",
  },
};

interface StatusBadgeProps {
  status: StatusType;
  showDot?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  showDot = true,
  className,
}: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium",
        config.bg,
        config.fg,
        className
      )}
    >
      {showDot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      )}
      {config.label}
    </span>
  );
}
