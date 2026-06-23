import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, X } from "lucide-react";
import { mockTenants, mockOrgNodes } from "@/mocks/data/organizations";
import { regionLabels } from "@/config/constants";

export interface FilterSelection {
  tenantId: string;
  regionId: string;
  orgId: string;
  orgName: string;
}

interface CascadingFilterProps {
  value: FilterSelection;
  onChange: (value: FilterSelection) => void;
}

export function CascadingFilter({ value, onChange }: CascadingFilterProps) {
  const [open, setOpen] = useState(false);
  const [activeCol, setActiveCol] = useState<0 | 1 | 2>(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          setOpen(false);
          triggerRef.current?.focus();
          break;
        case "ArrowRight":
          e.preventDefault();
          setActiveCol((prev) => Math.min(2, prev + 1) as 0 | 1 | 2);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setActiveCol((prev) => Math.max(0, prev - 1) as 0 | 1 | 2);
          break;
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Cascade: regions available for selected tenant
  const regions = useMemo(() => {
    const ids = new Set(
      mockOrgNodes
        .filter((o) => !value.tenantId || o.tenantId === value.tenantId)
        .map((o) => o.regionId)
    );
    return Array.from(ids).map((id) => ({ id, name: regionLabels[id] || id }));
  }, [value.tenantId]);

  // Cascade: orgs available for selected tenant + region
  const orgs = useMemo(() => {
    return mockOrgNodes.filter(
      (o) =>
        (!value.tenantId || o.tenantId === value.tenantId) &&
        (!value.regionId || o.regionId === value.regionId)
    );
  }, [value.tenantId, value.regionId]);

  // Display label
  const tenantName = value.tenantId
    ? mockTenants.find((t) => t.id === value.tenantId)?.name
    : null;
  const regionName = value.regionId
    ? regionLabels[value.regionId] || value.regionId
    : null;
  const projectName = value.orgName || null;

  const displayParts = [tenantName, regionName, projectName].filter(Boolean);
  const displayLabel = displayParts.length > 0 ? displayParts.join(" / ") : "全部";

  const hasFilter = value.tenantId || value.regionId || value.orgId;

  const handleReset = useCallback(() => {
    onChange({ tenantId: "", regionId: "", orgId: "", orgName: "" });
    setOpen(false);
  }, [onChange]);

  const listItemCls =
    "text-[12px] px-2.5 py-1.5 cursor-pointer rounded-md transition-colors whitespace-nowrap";
  const itemActive = "bg-brand text-white font-medium";
  const itemHover = "hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]";
  const itemMuted = "text-[#A1A1AA]";

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex items-center gap-1.5 text-[12.5px] px-3 py-1.5 rounded-lg border transition-colors ${
          hasFilter
            ? "border-brand bg-brand-50 dark:bg-brand-50/10 text-brand font-medium"
            : "border-[#D1D1D6] dark:border-[#3F3F46] text-[#52525B] dark:text-[#A1A1AA]"
        } hover:border-brand`}
      >
        <span className="max-w-[180px] truncate">{displayLabel}</span>
        {hasFilter && (
          <X
            className="w-3.5 h-3.5 flex-shrink-0 hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            aria-label="清除筛选"
          />
        )}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl shadow-lg flex overflow-hidden animate-scale-in"
          role="menu"
        >
          {/* Column 1: Tenant */}
          <div className="w-[160px] border-r border-[#E4E4E7] dark:border-[#27272A] flex flex-col">
            <div className="text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-wider px-3 py-2.5 border-b border-[#E4E4E7] dark:border-[#27272A]">
              租户
            </div>
            <div
              ref={(el) => { colRefs.current[0] = el; }}
              className="flex-1 overflow-y-auto p-1.5 max-h-[260px]"
            >
              <div
                role="menuitem"
                tabIndex={0}
                onClick={() => {
                  onChange({ tenantId: "", regionId: "", orgId: "", orgName: "" });
                }}
                className={`${listItemCls} ${!value.tenantId ? itemActive : itemMuted + " " + itemHover}`}
              >
                全部租户
              </div>
              {mockTenants.map((t) => (
                <div
                  key={t.id}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => {
                    onChange({ tenantId: t.id, regionId: "", orgId: "", orgName: "" });
                  }}
                  className={`${listItemCls} ${
                    value.tenantId === t.id ? itemActive : "text-[#52525B] dark:text-[#A1A1AA] " + itemHover
                  }`}
                >
                  <span className="mr-1.5">{t.icon}</span>
                  {t.name}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Region */}
          <div className="w-[150px] border-r border-[#E4E4E7] dark:border-[#27272A] flex flex-col">
            <div className="text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-wider px-3 py-2.5 border-b border-[#E4E4E7] dark:border-[#27272A]">
              区域
            </div>
            <div
              ref={(el) => { colRefs.current[1] = el; }}
              className="flex-1 overflow-y-auto p-1.5 max-h-[260px]"
            >
              <div
                role="menuitem"
                tabIndex={0}
                onClick={() => {
                  onChange({ ...value, regionId: "", orgId: "", orgName: "" });
                }}
                className={`${listItemCls} ${!value.regionId ? itemActive : itemMuted + " " + itemHover}`}
              >
                全部区域
              </div>
              {regions.map((r) => (
                <div
                  key={r.id}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => {
                    onChange({ ...value, regionId: r.id, orgId: "", orgName: "" });
                  }}
                  className={`${listItemCls} ${
                    value.regionId === r.id ? itemActive : "text-[#52525B] dark:text-[#A1A1AA] " + itemHover
                  }`}
                >
                  {r.name}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Project */}
          <div className="w-[180px] flex flex-col">
            <div className="text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-wider px-3 py-2.5 border-b border-[#E4E4E7] dark:border-[#27272A]">
              项目
            </div>
            <div
              ref={(el) => { colRefs.current[2] = el; }}
              className="flex-1 overflow-y-auto p-1.5 max-h-[260px]"
            >
              <div
                role="menuitem"
                tabIndex={0}
                onClick={() => {
                  onChange({ ...value, orgId: "", orgName: "" });
                }}
                className={`${listItemCls} ${!value.orgId ? itemActive : itemMuted + " " + itemHover}`}
              >
                全部项目
              </div>
              {orgs.map((o) => (
                <div
                  key={o.id}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => {
                    onChange({ ...value, orgId: o.id, orgName: o.name });
                    setOpen(false);
                  }}
                  className={`${listItemCls} ${
                    value.orgId === o.id ? itemActive : "text-[#52525B] dark:text-[#A1A1AA] " + itemHover
                  }`}
                >
                  {o.name}
                </div>
              ))}
              {orgs.length === 0 && (
                <div className="text-[12px] text-[#A1A1AA] px-2.5 py-3 text-center">
                  暂无项目
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
