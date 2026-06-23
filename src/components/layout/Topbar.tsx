import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { Search, Bell, Plus, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const breadcrumbMap: Record<string, string[]> = {
  dashboard: ["AgentOS", "运营监测"],
  agents: ["AgentOS", "Agent 管理"],
  knowledge: ["AgentOS", "知识管理"],
  skills: ["AgentOS", "Skill 管理"],
  "market/agents": ["AgentOS", "Agent 市场"],
  "market/skills": ["AgentOS", "Skill 市场"],
  collaboration: ["AgentOS", "协作空间"],
  settings: ["AgentOS", "设置"],
};

export function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const currentPath = location.pathname.replace(/^\//, "") || "dashboard";
  const breadcrumb = breadcrumbMap[currentPath] || ["AgentOS", currentPath];

  const isDashboard = currentPath === "dashboard";
  const isAgents = currentPath === "agents";
  const isKnowledge = currentPath === "knowledge";

  return (
    <header className="h-[52px] bg-white dark:bg-[#18181B] border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center px-5 gap-3 flex-shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[13px]">
        <span className="text-[#A1A1AA]">{breadcrumb[0]}</span>
        <span className="text-[#D1D1D6]">/</span>
        <span className={cn("font-medium", "text-[#18181B] dark:text-[#FAFAFA]")}>
          {breadcrumb[1]}
        </span>
      </div>

      <div className="flex-1" />

      {/* Search */}
      <div className="flex items-center gap-1.5 bg-[#F4F4F5] dark:bg-[#27272A] border border-[#E4E4E7] dark:border-[#3F3F46] rounded-lg px-2.5 py-[5px] w-[220px] text-[#A1A1AA] text-[13px]">
        <Search className="w-[13px] h-[13px]" />
        <input
          placeholder="搜索 Agent、模板、文档…"
          className="border-none bg-transparent outline-none w-full text-[#52525B] dark:text-[#E4E4E7] text-[13px] placeholder:text-[#A1A1AA]"
        />
      </div>

      {/* Notifications */}
      <button
        title="通知"
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors relative"
      >
        <Bell className="w-4 h-4" />
        <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full absolute top-[5px] right-[5px] border-[1.5px] border-white dark:border-[#18181B]" />
      </button>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        title={theme === "dark" ? "切换到亮色模式" : "切换到暗色模式"}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors"
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </button>

      {/* Create Button */}
      {isDashboard && (
        <button
          onClick={() => navigate("/agents")}
          className="bg-brand text-white text-[13px] font-medium px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors hover:bg-brand-700"
        >
          <Plus className="w-[13px] h-[13px]" />
          新建 Agent
        </button>
      )}
      {isAgents && (
        <button className="bg-brand text-white text-[13px] font-medium px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors hover:bg-brand-700">
          <Plus className="w-[13px] h-[13px]" />
          新建 Agent
        </button>
      )}
      {isKnowledge && (
        <button className="bg-brand text-white text-[13px] font-medium px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors hover:bg-brand-700">
          <Plus className="w-[13px] h-[13px]" />
          上传文档
        </button>
      )}
    </header>
  );
}
