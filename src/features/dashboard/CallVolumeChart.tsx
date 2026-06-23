import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { ChartDataPoint } from "@/types/dashboard";

interface CallVolumeChartProps {
  data: ChartDataPoint[] | undefined;
  isLoading: boolean;
}

export function CallVolumeChart({ data, isLoading }: CallVolumeChartProps) {
  if (isLoading || !data) {
    return (
      <div className="h-[220px] bg-gradient-to-b from-brand-50/30 to-transparent dark:from-brand-50/5 rounded-lg animate-pulse" />
    );
  }

  return (
    <div className="h-[220px] -ml-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 24, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#A1A1AA" }}
            interval="preserveStartEnd"
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #E4E4E7",
              boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
              fontSize: "12px",
              backgroundColor: "#fff",
            }}
            cursor={{ fill: "rgba(79,70,229,0.04)" }}
            formatter={(value: unknown) => [String(value), "调用量"]}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={24}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.isHighlight ? "#3730A3" : "#818CF8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
