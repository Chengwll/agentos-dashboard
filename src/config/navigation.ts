import {
  LayoutDashboard,
  Bot,
  Puzzle,
  Database,
  Store,
  Package,
  Users,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  view: string;
  badge?: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const navigationItems: NavSection[] = [
  {
    label: "工作区",
    items: [
      { label: "运营监测", icon: LayoutDashboard, view: "dashboard" },
      { label: "Agent 管理", icon: Bot, view: "agents", badge: "11" },
      { label: "Skill 管理", icon: Puzzle, view: "skills" },
      { label: "知识管理", icon: Database, view: "knowledge" },
    ],
  },
  {
    label: "共建",
    items: [
      { label: "Agent 市场", icon: Store, view: "market/agents" },
      { label: "Skill 市场", icon: Package, view: "market/skills" },
      { label: "协作空间", icon: Users, view: "collaboration" },
    ],
  },
  {
    label: "系统",
    items: [
      { label: "设置", icon: Settings, view: "settings" },
    ],
  },
];
