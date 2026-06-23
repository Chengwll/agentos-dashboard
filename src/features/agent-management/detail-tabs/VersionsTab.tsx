import { useState } from "react";
import { RotateCcw, Eye } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

interface VersionEntry {
  version: string;
  date: string;
  isCurrent: boolean;
  changelog: string;
  configSnapshot?: Record<string, string>;
}

const mockVersions: Record<string, VersionEntry[]> = {
  "init-agent": [
    { version: "v1.2", date: "2026-05-15", isCurrent: true, changelog: "新增多文档并行解析支持，优化知识条目分类算法" },
    { version: "v1.1", date: "2026-04-20", isCurrent: false, changelog: "修复项目模板导入时的路径错误；增加 PDF 文件 OCR 识别" },
    { version: "v1.0", date: "2026-03-10", isCurrent: false, changelog: "初始版本，支持基础文档解析和知识目录创建" },
  ],
  "sales-agent": [
    { version: "v2.1", date: "2026-05-12", isCurrent: true, changelog: "优化意向等级评估模型，支持多轮对话上下文理解" },
    { version: "v2.0", date: "2026-04-05", isCurrent: false, changelog: "重构话术生成引擎，新增 A/B 测试框架" },
    { version: "v1.0", date: "2026-02-15", isCurrent: false, changelog: "初始版本" },
  ],
};

interface VersionsTabProps {
  agentId: string;
}

export function VersionsTab({ agentId }: VersionsTabProps) {
  const [versions, setVersions] = useState(mockVersions[agentId] || []);
  const [rollbackTarget, setRollbackTarget] = useState<VersionEntry | null>(null);

  const handleRollback = (version: VersionEntry) => {
    setVersions((prev) =>
      prev.map((v) => ({
        ...v,
        isCurrent: v.version === version.version,
      }))
    );
    setRollbackTarget(null);
  };

  return (
    <div className="p-5">
      <div className="relative">
        {versions.map((v, i) => (
          <div key={v.version} className="flex gap-4 pb-6 last:pb-0 group">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 ${
                  v.isCurrent
                    ? "bg-brand border-brand"
                    : "bg-white dark:bg-[#18181B] border-[#D1D1D6] dark:border-[#3F3F46]"
                }`}
              />
              {i < versions.length - 1 && (
                <div className="w-px flex-1 bg-[#E4E4E7] dark:bg-[#27272A] mt-1" />
              )}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0 pb-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[13px] font-semibold text-[#18181B] dark:text-[#FAFAFA]">
                  {v.version}
                </span>
                {v.isCurrent && (
                  <span className="text-[10px] px-1.5 py-px bg-brand-50 dark:bg-brand-50/10 text-brand rounded-full font-medium">
                    当前
                  </span>
                )}
                <span className="text-[11px] text-[#A1A1AA] ml-auto">{v.date}</span>
              </div>
              <div className="text-[12.5px] text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                {v.changelog}
              </div>

              {/* Actions for non-current versions */}
              {!v.isCurrent && (
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors">
                    <Eye size={11} />
                    查看配置
                  </button>
                  <button
                    onClick={() => setRollbackTarget(v)}
                    className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800/30 text-[#B45309] dark:text-[#FBBF24] hover:bg-[#FFFBEB] dark:hover:bg-[#78350F]/20 transition-colors"
                  >
                    <RotateCcw size={11} />
                    回滚到此版本
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {versions.length === 0 && (
        <div className="text-center py-8 text-[13px] text-[#A1A1AA]">暂无版本记录</div>
      )}

      <ConfirmDialog
        open={!!rollbackTarget}
        onOpenChange={(open) => { if (!open) setRollbackTarget(null); }}
        title="回滚版本"
        description={`确定要回滚到 ${rollbackTarget?.version} 吗？当前版本的配置将被替换为该版本的配置快照。`}
        confirmLabel="确认回滚"
        confirmVariant="destructive"
        onConfirm={() => {
          if (rollbackTarget) handleRollback(rollbackTarget);
        }}
      />
    </div>
  );
}
