import type { Region, OrgNode } from "@/types/organization";
import { OrgGroup } from "./OrgGroup";

interface OrgTreeProps {
  regions: Region[];
  selectedOrgId: string | null;
  onSelectOrg: (node: OrgNode) => void;
  search?: string;
}

export function OrgTree({ regions, selectedOrgId, onSelectOrg, search }: OrgTreeProps) {
  const filterNodes = (nodes: OrgNode[]) => {
    if (!search) return nodes;
    return nodes.filter((n) =>
      n.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredRegions = regions
    .map((r) => ({ ...r, orgs: filterNodes(r.orgs) }))
    .filter((r) => r.orgs.length > 0);

  return (
    <div className="flex flex-col h-full">
      {/* Tree */}
      <div className="flex-1 overflow-y-auto px-1.5 min-h-0">
        {filteredRegions.length === 0 ? (
          <div className="text-center py-8 text-[13px] text-[#A1A1AA]">
            未找到匹配的组织
          </div>
        ) : (
          filteredRegions.map((region) => (
            <OrgGroup
              key={region.id}
              name={region.name}
              nodes={region.orgs}
              selectedOrgId={selectedOrgId}
              onSelectOrg={onSelectOrg}
            />
          ))
        )}
      </div>
    </div>
  );
}

export type { OrgNode };
