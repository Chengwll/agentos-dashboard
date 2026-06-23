import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function getBaseUrl() {
  return "/api";
}

export function useAgents(
  tenantId: string | null,
  orgId: string | null,
  status: string = "all"
) {
  return useQuery({
    queryKey: ["agents", tenantId, orgId, status],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (tenantId) params.set("tenantId", tenantId);
      if (orgId) params.set("orgId", orgId);
      if (status && status !== "all") params.set("status", status);
      const res = await fetch(`${getBaseUrl()}/agents?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch agents");
      return res.json();
    },
    enabled: !!tenantId && !!orgId,
    staleTime: 30_000,
  });
}

export function useAgent(agentId: string | null) {
  return useQuery({
    queryKey: ["agent", agentId],
    queryFn: async () => {
      const res = await fetch(`${getBaseUrl()}/agents/${agentId}`);
      if (!res.ok) throw new Error("Failed to fetch agent");
      return res.json();
    },
    enabled: !!agentId,
    staleTime: 30_000,
  });
}

export function useUpdateAgent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      agentId,
      data,
    }: {
      agentId: string;
      data: Record<string, unknown>;
    }) => {
      const res = await fetch(`${getBaseUrl()}/agents/${agentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update agent");
      return res.json();
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["agent", variables.agentId],
      });
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
  });
}
