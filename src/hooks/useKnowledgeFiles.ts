import { useQuery } from "@tanstack/react-query";

function getBaseUrl() {
  return "/api";
}

export function useKnowledgeFiles(
  orgId: string | null,
  category: string | null,
  typeFilter: string = "all",
  search: string = ""
) {
  return useQuery({
    queryKey: ["knowledge", "files", orgId, category, typeFilter, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (orgId) params.set("orgId", orgId);
      if (category) params.set("category", category);
      if (typeFilter && typeFilter !== "all") params.set("type", typeFilter);
      if (search) params.set("search", search);
      const res = await fetch(
        `${getBaseUrl()}/knowledge/files?${params.toString()}`
      );
      if (!res.ok) throw new Error("Failed to fetch files");
      return res.json();
    },
    enabled: !!orgId,
    staleTime: 30_000,
  });
}

export function useKnowledgeCategories(orgId: string | null) {
  return useQuery({
    queryKey: ["knowledge", "categories", orgId],
    queryFn: async () => {
      const res = await fetch(`${getBaseUrl()}/knowledge/categories/${orgId}`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
    enabled: !!orgId,
    staleTime: 60_000,
  });
}

export function useKnowledgeFile(fileId: string | null) {
  return useQuery({
    queryKey: ["knowledge", "file", fileId],
    queryFn: async () => {
      const res = await fetch(`${getBaseUrl()}/knowledge/files/${fileId}`);
      if (!res.ok) throw new Error("Failed to fetch file");
      return res.json();
    },
    enabled: !!fileId,
  });
}
