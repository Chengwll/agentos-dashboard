import type { OrgNode } from "@/types/organization";
import { TenantSwitcher } from "@/components/org-tree/TenantSwitcher";
import { OrgTree } from "@/components/org-tree/OrgTree";
import { useKnowledgeStore } from "@/stores/useKnowledgeStore";
import { useOrganizations, useTenants } from "@/hooks/useOrganizations";

export function KbOrgPanel() {
  const { selectedTenantId, selectedOrgId, selectTenant, selectOrg } =
    useKnowledgeStore();
  const { data: tenants = [] } = useTenants();
  const { data: orgData } = useOrganizations(selectedTenantId);

  const selectedTenant = tenants.find((t: { id: string }) => t.id === selectedTenantId) || null;
  const regions = orgData?.regions || [];

  return (
    <div className="flex flex-col h-full">
      <TenantSwitcher
        tenants={tenants}
        selectedTenant={selectedTenant}
        onSelect={(tenant) => selectTenant(tenant.id)}
        metaLabel="文件"
      />
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-4 py-2.5">
          <div className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
            组织架构
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <OrgTree
            regions={regions}
            selectedOrgId={selectedOrgId}
            onSelectOrg={(node: OrgNode) => selectOrg(node.id)}
          />
        </div>
      </div>
    </div>
  );
}
