import type { KnowledgeFile, KnowledgeCategory } from "@/types/knowledge";

export const mockCategories: KnowledgeCategory[] = [
  { name: "项目资料", fileCount: 3 },
  { name: "合同模板", fileCount: 2 },
  { name: "户型图", fileCount: 3 },
  { name: "销售话术", fileCount: 1 },
  { name: "客户案例", fileCount: 2 },
];

export const mockKnowledgeFiles: KnowledgeFile[] = [
  {
    id: "kb-1", name: "翡翠天际·销讲说辞 v2.3.docx", type: "word", size: "3.2 MB",
    status: "vectorized", date: "2026-05-20", category: "销售话术",
    chunks: 156, tokens: "32,400", orgId: "feicuixiaji",
  },
  {
    id: "kb-2", name: "翡翠天际·百问百答 2026Q2.pdf", type: "pdf", size: "5.1 MB",
    status: "vectorized", date: "2026-05-18", category: "项目资料",
    chunks: 243, tokens: "51,200", orgId: "feicuixiaji",
  },
  {
    id: "kb-3", name: "购房合同标准模板 2026版.docx", type: "word", size: "1.8 MB",
    status: "vectorized", date: "2026-05-15", category: "合同模板",
    chunks: 89, tokens: "18,500", orgId: "feicuixiaji",
  },
  {
    id: "kb-4", name: "翡翠天际·户型图集 105-143㎡.pdf", type: "pdf", size: "12.4 MB",
    status: "vectorized", date: "2026-05-12", category: "户型图",
    chunks: 312, tokens: "65,000", orgId: "feicuixiaji",
  },
  {
    id: "kb-5", name: "翡翠天际·精装标准清单.xlsx", type: "excel", size: "0.8 MB",
    status: "vectorized", date: "2026-05-10", category: "项目资料",
    chunks: 45, tokens: "9,200", orgId: "feicuixiaji",
  },
  {
    id: "kb-6", name: "客户满意度调查报告 2026Q1.pptx", type: "ppt", size: "4.6 MB",
    status: "pending", date: "2026-05-22", category: "客户案例",
    chunks: 0, tokens: "-", orgId: "feicuixiaji",
  },
  {
    id: "kb-7", name: "翡翠天际·园林景观方案.pdf", type: "pdf", size: "8.2 MB",
    status: "vectorized", date: "2026-05-08", category: "项目资料",
    chunks: 180, tokens: "38,000", orgId: "feicuixiaji",
  },
  {
    id: "kb-8", name: "购房补充协议模板.docx", type: "word", size: "1.2 MB",
    status: "vectorized", date: "2026-05-05", category: "合同模板",
    chunks: 56, tokens: "11,800", orgId: "feicuixiaji",
  },
  {
    id: "kb-9", name: "翡翠天际·A户型 105㎡ 样板间.pdf", type: "pdf", size: "6.8 MB",
    status: "failed", date: "2026-05-03", category: "户型图",
    chunks: 0, tokens: "-", orgId: "feicuixiaji",
  },
  {
    id: "kb-10", name: "翡翠天际·B户型 125㎡ 样板间.pdf", type: "pdf", size: "7.1 MB",
    status: "vectorized", date: "2026-05-01", category: "户型图",
    chunks: 198, tokens: "42,000", orgId: "feicuixiaji",
  },
  {
    id: "kb-11", name: "竞品分析·周边楼盘对比.xlsx", type: "excel", size: "1.5 MB",
    status: "vectorized", date: "2026-04-28", category: "客户案例",
    chunks: 67, tokens: "14,200", orgId: "feicuixiaji",
  },
  // 北京壹号
  {
    id: "kb-12", name: "北京壹号·项目介绍 2026.pdf", type: "pdf", size: "4.2 MB",
    status: "vectorized", date: "2026-05-10", category: "项目资料",
    chunks: 120, tokens: "25,400", orgId: "beijingyihao",
  },
  // 碧桂园
  {
    id: "kb-13", name: "碧桂园·佛山项目规划.pdf", type: "pdf", size: "6.5 MB",
    status: "vectorized", date: "2026-04-15", category: "项目资料",
    chunks: 175, tokens: "38,000", orgId: "bgy-foshan",
  },
];
