import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  hint?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  hint,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-5 text-center",
        className
      )}
    >
      {icon && <div className="text-5xl mb-4 opacity-80">{icon}</div>}
      <div className="text-base font-semibold text-[#18181B] dark:text-[#FAFAFA] mb-2">
        {title}
      </div>
      {description && (
        <div className="text-[13px] text-[#A1A1AA] mb-5 max-w-[320px] leading-relaxed">
          {description}
        </div>
      )}
      {hint && (
        <div className="flex items-center gap-1.5 text-[12px] text-[#A1A1AA] mb-4 -mt-3">
          <ArrowLeft className="w-3 h-3" />
          {hint}
        </div>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="bg-white dark:bg-[#27272A] text-[#52525B] dark:text-[#A1A1AA] text-[13px] font-medium px-5 py-2 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] hover:bg-[#F4F4F5] dark:hover:bg-[#3F3F46] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
