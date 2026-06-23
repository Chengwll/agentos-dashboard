import { create } from "zustand";

type FileTypeFilter = "all" | "pdf" | "word" | "excel" | "ppt";

interface KnowledgeStore {
  selectedTenantId: string | null;
  selectedOrgId: string | null;
  selectedCategory: string | null;
  fileTypeFilter: FileTypeFilter;
  searchQuery: string;
  selectedFileIds: Set<string>;
  previewFileId: string | null;

  selectTenant: (tenantId: string) => void;
  selectOrg: (orgId: string) => void;
  selectCategory: (category: string | null) => void;
  setFileTypeFilter: (filter: FileTypeFilter) => void;
  setSearchQuery: (query: string) => void;
  toggleFileSelection: (fileId: string) => void;
  selectAllFiles: (fileIds: string[]) => void;
  clearSelection: () => void;
  openPreview: (fileId: string) => void;
  closePreview: () => void;
}

export const useKnowledgeStore = create<KnowledgeStore>((set) => ({
  selectedTenantId: "vanke",
  selectedOrgId: null,
  selectedCategory: null,
  fileTypeFilter: "all",
  searchQuery: "",
  selectedFileIds: new Set(),
  previewFileId: null,

  selectTenant: (tenantId) =>
    set({ selectedTenantId: tenantId, selectedOrgId: null, selectedCategory: null }),
  selectOrg: (orgId) =>
    set({ selectedOrgId: orgId, selectedCategory: null }),
  selectCategory: (category) =>
    set({ selectedCategory: category }),
  setFileTypeFilter: (filter) =>
    set({ fileTypeFilter: filter }),
  setSearchQuery: (query) =>
    set({ searchQuery: query }),
  toggleFileSelection: (fileId) =>
    set((state) => {
      const next = new Set(state.selectedFileIds);
      if (next.has(fileId)) next.delete(fileId);
      else next.add(fileId);
      return { selectedFileIds: next };
    }),
  selectAllFiles: (fileIds) =>
    set({ selectedFileIds: new Set(fileIds) }),
  clearSelection: () =>
    set({ selectedFileIds: new Set() }),
  openPreview: (fileId) =>
    set({ previewFileId: fileId }),
  closePreview: () =>
    set({ previewFileId: null }),
}));
