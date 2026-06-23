export type FileType = "pdf" | "word" | "excel" | "ppt" | "txt" | "md";
export type FileStatus = "vectorized" | "pending" | "failed";

export interface KnowledgeFile {
  id: string;
  name: string;
  type: FileType;
  size: string;
  status: FileStatus;
  date: string;
  category: string;
  chunks: number;
  tokens: string;
  orgId: string;
}

export interface KnowledgeCategory {
  name: string;
  fileCount: number;
}
