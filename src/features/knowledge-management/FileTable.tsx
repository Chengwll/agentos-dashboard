import type { KnowledgeFile } from "@/types/knowledge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useKnowledgeStore } from "@/stores/useKnowledgeStore";
import { fileIcons } from "@/config/constants";
import { Eye, Trash2 } from "lucide-react";

interface FileTableProps {
  files: KnowledgeFile[];
  isLoading: boolean;
}

export function FileTable({ files, isLoading }: FileTableProps) {
  const { selectedFileIds, toggleFileSelection, selectAllFiles, clearSelection, openPreview } =
    useKnowledgeStore();

  const allSelected =
    files.length > 0 && files.every((f) => selectedFileIds.has(f.id));
  const someSelected =
    files.some((f) => selectedFileIds.has(f.id)) && !allSelected;

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-12 rounded-lg bg-[#F4F4F5] dark:bg-[#27272A] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-[13px] text-[#A1A1AA]">
        暂无文件
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E4E4E7] dark:border-[#27272A]">
            <th className="w-10 px-4 py-2.5">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={() => {
                  if (allSelected) {
                    clearSelection();
                  } else {
                    selectAllFiles(files.map((f) => f.id));
                  }
                }}
                className="w-3.5 h-3.5 rounded border-[#D1D1D6] dark:border-[#3F3F46] text-brand cursor-pointer"
              />
            </th>
            <th className="text-left text-[11px] font-semibold text-[#A1A1AA] px-3 py-2.5">
              文件名称
            </th>
            <th className="text-left text-[11px] font-semibold text-[#A1A1AA] px-3 py-2.5 w-20">
              大小
            </th>
            <th className="text-left text-[11px] font-semibold text-[#A1A1AA] px-3 py-2.5 w-28">
              状态
            </th>
            <th className="text-left text-[11px] font-semibold text-[#A1A1AA] px-3 py-2.5 w-28">
              上传日期
            </th>
            <th className="text-left text-[11px] font-semibold text-[#A1A1AA] px-3 py-2.5 w-20">
              分块数
            </th>
            <th className="text-right text-[11px] font-semibold text-[#A1A1AA] px-4 py-2.5 w-24">
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr
              key={file.id}
              className="border-b border-[#E4E4E7] dark:border-[#27272A] hover:bg-[#F9F9FA] dark:hover:bg-[#0C0C0F] transition-colors"
            >
              <td className="px-4 py-2.5">
                <input
                  type="checkbox"
                  checked={selectedFileIds.has(file.id)}
                  onChange={() => toggleFileSelection(file.id)}
                  className="w-3.5 h-3.5 rounded border-[#D1D1D6] dark:border-[#3F3F46] text-brand cursor-pointer"
                />
              </td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{fileIcons[file.type] || "📄"}</span>
                  <span className="text-[13px] text-[#18181B] dark:text-[#FAFAFA] truncate max-w-[280px]">
                    {file.name}
                  </span>
                </div>
              </td>
              <td className="px-3 py-2.5 text-[12px] text-[#A1A1AA]">
                {file.size}
              </td>
              <td className="px-3 py-2.5">
                <StatusBadge status={file.status} />
              </td>
              <td className="px-3 py-2.5 text-[12px] text-[#A1A1AA]">
                {file.date}
              </td>
              <td className="px-3 py-2.5 text-[12px] text-[#A1A1AA]">
                {file.chunks > 0 ? file.chunks : "-"}
              </td>
              <td className="px-4 py-2.5">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => openPreview(file.id)}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-[#A1A1AA] hover:text-brand hover:bg-brand-50 dark:hover:bg-brand-50/10 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 rounded-md flex items-center justify-center text-[#A1A1AA] hover:text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[#7F1D1D]/20 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
