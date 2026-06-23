import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export function ChartCard({
  title,
  subtitle,
  children,
  className,
  isLoading,
}: ChartCardProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl animate-pulse",
          className
        )}
      >
        <div className="px-[22px] py-[18px] border-b border-[#E4E4E7] dark:border-[#27272A]">
          <div className="h-4 bg-[#F4F4F5] dark:bg-[#27272A] rounded w-24" />
        </div>
        <div className="p-[22px]">
          <div className="h-[200px] bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl",
        className
      )}
    >
      <div className="px-[22px] py-[18px] border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center gap-2.5">
        <div>
          <div className="text-[15px] font-bold text-[#18181B] dark:text-[#FAFAFA]">
            {title}
          </div>
          {subtitle && (
            <div className="text-xs text-[#A1A1AA] mt-0.5">{subtitle}</div>
          )}
        </div>
      </div>
      <div className="p-[22px]">{children}</div>
    </div>
  );
}
