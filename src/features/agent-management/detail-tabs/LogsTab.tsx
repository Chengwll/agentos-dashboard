import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FilterBar } from "@/components/shared/FilterBar";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
  details?: string;
  requestId?: string;
}

const levelStyles = {
  info: "bg-[#EFF6FF] dark:bg-[#1E3A5F]/30 text-[#2563EB] dark:text-[#60A5FA]",
  warn: "bg-[#FFFBEB] dark:bg-[#78350F]/30 text-[#D97706] dark:text-[#FBBF24]",
  error: "bg-[#FEF2F2] dark:bg-[#7F1D1D]/30 text-[#DC2626] dark:text-[#F87171]",
};

const mockLogs: Record<string, LogEntry[]> = {
  "init-agent": [
    { id: "1", timestamp: "2026-05-24 14:32:01", level: "info", message: "项目初始化完成，已创建 45 个知识条目", details: "成功解析 3 个文档，创建知识条目 45 条，索引完成率 100%。处理耗时：2.3s", requestId: "req_a1b2c3d4" },
    { id: "2", timestamp: "2026-05-24 14:31:45", level: "info", message: "正在解析「百问百答 v2.3.pdf」...", requestId: "req_a1b2c3d4" },
    { id: "3", timestamp: "2026-05-24 14:31:30", level: "info", message: "开始项目初始化流程，目标项目：万科·翡翠天际", requestId: "req_a1b2c3d4" },
    { id: "4", timestamp: "2026-05-23 09:15:22", level: "warn", message: "文档「销讲说辞.docx」部分段落格式异常，已跳过 2 段", details: "段落 14 和 27 包含无法识别的格式标记，已安全跳过，不影响其余内容。", requestId: "req_e5f6g7h8" },
    { id: "5", timestamp: "2026-05-23 09:14:58", level: "info", message: "任务调度成功，等待队列处理...", requestId: "req_e5f6g7h8" },
  ],
  "sales-agent": [
    { id: "1", timestamp: "2026-05-25 10:12:33", level: "info", message: "生成跟进话术成功，客户：张先生，意向等级：A", details: "话术生成用时 0.8s，包含开场白 + 2 个跟进要点 + 邀约建议。", requestId: "req_z9y8x7w6" },
    { id: "2", timestamp: "2026-05-25 10:11:50", level: "info", message: "已读取最新接待记录，识别关键信息...", requestId: "req_z9y8x7w6" },
    { id: "3", timestamp: "2026-05-25 08:05:01", level: "error", message: "CRM 系统连接超时，第 2 次重试成功", details: "首次连接超时 (5s)，自动重试后在第 2 次尝试中恢复连接。建议检查 CRM 系统网络延迟。", requestId: "req_v5u4t3s2" },
  ],
};

const filterOptions = [
  { key: "all", label: "全部" },
  { key: "info", label: "INFO" },
  { key: "warn", label: "WARN" },
  { key: "error", label: "ERROR" },
];

interface LogsTabProps {
  agentId: string;
}

export function LogsTab({ agentId }: LogsTabProps) {
  const [filter, setFilter] = useState<"all" | "info" | "warn" | "error">("all");
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  const logs = mockLogs[agentId] || mockLogs["init-agent"] || [];
  const filtered = filter === "all" ? logs : logs.filter((l) => l.level === filter);

  return (
    <div className="flex flex-col h-full">
      <div className="p-5 flex-1 overflow-y-auto min-h-0">
        {/* Filter */}
        <div className="mb-4">
          <FilterBar
            options={filterOptions}
            activeKey={filter}
            onChange={(key) => setFilter(key as typeof filter)}
          />
        </div>

        {/* Log List */}
        <div className="space-y-1.5">
          {filtered.map((log) => (
            <div
              key={log.id}
              onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                selectedLog?.id === log.id
                  ? "bg-brand-50 dark:bg-brand-50/10 ring-1 ring-brand/20"
                  : "hover:bg-[#F9F9FA] dark:hover:bg-[#0C0C0F]"
              }`}
            >
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ${levelStyles[log.level]}`}>
                {log.level.toUpperCase()}
              </span>
              <span className="text-[12.5px] text-[#52525B] dark:text-[#A1A1AA] flex-1 truncate">
                {log.message}
              </span>
              <span className="text-[11px] text-[#A1A1AA] flex-shrink-0">{log.timestamp}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-8 text-[13px] text-[#A1A1AA]">暂无日志</div>
          )}
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedLog && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[#E4E4E7] dark:border-[#27272A] bg-[#F9F9FA] dark:bg-[#18181B] overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${levelStyles[selectedLog.level]}`}>
                  {selectedLog.level.toUpperCase()}
                </span>
                <span className="text-[12px] text-[#A1A1AA]">{selectedLog.timestamp}</span>
                {selectedLog.requestId && (
                  <span className="text-[11px] text-[#A1A1AA] ml-auto font-mono">
                    ID: {selectedLog.requestId}
                  </span>
                )}
                <button
                  onClick={() => setSelectedLog(null)}
                  className="p-0.5 rounded text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7] hover:bg-[#E4E4E7] dark:hover:bg-[#27272A] transition-colors ml-1"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="text-[13px] text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                {selectedLog.details || selectedLog.message}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
