import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAgentStore } from "@/stores/useAgentStore";
import { useTenants } from "@/hooks/useOrganizations";
import { useAgents, useAgent } from "@/hooks/useAgents";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import type { Agent } from "@/types/agent";
import type { OrgNode as OrgNodeType, Tenant } from "@/types/organization";
import { OrgPanel } from "./columns/OrgPanel";
import { AgentListPanel } from "./columns/AgentListPanel";
import { DetailPanel } from "./columns/DetailPanel";
import { TestPanel } from "./columns/TestPanel";

export function AgentManagementPage() {
  const {
    selectedTenantId,
    selectedOrgId,
    selectedAgentId,
    agentListFilter,
    isTestPanelOpen,
    isEditMode,
    selectTenant,
    selectOrg,
    selectAgent,
    setAgentListFilter,
    exitEditMode,
  } = useAgentStore();

  const [pendingAgent, setPendingAgent] = useState<Agent | null>(null);

  const { data: tenants } = useTenants();
  const { data: agents, isLoading, isError, refetch } = useAgents(selectedTenantId, selectedOrgId, agentListFilter);
  const { data: selectedAgent, isLoading: agentLoading } = useAgent(selectedAgentId);
  const prevAgentsRef = useRef<Agent[] | undefined>(undefined);

  // Auto-select first tenant on mount
  useEffect(() => {
    if (tenants && tenants.length > 0 && !selectedTenantId) {
      selectTenant(tenants[0].id);
    }
  }, [tenants, selectedTenantId, selectTenant]);

  // Auto-select first org when tenant changes
  useEffect(() => {
    if (selectedTenantId && !selectedOrgId) {
      // The OrgPanel handles this internally via its org data
    }
  }, [selectedTenantId, selectedOrgId]);

  // Auto-select first agent when agents change
  useEffect(() => {
    if (agents && agents.length > 0 && !selectedAgentId) {
      selectAgent(agents[0].id);
    } else if (agents && agents.length === 0) {
      selectAgent("");
    }

    // Also auto-select first agent when filter or org changes
    const prevAgents = prevAgentsRef.current;
    if (
      agents &&
      agents.length > 0 &&
      prevAgents !== agents &&
      !agents.find((a: Agent) => a.id === selectedAgentId)
    ) {
      selectAgent(agents[0].id);
    }
    prevAgentsRef.current = agents;
  }, [agents, selectedAgentId, selectAgent]);

  const handleSelectTenant = (tenant: Tenant) => {
    selectTenant(tenant.id);
  };

  const handleSelectOrg = (node: OrgNodeType) => {
    selectOrg(node.id);
  };

  const handleSelectAgent = (agent: Agent) => {
    if (isEditMode && agent.id !== selectedAgentId) {
      setPendingAgent(agent);
    } else {
      selectAgent(agent.id);
    }
  };

  const confirmSwitchAgent = () => {
    if (pendingAgent) {
      exitEditMode();
      selectAgent(pendingAgent.id);
      setPendingAgent(null);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-1 flex overflow-hidden"
      >
      {/* Column 1: Org Panel (200px) */}
      <div className="w-[200px] min-w-[200px] bg-white dark:bg-[#18181B] border-r border-[#E4E4E7] dark:border-[#27272A] flex flex-col">
        <OrgPanel
          tenants={tenants || []}
          selectedTenantId={selectedTenantId}
          selectedOrgId={selectedOrgId}
          onSelectTenant={handleSelectTenant}
          onSelectOrg={handleSelectOrg}
        />
      </div>

      {/* Column 2: Agent List (380px) */}
      <div className="w-[380px] min-w-[380px] bg-[#F9F9FA] dark:bg-[#18181B] border-r border-[#E4E4E7] dark:border-[#27272A] flex flex-col">
        <AgentListPanel
          agents={agents || []}
          selectedAgentId={selectedAgentId}
          filter={agentListFilter}
          onFilterChange={setAgentListFilter}
          onSelectAgent={handleSelectAgent}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => refetch()}
        />
      </div>

      {/* Column 3: Detail Panel (flex-1) */}
      <div className="flex-1 bg-white dark:bg-[#18181B] flex flex-col overflow-hidden min-w-0">
        <DetailPanel agent={selectedAgent} isLoading={agentLoading} allAgents={agents} />
      </div>

      {/* Column 4: Test Panel (collapsible) */}
      <div
        className={cn(
          "bg-white dark:bg-[#18181B] border-l border-[#E4E4E7] dark:border-[#27272A] flex flex-col transition-all duration-300 overflow-hidden",
          isTestPanelOpen ? "w-[320px] min-w-[320px]" : "w-0 min-w-0 border-l-0"
        )}
      >
        <TestPanel agentName={selectedAgent?.name || null} />
      </div>

      <ConfirmDialog
        open={!!pendingAgent}
        onOpenChange={(open) => { if (!open) setPendingAgent(null); }}
        title="放弃编辑？"
        description="当前配置有未保存的修改，切换 Agent 将丢失这些更改。"
        confirmLabel="放弃并切换"
        confirmVariant="destructive"
        onConfirm={confirmSwitchAgent}
      />
    </motion.div>
    </MotionConfig>
  );
}
