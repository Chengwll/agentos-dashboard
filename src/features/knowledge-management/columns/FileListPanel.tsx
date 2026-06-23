import { Upload, Search } from "lucide-react";
import { useKnowledgeStore } from "@/stores/useKnowledgeStore";
import { useKnowledgeFiles } from "@/hooks/useKnowledgeFiles";
import { FileTable } from "../FileTable";
import { BatchBar } from "../BatchBar";
import { FilePreviewDrawer } from "../FilePreviewDrawer";
import { UploadDialog, useUploadDialog } from "../UploadDialog";
import { cn } from "@/lib/utils";

const fileTypeFilters = [
  { key: "all", label: "全部" },
  { key: "pdf", label: "PDF" },
  { key: "word", label: "Word" },
  { key: "excel", label: "Excel" },
  { key: "ppt", label: "PPT" },
] as const;

export function FileListPanel() {
  const {
    selectedOrgId,
    selectedCategory,
    fileTypeFilter,
    searchQuery,
    setFileTypeFilter,
    setSearchQuery,
  } = useKnowledgeStore();

  const { data: files = [], isLoading } = useKnowledgeFiles(
    selectedOrgId,
    selectedCategory,
    fileTypeFilter,
    searchQuery
  );

  const { open } = useUploadDialog();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center gap-3">
        <span className="text-[13px] font-semibold text-[#18181B] dark:text-[#FAFAFA]">
          文件列表
        </span>
        <span className="text-[11px] text-[#A1A1AA]">
          {isLoading ? "加载中..." : `${files.length} 个文件`}
        </span>
        <div className="flex-1" />
        <button
          onClick={open}
          disabled={!selectedOrgId}
          className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg bg-brand text-white hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Upload className="w-3.5 h-3.5" />
          上传文件
        </button>
      </div>

      {/* Filter + Search bar */}
      <div className="px-4 py-2 border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center gap-3">
        <div className="flex gap-1">
          {fileTypeFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFileTypeFilter(f.key)}
              className={cn(
                "text-[11px] font-medium px-2 py-1 rounded-md transition-colors",
                fileTypeFilter === f.key
                  ? "bg-brand text-white"
                  : "text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A1A1AA]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索文件..."
            className="w-[180px] text-[12px] pl-7 pr-3 py-1.5 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] bg-[#F4F4F5] dark:bg-[#27272A] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand placeholder:text-[#A1A1AA]"
          />
        </div>
      </div>

      {/* Batch bar */}
      <BatchBar totalFiles={files.length} />

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <FileTable files={files} isLoading={isLoading} />
      </div>

      {/* Drawer + Dialog */}
      <FilePreviewDrawer />
      <UploadDialog />
    </div>
  );
}
