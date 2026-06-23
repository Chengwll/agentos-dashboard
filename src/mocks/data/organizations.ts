import type { Tenant, Region, OrgNode } from "@/types/organization";

export const mockTenants: Tenant[] = [
  { id: "vanke", name: "万科集团", icon: "🏢", agentCount: 12, publishedCount: 8 },
  { id: "bgy", name: "碧桂园控股", icon: "🏗️", agentCount: 8, publishedCount: 5 },
  { id: "longfor", name: "龙湖集团", icon: "🏘️", agentCount: 6, publishedCount: 4 },
  { id: "poly", name: "保利发展", icon: "🌆", agentCount: 10, publishedCount: 7 },
  { id: "crland", name: "华润置地", icon: "🏬", agentCount: 5, publishedCount: 3 },
];

export const mockOrgNodes: OrgNode[] = [
  // 华南区域 - 万科
  { id: "feicuixiaji", name: "万科·翡翠天际", agentCount: 7, regionId: "south", tenantId: "vanke" },
  { id: "jinyubinjiang", name: "万科·金域滨江", agentCount: 3, regionId: "south", tenantId: "vanke" },
  // 华东区域 - 万科
  { id: "zhongyanggongyuan", name: "万科·中央公园", agentCount: 4, regionId: "east", tenantId: "vanke" },
  { id: "tiankongzhicheng", name: "万科·天空之城", agentCount: 2, regionId: "east", tenantId: "vanke" },
  // 华北区域 - 万科
  { id: "beijingyihao", name: "万科·北京壹号", agentCount: 3, regionId: "north", tenantId: "vanke" },
  // 华南区域 - 碧桂园
  { id: "bgy-foshan", name: "碧桂园·佛山总部", agentCount: 5, regionId: "south", tenantId: "bgy" },
  { id: "bgy-dongguan", name: "碧桂园·东莞项目", agentCount: 3, regionId: "south", tenantId: "bgy" },
  // 华东区域 - 碧桂园
  { id: "bgy-shanghai", name: "碧桂园·上海中心", agentCount: 3, regionId: "east", tenantId: "bgy" },
  // 华南区域 - 保利
  { id: "poly-tianyue", name: "保利·天悦", agentCount: 4, regionId: "south", tenantId: "poly" },
  { id: "poly-tianhui", name: "保利·天汇", agentCount: 3, regionId: "south", tenantId: "poly" },
  // 华北区域 - 保利
  { id: "poly-beijing", name: "保利·北京中心", agentCount: 3, regionId: "north", tenantId: "poly" },
  // 华东区域 - 龙湖
  { id: "longfor-hangzhou", name: "龙湖·杭州天街", agentCount: 3, regionId: "east", tenantId: "longfor" },
  { id: "longfor-shanghai", name: "龙湖·上海虹桥", agentCount: 3, regionId: "east", tenantId: "longfor" },
  // 华北区域 - 华润
  { id: "crland-beijing", name: "华润·北京置地广场", agentCount: 3, regionId: "north", tenantId: "crland" },
  { id: "crland-tianjin", name: "华润·天津万象城", agentCount: 2, regionId: "north", tenantId: "crland" },
];

export const mockRegions: Region[] = [
  {
    id: "south",
    name: "华南区域",
    orgs: mockOrgNodes.filter((n) => n.regionId === "south"),
  },
  {
    id: "east",
    name: "华东区域",
    orgs: mockOrgNodes.filter((n) => n.regionId === "east"),
  },
  {
    id: "north",
    name: "华北区域",
    orgs: mockOrgNodes.filter((n) => n.regionId === "north"),
  },
];
