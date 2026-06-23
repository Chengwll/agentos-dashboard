import {
  Table2,
  Brain,
  FileText,
  Link2,
  SearchIcon,
  Send,
  TrendingUp,
  PenTool,
  Bell,
  BookOpen,
  BarChart3,
  Headphones,
  type LucideIcon,
} from "lucide-react";

export interface CategoryStyle {
  Icon: LucideIcon;
  bg: string;
  color: string;
  iconColor: string;
}

// Agent categories
export const agentCategoryMeta: Record<string, CategoryStyle> = {
  "销售辅助": { Icon: TrendingUp, bg: "bg-[#EEF2FF] dark:bg-[#3730A3]/20", color: "text-[#4F46E5]", iconColor: "#4F46E5" },
  "内容创作": { Icon: PenTool, bg: "bg-[#FEF3C7] dark:bg-[#78350F]/20", color: "text-[#B45309]", iconColor: "#B45309" },
  "监控预警": { Icon: Bell, bg: "bg-[#ECFDF5] dark:bg-[#064E3B]/20", color: "text-[#059669]", iconColor: "#059669" },
  "知识管理": { Icon: BookOpen, bg: "bg-[#FDF2F8] dark:bg-[#831843]/20", color: "text-[#BE185D]", iconColor: "#BE185D" },
  "数据分析": { Icon: BarChart3, bg: "bg-[#E0E7FF] dark:bg-[#312E81]/20", color: "text-[#4338CA]", iconColor: "#4338CA" },
  "客户服务": { Icon: Headphones, bg: "bg-[#F0FDF4] dark:bg-[#14532D]/20", color: "text-[#15803D]", iconColor: "#15803D" },
};

// Skill categories
export const skillCategoryMeta: Record<string, CategoryStyle> = {
  "数据处理": { Icon: Table2, bg: "bg-[#EEF2FF] dark:bg-[#3730A3]/20", color: "text-[#4F46E5]", iconColor: "#4F46E5" },
  "通知推送": { Icon: Send, bg: "bg-[#ECFDF5] dark:bg-[#064E3B]/20", color: "text-[#059669]", iconColor: "#059669" },
  "文件处理": { Icon: FileText, bg: "bg-[#FEF3C7] dark:bg-[#78350F]/20", color: "text-[#B45309]", iconColor: "#B45309" },
  "系统集成": { Icon: Link2, bg: "bg-[#E0E7FF] dark:bg-[#312E81]/20", color: "text-[#4338CA]", iconColor: "#4338CA" },
  "AI 能力": { Icon: Brain, bg: "bg-[#FDF2F8] dark:bg-[#831843]/20", color: "text-[#BE185D]", iconColor: "#BE185D" },
  "搜索查询": { Icon: SearchIcon, bg: "bg-[#F0FDF4] dark:bg-[#14532D]/20", color: "text-[#15803D]", iconColor: "#15803D" },
};

export function getAgentCategoryStyle(category: string): CategoryStyle {
  return agentCategoryMeta[category] || agentCategoryMeta["销售辅助"];
}

export function getSkillCategoryStyle(category: string): CategoryStyle {
  return skillCategoryMeta[category] || skillCategoryMeta["数据处理"];
}
