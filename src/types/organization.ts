export interface Tenant {
  id: string;
  name: string;
  icon: string;
  agentCount: number;
  publishedCount: number;
}

export interface Region {
  id: string;
  name: string;
  orgs: OrgNode[];
}

export interface OrgNode {
  id: string;
  name: string;
  agentCount: number;
  regionId: string;
  tenantId: string;
}
