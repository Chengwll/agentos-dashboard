import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { DistributionItem } from "@/types/dashboard";

interface AgentDistributionChartProps {
  data: DistributionItem[] | undefined;
  totalLabel: string;
  isLoading: boolean;
}

export function AgentDistributionChart({
  data,
  totalLabel,
  isLoading,
}: AgentDistributionChartProps) {
  if (isLoading || !data) {
    return (
      <div className="flex items-center gap-6 animate-pulse">
        <div className="w-[100px] h-[100px] rounded-full bg-[#F4F4F5] dark:bg-[#27272A]" />
        <div className="flex-1 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 bg-[#F4F4F5] dark:bg-[#27272A] rounded w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-[100px] h-[100px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={36}
              outerRadius={48}
              paddingAngle={2}
              dataKey="percentage"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-sm font-semibold text-[#18181B] dark:text-[#FAFAFA]">
            {totalLabel}
          </span>
          <span className="text-[10px] text-[#A1A1AA]">总计</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-xs font-medium text-[#52525B] dark:text-[#A1A1AA]"
          >
            <span
              className="w-2.5 h-2.5 rounded-[3px] flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="truncate">{item.name}</span>
            <span className="ml-auto font-semibold text-[#18181B] dark:text-[#FAFAFA]">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
