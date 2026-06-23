import { cn } from "@/lib/utils";

interface FilterOption {
  key: string;
  label: string;
  count?: number;
}

interface FilterBarProps {
  options: FilterOption[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

export function FilterBar({
  options,
  activeKey,
  onChange,
  className,
}: FilterBarProps) {
  return (
    <div className={cn("flex items-center gap-1 bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg p-0.5", className)}>
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={cn(
            "text-[12px] font-medium px-3 py-1.5 rounded-[7px] transition-colors whitespace-nowrap text-center",
            activeKey === opt.key
              ? "bg-white dark:bg-[#3F3F46] text-[#18181B] dark:text-[#FAFAFA] shadow-sm"
              : "text-[#71717A] hover:text-[#52525B] dark:hover:text-[#A1A1AA]"
          )}
        >
          {opt.label}
          {opt.count !== undefined && (
            <span className="ml-1 opacity-60">{opt.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
