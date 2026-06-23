import { mockTenants, mockOrgNodes, mockRegions } from "./data/organizations";
import {
  mockDashboardMetrics,
  mockCallVolumeData,
  mockDistributionData,
  mockPerformanceData,
} from "./data/dashboard";
import { mockAgents } from "./data/agents";
import { mockKnowledgeFiles, mockCategories } from "./data/knowledge";
import {
  mockTokenRankingByTenant,
  mockTokenRankingByOrg,
  mockAgentCountByTenant,
  mockAgentCountByOrg,
} from "./data/dashboard";

type Handler = (url: URL, init?: RequestInit) => Promise<Response | null>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

const API_BASE = "/api";

const handlers: Record<string, Record<string, Handler>> = {
  GET: {
    [`${API_BASE}/dashboard/metrics`]: async (url) => {
      await delay(300);
      const timeRange = url.searchParams.get("timeRange") || "30d";
      return json(mockDashboardMetrics[timeRange] || mockDashboardMetrics["30d"]);
    },
    [`${API_BASE}/tenants`]: async () => {
      await delay(200);
      return json(mockTenants);
    },
  },
};

function matchStatic(method: string, pathname: string): Handler | null {
  const map = handlers[method];
  if (!map) return null;
  if (map[pathname]) return map[pathname];
  return null;
}

// Dynamic route matching for paths like /api/tenants/:id/organizations, /api/agents/:id, etc.
function matchDynamic(method: string, pathname: string): Handler | null {
  if (method !== "GET" && method !== "PUT" && method !== "DELETE" && method !== "POST") return null;

  // /api/dashboard/call-volume?timeRange=30d
  if (pathname === "/api/dashboard/call-volume" && method === "GET") {
    return async (url) => {
      await delay(300);
      const timeRange = url.searchParams.get("timeRange") || "30d";
      return json(mockCallVolumeData[timeRange] || mockCallVolumeData["30d"]);
    };
  }

  // /api/dashboard/agent-distribution?timeRange=30d
  if (pathname === "/api/dashboard/agent-distribution" && method === "GET") {
    return async (url) => {
      await delay(250);
      const timeRange = url.searchParams.get("timeRange") || "30d";
      return json(mockDistributionData);
    };
  }

  // /api/dashboard/agent-performance?timeRange=30d
  if (pathname === "/api/dashboard/agent-performance" && method === "GET") {
    return async (url) => {
      await delay(350);
      const timeRange = url.searchParams.get("timeRange") || "30d";
      return json(mockPerformanceData[timeRange] || mockPerformanceData["30d"]);
    };
  }

  // /api/dashboard/token-ranking/:dimension
  const tokenRankingMatch = pathname.match(/^\/api\/dashboard\/token-ranking\/(tenant|org)$/);
  if (tokenRankingMatch && method === "GET") {
    return async (url) => {
      await delay(250);
      const dimension = tokenRankingMatch[1];
      const tenantId = url.searchParams.get("tenantId");
      const regionId = url.searchParams.get("regionId");

      let data = dimension === "tenant" ? [...mockTokenRankingByTenant] : [...mockTokenRankingByOrg];

      if (tenantId && dimension === "org") {
        const tenantOrgs = mockOrgNodes.filter((o) => o.tenantId === tenantId).map((o) => o.name);
        data = data.filter((item) => tenantOrgs.includes(item.name));
      }
      if (regionId && dimension === "org") {
        const regionOrgs = mockOrgNodes.filter((o) => o.regionId === regionId).map((o) => o.name);
        data = data.filter((item) => regionOrgs.includes(item.name));
      }

      return json(data);
    };
  }

  // /api/dashboard/agent-count/:dimension
  const agentCountMatch = pathname.match(/^\/api\/dashboard\/agent-count\/(tenant|org)$/);
  if (agentCountMatch && method === "GET") {
    return async (url) => {
      await delay(250);
      const dimension = agentCountMatch[1];
      const tenantId = url.searchParams.get("tenantId");
      const regionId = url.searchParams.get("regionId");

      let data = dimension === "tenant" ? [...mockAgentCountByTenant] : [...mockAgentCountByOrg];

      if (tenantId && dimension === "org") {
        const tenantOrgs = mockOrgNodes.filter((o) => o.tenantId === tenantId).map((o) => o.name);
        data = data.filter((item) => tenantOrgs.includes(item.name));
      }
      if (regionId && dimension === "org") {
        const regionOrgs = mockOrgNodes.filter((o) => o.regionId === regionId).map((o) => o.name);
        data = data.filter((item) => regionOrgs.includes(item.name));
      }

      return json(data);
    };
  }

  // /api/tenants/:tenantId/organizations
  const tenantsOrgMatch = pathname.match(/^\/api\/tenants\/([^/]+)\/organizations$/);
  if (tenantsOrgMatch && method === "GET") {
    return async (_url, _init) => {
      await delay(200);
      const tenantId = tenantsOrgMatch[1];
      const orgs = mockOrgNodes.filter((o) => o.tenantId === tenantId);
      const regions = mockRegions
        .map((region) => ({
          ...region,
          orgs: region.orgs.filter((o) => o.tenantId === tenantId),
        }))
        .filter((region) => region.orgs.length > 0);
      return json({ orgs, regions });
    };
  }

  // /api/agents (list)
  if (pathname === "/api/agents" && method === "GET") {
    return async (url) => {
      await delay(300);
      const tenantId = url.searchParams.get("tenantId");
      const orgId = url.searchParams.get("orgId");
      const status = url.searchParams.get("status");

      let agents = [...mockAgents];
      if (tenantId) agents = agents.filter((a) => a.tenantId === tenantId);
      if (orgId) agents = agents.filter((a) => a.orgId === orgId);
      if (status && status !== "all")
        agents = agents.filter((a) => a.status === status);

      return json(agents);
    };
  }

  // /api/agents/:agentId
  const agentDetailMatch = pathname.match(/^\/api\/agents\/([^/]+)$/);
  if (agentDetailMatch) {
    const agentId = agentDetailMatch[1];
    if (method === "GET") {
      return async () => {
        await delay(200);
        const agent = mockAgents.find((a) => a.id === agentId);
        if (!agent) return json(null, 404);
        return json(agent);
      };
    }
    if (method === "PUT") {
      return async (_url, init) => {
        await delay(400);
        const body = init?.body ? JSON.parse(init.body as string) : {};
        const index = mockAgents.findIndex((a) => a.id === agentId);
        if (index >= 0) {
          mockAgents[index] = {
            ...mockAgents[index],
            ...body,
            lastEdited: new Date().toISOString().split("T")[0],
          };
          return json(mockAgents[index]);
        }
        return json(null, 404);
      };
    }
  }

  // /api/knowledge/categories/:orgId
  const categoriesMatch = pathname.match(/^\/api\/knowledge\/categories\/([^/]+)$/);
  if (categoriesMatch && method === "GET") {
    return async () => {
      await delay(200);
      return json(mockCategories);
    };
  }

  // /api/knowledge/files/:fileId
  const fileDetailMatch = pathname.match(/^\/api\/knowledge\/files\/([^/]+)$/);
  if (fileDetailMatch && method === "GET") {
    return async () => {
      await delay(200);
      const file = mockKnowledgeFiles.find((f) => f.id === fileDetailMatch[1]);
      if (!file) return json(null, 404);
      return json(file);
    };
  }

  if (fileDetailMatch && method === "DELETE") {
    return async () => {
      await delay(300);
      return json({ success: true });
    };
  }

  // /api/knowledge/files (list)
  if (pathname === "/api/knowledge/files" && method === "GET") {
    return async (url) => {
      await delay(300);
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

      return json(files);
    };
  }

  // Batch operations
  if (pathname === "/api/knowledge/files/batch/revectorize" && method === "POST") {
    return async () => {
      await delay(500);
      return json({ success: true });
    };
  }

  if (pathname === "/api/knowledge/files/batch/delete" && method === "POST") {
    return async () => {
      await delay(500);
      return json({ success: true });
    };
  }

  return null;
}

export function setupMocks() {
  const originalFetch = window.fetch;

  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
    const urlStr = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const url = new URL(urlStr, window.location.origin);
    const method = init?.method || "GET";

    // Only intercept API calls to our own origin
    if (url.origin !== window.location.origin || !url.pathname.startsWith(API_BASE)) {
      return originalFetch(input, init);
    }

    const handler = matchStatic(method, url.pathname) || matchDynamic(method, url.pathname);
    if (handler) {
      try {
        const response = await handler(url, init);
        if (response) return response;
      } catch (err) {
        console.error("[Mock] Handler error:", err);
      }
    }

    // Pass through to real fetch if no handler matches
    return originalFetch(input, init);
  };

  console.log("[Mock] API mocking enabled (fetch override)");
}
