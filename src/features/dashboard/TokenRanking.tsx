import { motion } from "framer-motion";
import { useTokenRanking, type RankingFilter } from "@/hooks/useDashboardData";
import { ChartCard } from "@/components/shared/ChartCard";
import type { RankingItem } from "@/types/dashboard";

interface TokenRankingProps {
  filter?: RankingFilter;
}

export function TokenRanking({ filter }: TokenRankingProps) {
  const { data, isLoading } = useTokenRanking("org", filter);

  return (
    <ChartCard
      title="Token 消耗排名"
      subtitle={<span className="text-[11px] text-[#A1A1AA]">按项目统计</span>}
      isLoading={isLoading}
    >
      {data && data.length > 0 ? (
        <div className="space-y-3">
          {data.slice(0, 5).map((item: RankingItem, index: number) => {
            const maxValue = data[0]?.value || 1;
            const barWidth = (item.value / maxValue) * 100;
            return (
              <div key={item.name} className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-[#A1A1AA] w-4 text-right flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA] truncate">
                        {item.name}
                      </span>
                      <span className="text-[13px] font-semibold text-[#18181B] dark:text-[#FAFAFA] ml-2 flex-shrink-0">
                        {item.subValue ?? item.value}
                      </span>
                    </div>
                    {item.subtitle && (
                      <div className="text-[11px] text-[#A1A1AA]">{item.subtitle}</div>
                    )}
                    <div className="h-[5px] bg-[#F4F4F5] dark:bg-[#27272A] rounded-[3px] mt-1.5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-[3px] bg-gradient-to-r from-brand to-brand-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-[13px] text-[#A1A1AA]">
          {data && data.length === 0 ? "暂无匹配数据" : "暂无数据"}
        </div>
      )}
    </ChartCard>
  );
}
