import { X, FileText, Hash, Database, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useKnowledgeStore } from "@/stores/useKnowledgeStore";
import { useKnowledgeFile } from "@/hooks/useKnowledgeFiles";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { fileIcons } from "@/config/constants";

export function FilePreviewDrawer() {
  const { previewFileId, closePreview } = useKnowledgeStore();
  const { data: file, isLoading } = useKnowledgeFile(previewFileId);

  return (
    <AnimatePresence>
      {previewFileId && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreview}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[400px] bg-white dark:bg-[#18181B] border-l border-[#E4E4E7] dark:border-[#27272A] z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E4E4E7] dark:border-[#27272A]">
              <FileText className="w-5 h-5 text-brand" />
              <span className="text-[14px] font-semibold text-[#18181B] dark:text-[#FAFAFA] flex-1">
                文件详情
              </span>
              <button
                onClick={closePreview}
                className="w-7 h-7 rounded-md flex items-center justify-center text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 rounded-lg bg-[#F4F4F5] dark:bg-[#27272A] animate-pulse"
                    />
                  ))}
                </div>
              ) : file ? (
                <div className="space-y-5">
                  {/* Icon + Name */}
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">
                      {fileIcons[file.type] || "📄"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-semibold text-[#18181B] dark:text-[#FAFAFA] leading-snug">
                        {file.name}
                      </div>
                      <div className="text-[12px] text-[#A1A1AA] mt-0.5">
                        {file.type.toUpperCase()} · {file.size}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <div className="text-[11px] font-semibold text-[#A1A1AA] mb-1.5">
                      向量化状态
                    </div>
                    <StatusBadge status={file.status} />
                  </div>

                  {/* Meta grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F9F9FA] dark:bg-[#18181B] rounded-lg p-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#A1A1AA] mb-1">
                        <Calendar className="w-3 h-3" />
                        上传日期
                      </div>
                      <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">
                        {file.date}
                      </div>
                    </div>
                    <div className="bg-[#F9F9FA] dark:bg-[#18181B] rounded-lg p-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#A1A1AA] mb-1">
                        <Database className="w-3 h-3" />
                        分类
                      </div>
                      <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">
                        {file.category}
                      </div>
                    </div>
                    <div className="bg-[#F9F9FA] dark:bg-[#18181B] rounded-lg p-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#A1A1AA] mb-1">
                        <Hash className="w-3 h-3" />
                        分块数
                      </div>
                      <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">
                        {file.chunks > 0 ? file.chunks : "-"}
                      </div>
                    </div>
                    <div className="bg-[#F9F9FA] dark:bg-[#18181B] rounded-lg p-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#A1A1AA] mb-1">
                        <Hash className="w-3 h-3" />
                        Token 数
                      </div>
                      <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">
                        {file.tokens}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-[#A1A1AA] text-[13px]">
                  文件信息加载失败
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="px-5 py-3 border-t border-[#E4E4E7] dark:border-[#27272A] flex items-center gap-2">
              <button className="flex-1 text-[13px] font-medium px-3 py-1.5 rounded-lg bg-brand text-white hover:bg-brand-700 transition-colors">
                重新向量化
              </button>
              <button className="text-[13px] px-3 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[#7F1D1D]/20 transition-colors">
                删除
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
