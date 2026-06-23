import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  trend?: {
    direction: "up" | "down";
    value: string;
    label?: string;
  };
  variant: "brand" | "green" | "amber" | "red";
  /** When true, "down" is positive (e.g. error rate) */
  reverseTrend?: boolean;
  isLoading?: boolean;
}

const gradientMap = {
  brand: "bg-gradient-to-r from-[#4F46E5] to-[#818CF8]",
  green: "bg-gradient-to-r from-[#10B981] to-[#34D399]",
  amber: "bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]",
  red: "bg-gradient-to-r from-[#EF4444] to-[#F87171]",
};

const iconBgMap = {
  brand: "bg-brand-50 dark:bg-brand-50/10",
  green: "bg-[#ECFDF5] dark:bg-[#064E3B]/30",
  amber: "bg-[#FFFBEB] dark:bg-[#78350F]/30",
  red: "bg-[#FEF2F2] dark:bg-[#7F1D1D]/30",
};

export function KpiCard({
  title,
  value,
  unit,
  icon,
  trend,
  variant,
  reverseTrend,
  isLoading,
}: KpiCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl p-4 animate-pulse">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-[10px] bg-[#F4F4F5] dark:bg-[#27272A]" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-[#F4F4F5] dark:bg-[#27272A] rounded w-20" />
            <div className="h-6 bg-[#F4F4F5] dark:bg-[#27272A] rounded w-16" />
            <div className="h-3 bg-[#F4F4F5] dark:bg-[#27272A] rounded w-24" />
          </div>
        </div>
      </div>
    );
  }

  const isPositive = reverseTrend
    ? trend?.direction === "down"
    : trend?.direction === "up";

  return (
    <div
      className={cn(
        "bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl p-4 relative overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      <div className={cn("absolute top-0 left-0 right-0 h-[3px] rounded-t-xl", gradientMap[variant])} />
      <div className="flex items-start gap-3.5 mt-px">
        <div className={cn("w-10 h-10 rounded-[10px] flex items-center justify-center text-lg flex-shrink-0", iconBgMap[variant])}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-[#A1A1AA] mb-1.5 flex items-center gap-1.5">
            {title}
          </div>
          <div className="text-2xl font-semibold text-[#18181B] dark:text-[#FAFAFA] leading-none mb-1">
            {value}
            {unit && (
              <span className="text-base font-normal text-[#A1A1AA]">{unit}</span>
            )}
          </div>
          {trend && (
            <div
              className={cn(
                "text-xs font-medium flex items-center gap-0.5",
                isPositive ? "text-[#10B981]" : "text-[#EF4444]"
              )}
            >
              {trend.direction === "up" ? "↑" : "↓"} {trend.value}
              {trend.label && (
                <span className="text-[#A1A1AA] font-normal ml-1">
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
