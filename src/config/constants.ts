import type { AgentStatus } from "@/types/agent";
import type { FileStatus } from "@/types/knowledge";

export const statusText: Record<string, string> = {
  running: "运行中",
  pending: "待发布",
  disabled: "已停用",
  vectorized: "已向量化",
  failed: "失败",
};

export const statusClass: Record<string, string> = {
  running: "green",
  pending: "amber",
  disabled: "gray",
  vectorized: "green",
  failed: "red",
};

export const statusDotClass: Record<string, string> = {
  running: "bg-[#10B981]",
  pending: "bg-[#F59E0B]",
  disabled: "bg-[#A1A1AA]",
  vectorized: "bg-[#10B981]",
  failed: "bg-[#EF4444]",
};

export const agentTools: string[] = [
  "网页搜索",
  "文档读取",
  "代码执行",
  "图表生成",
];

export const agentModels: string[] = [
  "Claude 3 Haiku",
  "Claude 3 Sonnet",
  "Claude 3 Opus",
  "GPT-4o",
];

export const timeRanges = [
  { value: "7d", label: "近 7 天" },
  { value: "30d", label: "近 30 天" },
  { value: "90d", label: "近 90 天" },
];

export const regionLabels: Record<string, string> = {
  south: "华南区域",
  east: "华东区域",
  north: "华北区域",
};

export const fileIcons: Record<string, string> = {
  pdf: "📄",
  word: "📝",
  excel: "📊",
  ppt: "📽️",
  txt: "📃",
  md: "📋",
};
