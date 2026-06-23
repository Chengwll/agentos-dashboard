import { RefreshCw, Trash2, X } from "lucide-react";
import { useKnowledgeStore } from "@/stores/useKnowledgeStore";

interface BatchBarProps {
  totalFiles: number;
}

export function BatchBar({ totalFiles }: BatchBarProps) {
  const { selectedFileIds, clearSelection, selectAllFiles } = useKnowledgeStore();
  const count = selectedFileIds.size;

  if (count === 0) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-brand-50 dark:bg-brand-50/10 border-b border-[#E4E4E7] dark:border-[#27272A]">
      <button
        onClick={clearSelection}
        className="text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7] transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <span className="text-[12px] text-[#52525B] dark:text-[#A1A1AA]">
        已选择 <span className="font-semibold text-brand">{count}</span> / {totalFiles} 个文件
      </span>
      {count < totalFiles && (
        <button
          onClick={() =>
            selectAllFiles(
              Array.from({ length: totalFiles }).map((_, i) => `kb-${i + 1}`)
            )
          }
          className="text-[12px] text-brand hover:underline"
        >
          全选
        </button>
      )}
      <div className="flex-1" />
      <button className="flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-md bg-brand text-white hover:bg-brand-700 transition-colors">
        <RefreshCw className="w-3 h-3" />
        重新向量化
      </button>
      <button className="flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-md bg-[#FEF2F2] dark:bg-[#7F1D1D]/20 text-[#EF4444] hover:bg-[#FEE2E2] dark:hover:bg-[#7F1D1D]/30 transition-colors">
        <Trash2 className="w-3 h-3" />
        批量删除
      </button>
    </div>
  );
}
