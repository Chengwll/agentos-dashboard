export type AgentStatus = "running" | "pending" | "disabled";
export type AgentModel = "Claude 3 Haiku" | "Claude 3 Sonnet" | "Claude 3 Opus" | "GPT-4o";
export type AgentTool = "网页搜索" | "文档读取" | "代码执行" | "图表生成";

export interface KnowledgeBaseLink {
  name: string;
  status: "已连接" | "只读";
}

export interface Agent {
  id: string;
  icon?: string;
  name: string;
  type: string;
  description: string;
  status: AgentStatus;
  runs: number;
  rating: number;
  version: string;
  lastEdited: string;
  category: string;
  deployGroup: string;
  tools: AgentTool[];
  mcp: string[];
  systemPrompt: string;
  skills: string[];
  knowledgeBases: KnowledgeBaseLink[];
  model: AgentModel;
  orgId: string;
  tenantId: string;
}

export interface AgentVersion {
  version: string;
  date: string;
  isCurrent: boolean;
  changelog: string;
}

export interface AgentLogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
  details?: Record<string, string>;
}
