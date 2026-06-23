import { create } from "zustand";

type AgentFilter = "all" | "running" | "pending" | "disabled";
type DetailTab = "config" | "logs" | "versions";

interface AgentStore {
  selectedTenantId: string | null;
  selectedOrgId: string | null;
  selectedAgentId: string | null;
  isEditMode: boolean;
  activeDetailTab: DetailTab;
  agentListFilter: AgentFilter;
  isTestPanelOpen: boolean;
  selectedAgentIds: Set<string>;

  selectTenant: (tenantId: string) => void;
  selectOrg: (orgId: string) => void;
  selectAgent: (agentId: string) => void;
  setAgentListFilter: (filter: AgentFilter) => void;
  setActiveDetailTab: (tab: DetailTab) => void;
  toggleEditMode: () => void;
  exitEditMode: () => void;
  toggleTestPanel: () => void;
  toggleAgentSelection: (agentId: string) => void;
  clearSelection: () => void;
}

export const useAgentStore = create<AgentStore>((set) => ({
  selectedTenantId: null,
  selectedOrgId: null,
  selectedAgentId: null,
  isEditMode: false,
  activeDetailTab: "config",
  agentListFilter: "all",
  isTestPanelOpen: true,
  selectedAgentIds: new Set(),

  selectTenant: (tenantId) =>
    set({ selectedTenantId: tenantId, selectedOrgId: null, selectedAgentId: null }),
  selectOrg: (orgId) =>
    set({ selectedOrgId: orgId, selectedAgentId: null }),
  selectAgent: (agentId) =>
    set({ selectedAgentId: agentId }),
  setAgentListFilter: (filter) =>
    set({ agentListFilter: filter }),
  setActiveDetailTab: (tab) =>
    set({ activeDetailTab: tab }),
  toggleEditMode: () =>
    set((state) => ({ isEditMode: !state.isEditMode })),
  exitEditMode: () =>
    set({ isEditMode: false }),
  toggleTestPanel: () =>
    set((state) => ({ isTestPanelOpen: !state.isTestPanelOpen })),
  toggleAgentSelection: (agentId) =>
    set((state) => {
      const next = new Set(state.selectedAgentIds);
      if (next.has(agentId)) next.delete(agentId);
      else next.add(agentId);
      return { selectedAgentIds: next };
    }),
  clearSelection: () =>
    set({ selectedAgentIds: new Set() }),
}));
