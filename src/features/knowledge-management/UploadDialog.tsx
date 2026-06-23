import { useState } from "react";
import { X, Upload, Globe, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useKnowledgeStore } from "@/stores/useKnowledgeStore";

type UploadTab = "local" | "cloud";

// Singleton for triggering the upload dialog from outside
let openDialogFn: (() => void) | null = null;

export function UploadDialog() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<UploadTab>("local");
  const { selectedOrgId } = useKnowledgeStore();

  openDialogFn = () => setOpen(true);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[480px] bg-white dark:bg-[#18181B] rounded-xl border border-[#E4E4E7] dark:border-[#27272A] shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E4E4E7] dark:border-[#27272A]">
                <Upload className="w-5 h-5 text-brand" />
                <span className="text-[14px] font-semibold text-[#18181B] dark:text-[#FAFAFA] flex-1">
                  上传知识文件
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#E4E4E7] dark:border-[#27272A]">
                {([
                  { key: "local", label: "本地上传", icon: FileText },
                  { key: "cloud", label: "云端导入", icon: Globe },
                ] as const).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[13px] font-medium transition-colors border-b-2 ${
                      activeTab === tab.key
                        ? "border-brand text-brand"
                        : "border-transparent text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7]"
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-5">
                {activeTab === "local" ? (
                  <div className="border-2 border-dashed border-[#D1D1D6] dark:border-[#3F3F46] rounded-xl p-10 text-center hover:border-brand hover:bg-brand-50/5 transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 text-[#A1A1AA] mx-auto mb-3" />
                    <div className="text-[13px] text-[#52525B] dark:text-[#A1A1AA] mb-1">
                      拖拽文件到此处，或点击上传
                    </div>
                    <div className="text-[11px] text-[#A1A1AA]">
                      支持 PDF、Word、Excel、PPT、TXT、Markdown 格式
                    </div>
                    <div className="text-[11px] text-[#A1A1AA] mt-0.5">
                      单个文件不超过 20MB
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-[12px] text-[#A1A1AA] mb-2">
                      从云盘选择文件导入到知识库：
                    </div>
                    {["项目文档库", "合同模板库", "客户资料库"].map((name) => (
                      <div
                        key={name}
                        className="flex items-center gap-3 p-3 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] hover:bg-[#F9F9FA] dark:hover:bg-[#0C0C0F] cursor-pointer transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-50/10 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-brand" />
                        </div>
                        <div>
                          <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">
                            {name}
                          </div>
                          <div className="text-[11px] text-[#A1A1AA]">
                            共 12 个文件
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-end gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="text-[13px] px-4 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                  }}
                  disabled={!selectedOrgId}
                  className="text-[13px] font-medium px-4 py-1.5 rounded-lg bg-brand text-white hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  开始上传
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Export a hook to trigger the dialog
export function useUploadDialog() {
  return {
    open: () => {
      openDialogFn?.();
    },
  };
}
