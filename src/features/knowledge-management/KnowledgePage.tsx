import { useEffect } from "react";
import { motion } from "framer-motion";
import { useKnowledgeStore } from "@/stores/useKnowledgeStore";
import { KbOrgPanel } from "./columns/KbOrgPanel";
import { CategoryPanel } from "./columns/CategoryPanel";
import { FileListPanel } from "./columns/FileListPanel";

export function KnowledgePage() {
  const { selectedTenantId } = useKnowledgeStore();

  // Auto-select first tenant on mount (same pattern as AgentManagementPage)
  useEffect(() => {
    if (!selectedTenantId) {
      // Default is already "vanke" in the store
    }
  }, [selectedTenantId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex overflow-hidden"
    >
      {/* Column 1: Org Tree (200px) */}
      <div className="w-[200px] flex-shrink-0 border-r border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B]">
        <KbOrgPanel />
      </div>

      {/* Column 2: Category Panel (200px) */}
      <div className="w-[200px] flex-shrink-0 border-r border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B]">
        <CategoryPanel />
      </div>

      {/* Column 3: File List (flex-1) */}
      <div className="flex-1 min-w-0 bg-white dark:bg-[#18181B]">
        <FileListPanel />
      </div>
    </motion.div>
  );
}
