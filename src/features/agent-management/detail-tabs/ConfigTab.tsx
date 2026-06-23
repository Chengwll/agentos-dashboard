import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Agent } from "@/types/agent";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface ConfigTabProps {
  agent: Agent;
  isEditMode: boolean;
}

function SectionLabel({ children, isEditMode }: { children: string; isEditMode: boolean }) {
  return (
    <h3
      className={cn(
        "text-[13px] font-semibold text-[#18181B] dark:text-[#FAFAFA] mb-3 border-l-[3px] pl-2.5",
        isEditMode ? "border-l-amber-400" : "border-l-brand"
      )}
    >
      {children}
    </h3>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3">
      <div className="text-[11px] font-semibold text-[#A1A1AA] mb-1">{label}</div>
      <div className="text-[13px] text-[#52525B] dark:text-[#A1A1AA] leading-relaxed bg-[#F9F9FA] dark:bg-[#18181B] rounded-lg p-3">{value}</div>
    </div>
  );
}

function ChipList({ items, label }: { items: string[]; label: string }) {
  if (items.length === 0) {
    return (
      <div className="mb-3">
        <div className="text-[11px] font-semibold text-[#A1A1AA] mb-2">{label}</div>
        <div className="text-[13px] text-[#A1A1AA]">暂无</div>
      </div>
    );
  }
  return (
    <div className="mb-3">
      <div className="text-[11px] font-semibold text-[#A1A1AA] mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="text-[12px] px-2.5 py-1 rounded-lg bg-[#F4F4F5] dark:bg-[#27272A] text-[#52525B] dark:text-[#A1A1AA] font-medium"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ConfigTab({ agent, isEditMode }: ConfigTabProps) {
  return (
    <div className="p-5">
      {/* Edit Mode Banner */}
      {isEditMode && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2.5 bg-[#FFFBEB] dark:bg-[#78350F]/20 border border-amber-200 dark:border-amber-800/30 rounded-lg text-[12.5px] text-[#92400E] dark:text-[#FBBF24]">
          <AlertTriangle size={14} className="flex-shrink-0" />
          正在编辑配置 — 修改后请点击底部"保存"按钮
        </div>
      )}

      {/* 基础信息 */}
      <SectionLabel isEditMode={isEditMode}>基础信息</SectionLabel>
      {isEditMode ? (
        <>
          <div className="mb-3">
            <div className="text-[11px] font-semibold text-[#A1A1AA] mb-1">Agent 名称</div>
            <input
              defaultValue={agent.name}
              className="w-full text-[13px] px-3 py-1.5 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand"
            />
          </div>
          <div className="mb-3">
            <div className="text-[11px] font-semibold text-[#A1A1AA] mb-1">用途说明</div>
            <input
              defaultValue={agent.description}
              className="w-full text-[13px] px-3 py-1.5 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand"
            />
          </div>
          <div className="mb-3">
            <div className="text-[11px] font-semibold text-[#A1A1AA] mb-1">部署群组</div>
            <input
              defaultValue={agent.deployGroup}
              className="w-full text-[13px] px-3 py-1.5 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand"
            />
          </div>
        </>
      ) : (
        <>
          <Field label="Agent 名称" value={agent.name} />
          <Field label="用途说明" value={agent.description} />
          <Field label="部署群组" value={agent.deployGroup} />
        </>
      )}

      {/* 模型与提示词 */}
      <SectionLabel isEditMode={isEditMode}>模型与提示词</SectionLabel>
      {isEditMode ? (
        <>
          <div className="mb-3">
            <div className="text-[11px] font-semibold text-[#A1A1AA] mb-1">选择模型</div>
            <input
              defaultValue={agent.model}
              className="w-full text-[13px] px-3 py-1.5 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand"
            />
          </div>
          <div className="mb-3">
            <div className="text-[11px] font-semibold text-[#A1A1AA] mb-1">系统提示词</div>
            <textarea
              defaultValue={agent.systemPrompt}
              rows={4}
              className="w-full text-[13px] px-3 py-1.5 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand resize-none"
            />
          </div>
        </>
      ) : (
        <>
          <Field label="选择模型" value={agent.model} />
          <div className="mb-3">
            <div className="text-[11px] font-semibold text-[#A1A1AA] mb-1">系统提示词</div>
            <div className="text-[13px] text-[#52525B] dark:text-[#A1A1AA] leading-relaxed bg-[#F9F9FA] dark:bg-[#18181B] rounded-lg p-3">
              {agent.systemPrompt}
            </div>
          </div>
        </>
      )}

      {/* 能力扩展 */}
      <SectionLabel isEditMode={isEditMode}>能力扩展</SectionLabel>
      <ChipList items={agent.tools} label="工具" />
      <ChipList items={agent.skills} label="技能 (Skills)" />
      <ChipList items={agent.mcp} label="MCP 连接" />

      {/* 知识管理 */}
      <SectionLabel isEditMode={isEditMode}>知识管理</SectionLabel>
      <div className="mb-3">
        <div className="text-[11px] font-semibold text-[#A1A1AA] mb-2">知识库</div>
        {agent.knowledgeBases.length > 0 ? (
          <div className="space-y-1.5">
            {agent.knowledgeBases.map((kb) => (
              <div
                key={kb.name}
                className="flex items-center justify-between text-[13px] py-1.5 px-3 bg-[#F9F9FA] dark:bg-[#18181B] rounded-lg"
              >
                <span className="text-[#52525B] dark:text-[#A1A1AA]">{kb.name}</span>
                <StatusBadge status={kb.status === "已连接" ? "running" : "pending"} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[13px] text-[#A1A1AA]">未挂载知识库</div>
        )}
      </div>

    </div>
  );
}
