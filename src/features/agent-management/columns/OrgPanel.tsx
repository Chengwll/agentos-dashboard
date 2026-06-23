import { useState } from "react";
import { useOrganizations } from "@/hooks/useOrganizations";
import type { Tenant, OrgNode } from "@/types/organization";
import { TenantSwitcher } from "@/components/org-tree/TenantSwitcher";
import { OrgTree } from "@/components/org-tree/OrgTree";

interface OrgPanelProps {
  tenants: Tenant[];
  selectedTenantId: string | null;
  selectedOrgId: string | null;
  onSelectTenant: (tenant: Tenant) => void;
  onSelectOrg: (node: OrgNode) => void;
}

export function OrgPanel({
  tenants,
  selectedTenantId,
  selectedOrgId,
  onSelectTenant,
  onSelectOrg,
}: OrgPanelProps) {
  const [orgSearch, setOrgSearch] = useState("");
  const { data: orgData } = useOrganizations(selectedTenantId);
  const selectedTenant = tenants.find((t) => t.id === selectedTenantId) || null;
  const regions = orgData?.regions || [];

  return (
    <>
      <TenantSwitcher
        tenants={tenants}
        selectedTenant={selectedTenant}
        onSelect={onSelectTenant}
        orgSearch={orgSearch}
        onOrgSearchChange={setOrgSearch}
      />
      <div className="flex-1 overflow-y-auto min-h-0">
        <OrgTree
          regions={regions}
          selectedOrgId={selectedOrgId}
          onSelectOrg={onSelectOrg}
          search={orgSearch}
        />
      </div>
    </>
  );
}
