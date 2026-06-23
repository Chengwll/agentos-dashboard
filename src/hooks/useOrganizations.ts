import { useQuery } from "@tanstack/react-query";

function getBaseUrl() {
  return "/api";
}

export function useOrganizations(tenantId: string | null) {
  return useQuery({
    queryKey: ["organizations", tenantId],
    queryFn: async () => {
      const res = await fetch(`${getBaseUrl()}/tenants/${tenantId}/organizations`);
      if (!res.ok) throw new Error("Failed to fetch organizations");
      return res.json();
    },
    enabled: !!tenantId,
    staleTime: 60_000,
  });
}

export function useTenants() {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      const res = await fetch(`${getBaseUrl()}/tenants`);
      if (!res.ok) throw new Error("Failed to fetch tenants");
      return res.json();
    },
    staleTime: 120_000,
  });
}
