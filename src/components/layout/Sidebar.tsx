import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/config/navigation";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.replace(/^\//, "") || "dashboard";

  const handleNavClick = (view: string) => {
    navigate(`/${view}`);
  };

  return (
    <aside className="w-[220px] min-w-[220px] bg-sidebar-bg flex flex-col border-r border-sidebar-border z-10">
      {/* Logo */}
      <div className="px-4 py-[18px] border-b border-sidebar-border flex items-center gap-2.5">
        <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-base font-bold text-white flex-shrink-0">
          A
        </div>
        <div>
          <div className="text-[15px] font-semibold text-[#FAFAFA] leading-tight">
            AgentOS
          </div>
          <div className="text-[11px] text-sidebar-text leading-none">
            明源云智能体平台
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2.5 px-2">
        {navigationItems.map((section) => (
          <div key={section.label} className="mb-5">
            <div className="text-[10px] font-semibold tracking-wider text-[#52525B] uppercase px-2 pb-1.5">
              {section.label}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={cn(
                    "w-full flex items-center gap-2 px-2 py-[7px] rounded-[6px] text-[13.5px] transition-all duration-150 mb-px relative text-left",
                    isActive
                      ? "bg-sidebar-active text-sidebar-text-active"
                      : "text-sidebar-text hover:bg-sidebar-hover hover:text-[#E4E4E7]"
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-brand-300 rounded-r-[2px]" />
                  )}
                  <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-brand text-white text-[10px] font-semibold px-1.5 py-px rounded-[10px]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-2 py-2.5 pb-3 border-t border-sidebar-border flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
          李
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] text-[#E4E4E7] truncate">李明远</div>
          <div className="text-[11px] text-sidebar-text">业务顾问</div>
        </div>
      </div>
    </aside>
  );
}
