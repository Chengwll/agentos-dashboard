import type { DashboardMetrics, ChartDataPoint, DistributionItem, AgentPerformanceRow, RankingItem } from "@/types/dashboard";

export const mockDashboardMetrics: Record<string, DashboardMetrics> = {
  "30d": {
    totalCalls: 2847,
    avgSatisfaction: 4.6,
    errorRate: 1.2,
    tokenCost: 86,
    tokenUsage: 1200000,
    trends: {
      calls: { direction: "up", value: "18.4%" },
      satisfaction: { direction: "up", value: "0.3" },
      errorRate: { direction: "down", value: "0.5%" },
      cost: { direction: "up", value: "12%" },
    },
  },
  "7d": {
    totalCalls: 720,
    avgSatisfaction: 4.5,
    errorRate: 1.5,
    tokenCost: 22,
    tokenUsage: 300000,
    trends: {
      calls: { direction: "up", value: "8.2%" },
      satisfaction: { direction: "up", value: "0.1" },
      errorRate: { direction: "down", value: "0.3%" },
      cost: { direction: "down", value: "5%" },
    },
  },
  "90d": {
    totalCalls: 8420,
    avgSatisfaction: 4.4,
    errorRate: 1.8,
    tokenCost: 240,
    tokenUsage: 3500000,
    trends: {
      calls: { direction: "up", value: "22.1%" },
      satisfaction: { direction: "up", value: "0.5" },
      errorRate: { direction: "down", value: "1.2%" },
      cost: { direction: "up", value: "15%" },
    },
  },
};

export const mockCallVolumeData: Record<string, ChartDataPoint[]> = {
  "7d": [
    { date: "5/22", value: 72 },
    { date: "5/23", value: 68 },
    { date: "5/24", value: 85 },
    { date: "5/25", value: 78 },
    { date: "5/26", value: 92, isHighlight: true },
    { date: "5/27", value: 88 },
    { date: "5/28", value: 95 },
  ],
  "30d": [
    { date: "4/15", value: 40 },
    { date: "4/17", value: 55 },
    { date: "4/19", value: 48 },
    { date: "4/21", value: 62 },
    { date: "4/23", value: 50 },
    { date: "4/25", value: 68 },
    { date: "4/27", value: 75 },
    { date: "4/29", value: 60 },
    { date: "5/1", value: 80 },
    { date: "5/3", value: 72 },
    { date: "5/5", value: 85 },
    { date: "5/7", value: 78 },
    { date: "5/9", value: 92, isHighlight: true },
    { date: "5/11", value: 88 },
  ],
  "90d": [
    { date: "2/1", value: 35 },
    { date: "2/15", value: 42 },
    { date: "3/1", value: 58 },
    { date: "3/15", value: 72 },
    { date: "3/20", value: 65 },
    { date: "4/1", value: 80 },
    { date: "4/10", value: 68 },
    { date: "4/15", value: 75 },
    { date: "4/20", value: 90 },
    { date: "4/25", value: 82 },
    { date: "5/1", value: 95 },
    { date: "5/5", value: 88 },
    { date: "5/9", value: 102, isHighlight: true },
    { date: "5/11", value: 96 },
  ],
};

export const mockDistributionData: DistributionItem[] = [
  { name: "销售跟进助手", percentage: 35, color: "#4F46E5" },
  { name: "客户咨询应答", percentage: 25, color: "#10B981" },
  { name: "合同条款审查", percentage: 15, color: "#F59E0B" },
  { name: "录音转写 Agent", percentage: 12, color: "#3B82F6" },
  { name: "营销内容生成", percentage: 8, color: "#EF4444" },
  { name: "其他", percentage: 5, color: "#A1A1AA" },
];

export const mockPerformanceData: Record<string, AgentPerformanceRow[]> = {
  "7d": [
    {
      agentId: "sales-agent", agentName: "销售跟进助手", icon: "🏠", type: "销售辅助",
      version: "v2.1", orgName: "万科·翡翠天际", tenantId: "vanke", regionId: "south",
      status: "running", calls: 210, successRate: 97.8, avgLatency: "1.1s", rating: 4.7, tokenUsage: "12K",
    },
    {
      agentId: "chat-agent", agentName: "客户咨询应答", icon: "💬", type: "客户服务",
      version: "v3.1", orgName: "万科·中央公园", tenantId: "vanke", regionId: "east",
      status: "running", calls: 302, successRate: 96.5, avgLatency: "0.7s", rating: 4.4, tokenUsage: "16K",
    },
    {
      agentId: "content-gen", agentName: "营销内容生成", icon: "📝", type: "内容创作",
      version: "v1.5", orgName: "万科·翡翠天际", tenantId: "vanke", regionId: "south",
      status: "running", calls: 58, successRate: 99.1, avgLatency: "1.9s", rating: 4.8, tokenUsage: "7K",
    },
    {
      agentId: "poly-sales", agentName: "销售话术优化", icon: "🏠", type: "销售辅助",
      version: "v1.3", orgName: "保利·天悦", tenantId: "poly", regionId: "south",
      status: "running", calls: 75, successRate: 95.2, avgLatency: "1.6s", rating: 4.5, tokenUsage: "9K",
    },
    {
      agentId: "longfor-chat", agentName: "智能客服助手", icon: "💬", type: "客户服务",
      version: "v2.0", orgName: "龙湖·杭州天街", tenantId: "longfor", regionId: "east",
      status: "running", calls: 120, successRate: 97.0, avgLatency: "0.9s", rating: 4.6, tokenUsage: "8K",
    },
  ],
  "30d": [
    {
      agentId: "sales-agent", agentName: "销售跟进助手", icon: "🏠", type: "销售辅助",
      version: "v2.1", orgName: "万科·翡翠天际", tenantId: "vanke", regionId: "south",
      status: "running", calls: 893, successRate: 97.2, avgLatency: "1.2s", rating: 4.6, tokenUsage: "45K",
    },
    {
      agentId: "chat-agent", agentName: "客户咨询应答", icon: "💬", type: "客户服务",
      version: "v3.1", orgName: "万科·中央公园", tenantId: "vanke", regionId: "east",
      status: "running", calls: 1204, successRate: 96.5, avgLatency: "0.8s", rating: 4.3, tokenUsage: "62K",
    },
    {
      agentId: "content-gen", agentName: "营销内容生成", icon: "📝", type: "内容创作",
      version: "v1.5", orgName: "万科·翡翠天际", tenantId: "vanke", regionId: "south",
      status: "running", calls: 234, successRate: 98.1, avgLatency: "2.1s", rating: 4.7, tokenUsage: "28K",
    },
    {
      agentId: "audio-agent", agentName: "录音转写 Agent", icon: "🎙️", type: "知识管理",
      version: "v1.4", orgName: "万科·翡翠天际", tenantId: "vanke", regionId: "south",
      status: "running", calls: 512, successRate: 96.8, avgLatency: "3.5s", rating: 4.8, tokenUsage: "150K",
    },
    {
      agentId: "bgy-sales", agentName: "销售话术优化", icon: "🏠", type: "销售辅助",
      version: "v1.3", orgName: "碧桂园·佛山总部", tenantId: "bgy", regionId: "south",
      status: "running", calls: 289, successRate: 95.3, avgLatency: "1.8s", rating: 4.4, tokenUsage: "35K",
    },
    {
      agentId: "review-agent", agentName: "月度营销复盘", icon: "📅", type: "数据分析",
      version: "v1.0", orgName: "万科·翡翠天际", tenantId: "vanke", regionId: "south",
      status: "running", calls: 48, successRate: 96.5, avgLatency: "4.2s", rating: 4.4, tokenUsage: "80K",
    },
    {
      agentId: "poly-sales", agentName: "智能营销引擎", icon: "📝", type: "内容创作",
      version: "v2.3", orgName: "保利·天悦", tenantId: "poly", regionId: "south",
      status: "running", calls: 345, successRate: 97.5, avgLatency: "1.4s", rating: 4.6, tokenUsage: "42K",
    },
    {
      agentId: "longfor-chat", agentName: "智能客服助手", icon: "💬", type: "客户服务",
      version: "v2.0", orgName: "龙湖·杭州天街", tenantId: "longfor", regionId: "east",
      status: "running", calls: 567, successRate: 96.2, avgLatency: "0.9s", rating: 4.5, tokenUsage: "38K",
    },
    {
      agentId: "crland-monitor", agentName: "竞品情报监控", icon: "📊", type: "监控预警",
      version: "v1.2", orgName: "华润·北京置地广场", tenantId: "crland", regionId: "north",
      status: "pending", calls: null, successRate: null, avgLatency: null, rating: null, tokenUsage: null,
    },
  ],
  "90d": [
    {
      agentId: "sales-agent", agentName: "销售跟进助手", icon: "🏠", type: "销售辅助",
      version: "v2.1", orgName: "万科·翡翠天际", tenantId: "vanke", regionId: "south",
      status: "running", calls: 2680, successRate: 96.8, avgLatency: "1.3s", rating: 4.5, tokenUsage: "135K",
    },
    {
      agentId: "chat-agent", agentName: "客户咨询应答", icon: "💬", type: "客户服务",
      version: "v3.1", orgName: "万科·中央公园", tenantId: "vanke", regionId: "east",
      status: "running", calls: 3612, successRate: 95.8, avgLatency: "0.9s", rating: 4.2, tokenUsage: "186K",
    },
    {
      agentId: "audio-agent", agentName: "录音转写 Agent", icon: "🎙️", type: "知识管理",
      version: "v1.4", orgName: "万科·翡翠天际", tenantId: "vanke", regionId: "south",
      status: "running", calls: 1536, successRate: 96.2, avgLatency: "3.8s", rating: 4.7, tokenUsage: "450K",
    },
    {
      agentId: "bgy-sales", agentName: "销售话术优化", icon: "🏠", type: "销售辅助",
      version: "v1.3", orgName: "碧桂园·佛山总部", tenantId: "bgy", regionId: "south",
      status: "running", calls: 867, successRate: 94.8, avgLatency: "1.9s", rating: 4.3, tokenUsage: "105K",
    },
    {
      agentId: "content-gen", agentName: "营销内容生成", icon: "📝", type: "内容创作",
      version: "v1.5", orgName: "万科·翡翠天际", tenantId: "vanke", regionId: "south",
      status: "running", calls: 702, successRate: 97.5, avgLatency: "2.3s", rating: 4.6, tokenUsage: "84K",
    },
    {
      agentId: "poly-sales", agentName: "智能营销引擎", icon: "📝", type: "内容创作",
      version: "v2.3", orgName: "保利·天悦", tenantId: "poly", regionId: "south",
      status: "running", calls: 1035, successRate: 97.0, avgLatency: "1.5s", rating: 4.5, tokenUsage: "126K",
    },
    {
      agentId: "longfor-chat", agentName: "智能客服助手", icon: "💬", type: "客户服务",
      version: "v2.0", orgName: "龙湖·上海虹桥", tenantId: "longfor", regionId: "east",
      status: "running", calls: 1701, successRate: 95.5, avgLatency: "1.0s", rating: 4.4, tokenUsage: "114K",
    },
    {
      agentId: "review-agent", agentName: "月度营销复盘", icon: "📅", type: "数据分析",
      version: "v1.0", orgName: "华润·北京置地广场", tenantId: "crland", regionId: "north",
      status: "running", calls: 144, successRate: 95.8, avgLatency: "4.5s", rating: 4.3, tokenUsage: "240K",
    },
  ],
};

// ===== Ranking Data =====

export const mockTokenRankingByTenant: RankingItem[] = [
  { name: "万科集团", value: 38.5, icon: "🏢", subtitle: "5 个项目", subValue: "¥38.5万" },
  { name: "碧桂园控股", value: 24.2, icon: "🏗️", subtitle: "3 个项目", subValue: "¥24.2万" },
  { name: "保利发展", value: 18.7, icon: "🌆", subtitle: "4 个项目", subValue: "¥18.7万" },
  { name: "龙湖集团", value: 12.3, icon: "🏘️", subtitle: "3 个项目", subValue: "¥12.3万" },
  { name: "华润置地", value: 6.3, icon: "🏬", subtitle: "2 个项目", subValue: "¥6.3万" },
];

export const mockTokenRankingByOrg: RankingItem[] = [
  { name: "万科·翡翠天际", value: 18.3, icon: "🏢", subtitle: "万科集团", subValue: "¥18.3万" },
  { name: "碧桂园·佛山总部", value: 12.1, icon: "🏗️", subtitle: "碧桂园控股", subValue: "¥12.1万" },
  { name: "保利·天悦", value: 9.5, icon: "🌆", subtitle: "保利发展", subValue: "¥9.5万" },
  { name: "万科·金域滨江", value: 8.7, icon: "🏢", subtitle: "万科集团", subValue: "¥8.7万" },
  { name: "万科·中央公园", value: 5.8, icon: "🏢", subtitle: "万科集团", subValue: "¥5.8万" },
];

export const mockAgentCountByTenant: RankingItem[] = [
  { name: "万科集团", value: 12, icon: "🏢", subtitle: "已发布 8 个", subValue: "12" },
  { name: "保利发展", value: 10, icon: "🌆", subtitle: "已发布 7 个", subValue: "10" },
  { name: "碧桂园控股", value: 8, icon: "🏗️", subtitle: "已发布 5 个", subValue: "8" },
  { name: "龙湖集团", value: 6, icon: "🏘️", subtitle: "已发布 4 个", subValue: "6" },
  { name: "华润置地", value: 5, icon: "🏬", subtitle: "已发布 3 个", subValue: "5" },
];

export const mockAgentCountByOrg: RankingItem[] = [
  { name: "万科·翡翠天际", value: 7, icon: "🏢", subtitle: "万科集团", subValue: "7" },
  { name: "碧桂园·佛山总部", value: 5, icon: "🏗️", subtitle: "碧桂园控股", subValue: "5" },
  { name: "保利·天悦", value: 4, icon: "🌆", subtitle: "保利发展", subValue: "4" },
  { name: "万科·中央公园", value: 4, icon: "🏢", subtitle: "万科集团", subValue: "4" },
  { name: "碧桂园·东莞项目", value: 3, icon: "🏗️", subtitle: "碧桂园控股", subValue: "3" },
];
