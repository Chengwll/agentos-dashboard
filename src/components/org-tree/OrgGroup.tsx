import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrgNode } from "@/types/organization";
import { OrgNode as OrgNodeComponent } from "./OrgNode";

interface OrgGroupProps {
  name: string;
  nodes: OrgNode[];
  selectedOrgId: string | null;
  onSelectOrg: (node: OrgNode) => void;
}

export function OrgGroup({
  name,
  nodes,
  selectedOrgId,
  onSelectOrg,
}: OrgGroupProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="mb-1">
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-1.5 px-2 py-1.5 cursor-pointer text-[12px] font-semibold text-[#A1A1AA] uppercase tracking-wider"
      >
        <ChevronRight
          size={12}
          className={cn(
            "transition-transform duration-150",
            !collapsed && "rotate-90"
          )}
        />
        {name}
      </div>
      {!collapsed && (
        <div className="flex flex-col gap-0.5">
          {nodes.map((node) => (
            <OrgNodeComponent
              key={node.id}
              node={node}
              isActive={selectedOrgId === node.id}
              onSelect={onSelectOrg}
            />
          ))}
        </div>
      )}
    </div>
  );
}
