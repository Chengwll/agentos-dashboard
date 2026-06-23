import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";
import type { OrgNode as OrgNodeType } from "@/types/organization";

interface OrgNodeProps {
  node: OrgNodeType;
  isActive: boolean;
  onSelect: (node: OrgNodeType) => void;
}

export function OrgNode({ node, isActive, onSelect }: OrgNodeProps) {
  return (
    <div
      onClick={() => onSelect(node)}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-all duration-150 text-[13px]",
        isActive
          ? "bg-brand-50 dark:bg-brand-50/10 text-brand dark:text-brand-300 font-medium"
          : "text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
      )}
    >
      <Building2 size={12} />
      <span className="flex-1 min-w-0 truncate">{node.name}</span>
      <span
        className={cn(
          "text-[11px] px-1.5 py-px rounded-full flex-shrink-0",
          isActive
            ? "bg-brand text-white"
            : "bg-[#F4F4F5] dark:bg-[#27272A] text-[#A1A1AA]"
        )}
      >
        {node.agentCount}
      </span>
    </div>
  );
}
