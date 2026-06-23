import { http, HttpResponse, delay } from "msw";
import { mockTenants, mockOrgNodes, mockRegions } from "../data/organizations";
import { mockAgents } from "../data/agents";
import {
  mockDashboardMetrics,
  mockCallVolumeData,
  mockDistributionData,
  mockPerformanceData,
} from "../data/dashboard";
import { mockKnowledgeFiles, mockCategories } from "../data/knowledge";
import {
  mockTokenRankingByTenant,
  mockTokenRankingByOrg,
  mockAgentCountByTenant,
  mockAgentCountByOrg,
} from "../data/dashboard";

const API_BASE = "/api";

export const handlers = [
  // ===== Dashboard =====
  http.get(`${API_BASE}/dashboard/metrics`, async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const timeRange = url.searchParams.get("timeRange") || "30d";
    return HttpResponse.json(
      mockDashboardMetrics[timeRange] || mockDashboardMetrics["30d"]
    );
  }),

  http.get(`${API_BASE}/dashboard/call-volume`, async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const timeRange = url.searchParams.get("timeRange") || "30d";
    return HttpResponse.json(mockCallVolumeData[timeRange] || mockCallVolumeData["30d"]);
  }),

  http.get(`${API_BASE}/dashboard/agent-distribution`, async ({ request }) => {
    await delay(250);
    return HttpResponse.json(mockDistributionData);
  }),

  http.get(`${API_BASE}/dashboard/agent-performance`, async ({ request }) => {
    await delay(350);
    const url = new URL(request.url);
    const timeRange = url.searchParams.get("timeRange") || "30d";
    return HttpResponse.json(mockPerformanceData[timeRange] || mockPerformanceData["30d"]);
  }),

  // ===== Rankings =====
  http.get(`${API_BASE}/dashboard/token-ranking/tenant`, async () => {
    await delay(250);
    return HttpResponse.json(mockTokenRankingByTenant);
  }),

  http.get(`${API_BASE}/dashboard/token-ranking/org`, async ({ request }) => {
    await delay(250);
    const url = new URL(request.url);
    const tenantId = url.searchParams.get("tenantId");
    const regionId = url.searchParams.get("regionId");

    let data = [...mockTokenRankingByOrg];
    if (tenantId) {
      const tenantOrgs = mockOrgNodes.filter((o) => o.tenantId === tenantId).map((o) => o.name);
      data = data.filter((item) => tenantOrgs.includes(item.name));
    }
    if (regionId) {
      const regionOrgs = mockOrgNodes.filter((o) => o.regionId === regionId).map((o) => o.name);
      data = data.filter((item) => regionOrgs.includes(item.name));
    }

    return HttpResponse.json(data);
  }),

  http.get(`${API_BASE}/dashboard/agent-count/tenant`, async () => {
    await delay(250);
    return HttpResponse.json(mockAgentCountByTenant);
  }),

  http.get(`${API_BASE}/dashboard/agent-count/org`, async ({ request }) => {
    await delay(250);
    const url = new URL(request.url);
    const tenantId = url.searchParams.get("tenantId");
    const regionId = url.searchParams.get("regionId");

    let data = [...mockAgentCountByOrg];
    if (tenantId) {
      const tenantOrgs = mockOrgNodes.filter((o) => o.tenantId === tenantId).map((o) => o.name);
      data = data.filter((item) => tenantOrgs.includes(item.name));
    }
    if (regionId) {
      const regionOrgs = mockOrgNodes.filter((o) => o.regionId === regionId).map((o) => o.name);
      data = data.filter((item) => regionOrgs.includes(item.name));
    }

    return HttpResponse.json(data);
  }),

  // ===== Tenants =====
  http.get(`${API_BASE}/tenants`, async () => {
    await delay(200);
    return HttpResponse.json(mockTenants);
  }),

  // ===== Organizations =====
  http.get(`${API_BASE}/tenants/:tenantId/organizations`, async ({ params }) => {
    await delay(200);
    const { tenantId } = params;
    const orgs = mockOrgNodes.filter((o) => o.tenantId === tenantId);
    const regions = mockRegions
      .map((region) => ({
        ...region,
        orgs: region.orgs.filter((o) => o.tenantId === tenantId),
      }))
      .filter((region) => region.orgs.length > 0);
    return HttpResponse.json({ orgs, regions });
  }),

  // ===== Agents =====
  http.get(`${API_BASE}/agents`, async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const tenantId = url.searchParams.get("tenantId");
    const orgId = url.searchParams.get("orgId");
    const status = url.searchParams.get("status");

    let agents = [...mockAgents];
    if (tenantId) agents = agents.filter((a) => a.tenantId === tenantId);
    if (orgId) agents = agents.filter((a) => a.orgId === orgId);
    if (status && status !== "all")
      agents = agents.filter((a) => a.status === status);

    return HttpResponse.json(agents);
  }),

  http.get(`${API_BASE}/agents/:agentId`, async ({ params }) => {
    await delay(200);
    const agent = mockAgents.find((a) => a.id === params.agentId);
    if (!agent) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(agent);
  }),

  http.put(`${API_BASE}/agents/:agentId`, async ({ params, request }) => {
    await delay(400);
    const body = await request.json();
    const index = mockAgents.findIndex((a) => a.id === params.agentId);
    if (index >= 0) {
      mockAgents[index] = {
        ...mockAgents[index],
        ...(body as object),
        lastEdited: new Date().toISOString().split("T")[0],
      };
      return HttpResponse.json(mockAgents[index]);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // ===== Knowledge =====
  http.get(`${API_BASE}/knowledge/categories/:orgId`, async () => {
    await delay(200);
    return HttpResponse.json(mockCategories);
  }),

  http.get(`${API_BASE}/knowledge/files`, async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    let files = [...mockKnowledgeFiles];
    const orgId = url.searchParams.get("orgId");
    const category = url.searchParams.get("category");
    const type = url.searchParams.get("type");
    const search = url.searchParams.get("search");

    if (orgId) files = files.filter((f) => f.orgId === orgId);
    if (category) files = files.filter((f) => f.category === category);
    if (type && type !== "all") files = files.filter((f) => f.type === type);
    if (search)
      files = files.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
      );

    return HttpResponse.json(files);
  }),

  http.get(`${API_BASE}/knowledge/files/:fileId`, async ({ params }) => {
    await delay(200);
    const file = mockKnowledgeFiles.find((f) => f.id === params.fileId);
    if (!file) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(file);
  }),

  http.delete(`${API_BASE}/knowledge/files/:fileId`, async () => {
    await delay(300);
    return HttpResponse.json({ success: true });
  }),

  http.post(`${API_BASE}/knowledge/files/batch/revectorize`, async () => {
    await delay(500);
    return HttpResponse.json({ success: true });
  }),

  http.post(`${API_BASE}/knowledge/files/batch/delete`, async () => {
    await delay(500);
    return HttpResponse.json({ success: true });
  }),
];
