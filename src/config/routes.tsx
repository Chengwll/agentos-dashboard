import { lazy, Suspense } from "react";
import { createHashRouter, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";

const DashboardPage = lazy(() => import("@/features/dashboard"));
const AgentManagementPage = lazy(() => import("@/features/agent-management"));
const KnowledgeManagementPage = lazy(() => import("@/features/knowledge-management"));
const SkillManagementPage = lazy(() => import("@/features/skill-management"));
const AgentMarketPage = lazy(() => import("@/features/agent-market"));
const SkillMarketPage = lazy(() => import("@/features/skill-market"));
const CollaborationPage = lazy(() => import("@/features/collaboration"));
const SettingsPage = lazy(() => import("@/features/settings"));

function LazyPage({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-muted-foreground">加载中...</div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export const router = createHashRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: "dashboard",
        element: <LazyPage><DashboardPage /></LazyPage>,
      },
      {
        path: "agents",
        element: <LazyPage><AgentManagementPage /></LazyPage>,
      },
      {
        path: "skills",
        element: <LazyPage><SkillManagementPage /></LazyPage>,
      },
      {
        path: "knowledge",
        element: <LazyPage><KnowledgeManagementPage /></LazyPage>,
      },
      {
        path: "market/agents",
        element: <LazyPage><AgentMarketPage /></LazyPage>,
      },
      {
        path: "market/skills",
        element: <LazyPage><SkillMarketPage /></LazyPage>,
      },
      {
        path: "collaboration",
        element: <LazyPage><CollaborationPage /></LazyPage>,
      },
      {
        path: "settings",
        element: <LazyPage><SettingsPage /></LazyPage>,
      },
    ],
  },
]);
