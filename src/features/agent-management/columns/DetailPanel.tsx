import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useAgentStore } from "@/stores/useAgentStore";
import type { Agent } from "@/types/agent";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { getAgentCategoryStyle } from "@/config/categoryMeta";
import { ConfigTab } from "../detail-tabs/ConfigTab";
import { LogsTab } from "../detail-tabs/LogsTab";
import { VersionsTab } from "../detail-tabs/VersionsTab";
import { WelcomeView } from "./WelcomeView";
import { cn } from "@/lib/utils";

interface DetailPanelProps {
  agent: Agent | undefined;
  isLoading?: boolean;
  allAgents?: Agent[];
}

const tabs = [
  { key: "config" as const, label: "配置" },
  { key: "logs" as const, label: "运行日志" },
  { key: "versions" as const, label: "版本历史" },
];

export function DetailPanel({ agent, isLoading, allAgents }: DetailPanelProps) {
  const {
    activeDetailTab,
    setActiveDetailTab,
    isEditMode,
    toggleEditMode,
    exitEditMode,
    isTestPanelOpen,
    toggleTestPanel,
  } = useAgentStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedBanner, setShowSavedBanner] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate async save — replace with actual mutation
    setTimeout(() => {
      setIsSaving(false);
      exitEditMode();
      setShowSavedBanner(true);
      setTimeout(() => setShowSavedBanner(false), 2500);
    }, 600);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="flex flex-col h-full animate-pulse">
        <div className="px-5 py-4 border-b border-[#E4E4E7] dark:border-[#27272A]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#E4E4E7] dark:bg-[#27272A]" />
            <div className="flex-1">
              <div className="h-4 w-32 bg-[#E4E4E7] dark:bg-[#27272A] rounded mb-1" />
              <div className="h-3 w-20 bg-[#F4F4F5] dark:bg-[#3F3F46] rounded" />
            </div>
          </div>
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-3 w-12 bg-[#F4F4F5] dark:bg-[#27272A] rounded" />
            ))}
          </div>
        </div>
        <div className="flex-1 p-5 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-3 w-16 bg-[#E4E4E7] dark:bg-[#27272A] rounded mb-2" />
              <div className="h-8 w-full bg-[#F4F4F5] dark:bg-[#27272A] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="flex-1 overflow-y-auto">
        <WelcomeView
          agents={allAgents || []}
          onSelectAgent={(a) => useAgentStore.getState().selectAgent(a.id)}
        />
      </div>
    );
  }

  const meta = getAgentCategoryStyle(agent.category);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-5 py-4 border-b border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B]">
        <div className="flex items-center gap-3 mb-[9.5px]">
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", meta.bg, meta.color)}>
            <meta.Icon size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-semibold text-[#18181B] dark:text-[#FAFAFA] truncate">
              {agent.name}
            </div>
            <div className="text-[11px] text-[#A1A1AA]">{agent.type} · 手动创建</div>
          </div>
          <StatusBadge status={agent.status} />
          <span className="text-[11px] text-[#A1A1AA]">{agent.version}</span>

          {/* Test Panel Toggle */}
          <button
            onClick={toggleTestPanel}
            title={isTestPanelOpen ? "收起对话测试" : "展开对话测试"}
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
              isTestPanelOpen
                ? "bg-brand-50 dark:bg-brand-50/10 text-brand"
                : "text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] hover:text-[#52525B]"
            )}
          >
            <MessageSquare size={15} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveDetailTab(tab.key)}
              className={cn(
                "text-[13px] font-medium px-3 py-1.5 border-b-2 transition-colors",
                activeDetailTab === tab.key
                  ? "border-brand text-brand"
                  : "border-transparent text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Saved Banner */}
      <AnimatePresence>
        {showSavedBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-2.5 bg-[#ECFDF5] dark:bg-[#065F46]/20 border-b border-[#A7F3D0] dark:border-[#059669]/30 text-[13px] text-[#059669] dark:text-[#34D399] flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              配置已保存
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDetailTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {activeDetailTab === "config" && <ConfigTab agent={agent} isEditMode={isEditMode} />}
            {activeDetailTab === "logs" && <LogsTab agentId={agent.id} />}
            {activeDetailTab === "versions" && <VersionsTab agentId={agent.id} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="flex-shrink-0 px-5 py-3 border-t border-[#E4E4E7] dark:border-[#27272A] flex items-center gap-2 bg-white dark:bg-[#18181B] shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
        {activeDetailTab === "config" ? (
          !isEditMode ? (
            <>
              <button
                onClick={toggleEditMode}
                className="bg-brand text-white text-[13px] font-medium px-4 py-1.5 rounded-lg hover:bg-brand-700 transition-colors"
              >
                编辑配置
              </button>
              <button
                disabled
                title="即将上线"
                className="text-[13px] px-4 py-1.5 rounded-lg border border-dashed border-[#D1D1D6] dark:border-[#3F3F46] text-[#A1A1AA] cursor-not-allowed opacity-60 transition-colors"
              >
                另存为模板
              </button>
              <div className="flex-1" />
              <div className="border-l border-[#E4E4E7] dark:border-[#27272A] pl-2">
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-[13px] font-medium px-4 py-1.5 rounded-lg text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[#7F1D1D]/20 transition-colors"
                >
                  删除 Agent
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={exitEditMode}
                className="text-[13px] px-4 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-brand text-white text-[13px] font-medium px-4 py-1.5 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
              >
                {isSaving && (
                  <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                  </svg>
                )}
                {isSaving ? "保存中…" : "保存"}
              </button>
            </>
          )
        ) : (
          <>
            <div className="flex-1" />
            <button
              onClick={() => setActiveDetailTab("config")}
              className="text-[12px] px-3 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors"
            >
              返回配置
            </button>
          </>
        )}
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="删除 Agent"
        description={`确定要删除 "${agent.name}" 吗？此操作不可撤销，所有关联配置和数据将被永久删除。`}
        confirmLabel="删除"
        confirmVariant="destructive"
        onConfirm={() => {
          // TODO: integrate with real delete API
        }}
      />
    </div>
  );
}
