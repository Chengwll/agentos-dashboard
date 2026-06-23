import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Topbar />
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#F4F4F5] dark:bg-[#09090B]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
