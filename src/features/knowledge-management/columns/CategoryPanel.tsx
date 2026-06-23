import { Folder, FileText } from "lucide-react";
import { useKnowledgeCategories } from "@/hooks/useKnowledgeFiles";
import { useKnowledgeStore } from "@/stores/useKnowledgeStore";
import { EmptyState } from "@/components/shared/EmptyState";
import type { KnowledgeCategory } from "@/types/knowledge";
import { cn } from "@/lib/utils";

export function CategoryPanel() {
  const { selectedOrgId, selectedCategory, selectCategory } =
    useKnowledgeStore();
  const { data: rawCategories = [], isLoading } =
    useKnowledgeCategories(selectedOrgId);
  const categories = rawCategories as KnowledgeCategory[];

  if (!selectedOrgId) {
    return (
      <EmptyState
        icon={<Folder className="w-8 h-8 text-[#A1A1AA]" />}
        title="未选择组织"
        description="请从左侧选择组织查看知识分类"
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
        <span className="text-[13px] font-semibold text-[#18181B] dark:text-[#FAFAFA]">
          知识分类
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <div className="space-y-2 p-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 rounded-lg bg-[#F4F4F5] dark:bg-[#27272A] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <button
              onClick={() => selectCategory(null)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors text-left",
                !selectedCategory
                  ? "bg-brand text-white"
                  : "text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
              )}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>全部文件</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => selectCategory(cat.name)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors text-left",
                  selectedCategory === cat.name
                    ? "bg-brand text-white"
                    : "text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
                )}
              >
                <Folder className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="flex-1 truncate">{cat.name}</span>
                <span
                  className={cn(
                    "text-[11px] font-medium px-1.5 py-0.5 rounded-full",
                    selectedCategory === cat.name
                      ? "bg-white/20 text-white"
                      : "bg-[#F4F4F5] dark:bg-[#27272A] text-[#A1A1AA]"
                  )}
                >
                  {cat.fileCount}
                </span>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
