import { useState } from "react";
import { Search, X, Check, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tenant } from "@/types/organization";

interface TenantSwitcherProps {
  tenants: Tenant[];
  selectedTenant: Tenant | null;
  onSelect: (tenant: Tenant) => void;
  metaLabel?: string;
  metaCount?: number;
  orgSearch?: string;
  onOrgSearchChange?: (value: string) => void;
}

export function TenantSwitcher({
  tenants,
  selectedTenant,
  onSelect,
  metaLabel = "Agent",
  metaCount,
  orgSearch,
  onOrgSearchChange,
}: TenantSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = tenants.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative px-4 py-4 border-b border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B]">
      <div className="mb-4">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-sm font-semibold text-[#18181B] dark:text-[#FAFAFA] truncate">
            {selectedTenant?.name || "选择租户"}
          </span>
          <button
            onClick={() => setOpen(!open)}
            className="text-[11px] text-brand hover:text-brand-700 flex items-center gap-1 flex-shrink-0 transition-colors"
          >
            <ArrowLeftRight size={11} />
            切换
          </button>
        </div>
        <div className="text-[11px] text-[#A1A1AA]">
          共 <strong className="text-[#18181B] dark:text-[#FAFAFA]">{metaCount ?? selectedTenant?.agentCount ?? 0}</strong> 个{metaLabel}
          {selectedTenant && (
            <>
              <span className="mx-1.5 text-[#D1D1D6]">·</span>
              已发布 <strong className="text-[#18181B] dark:text-[#FAFAFA]">{selectedTenant.publishedCount}</strong> 个
            </>
          )}
        </div>
      </div>

      {onOrgSearchChange && (
        <div className="flex items-center gap-1.5 bg-[#F4F4F5] dark:bg-[#27272A] rounded-md px-2 py-1.5">
          <Search size={13} className="text-[#A1A1AA] flex-shrink-0" />
          <input
            placeholder="搜索组织"
            value={orgSearch ?? ""}
            onChange={(e) => onOrgSearchChange(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full text-[#18181B] dark:text-[#FAFAFA] placeholder:text-[#A1A1AA]"
          />
          {orgSearch && (
            <button
              onClick={() => onOrgSearchChange("")}
              className="text-[#A1A1AA] hover:text-[#52525B] flex-shrink-0"
            >
              <X size={13} />
            </button>
          )}
        </div>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-2 right-2 mt-1 bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-lg shadow-lg z-20 animate-scale-in">
          <div className="p-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
            <div className="flex items-center gap-1.5 bg-[#F4F4F5] dark:bg-[#27272A] rounded-md px-2 py-1.5">
              <Search className="w-3.5 h-3.5 text-[#A1A1AA]" />
              <input
                placeholder="搜索租户..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-xs w-full text-[#18181B] dark:text-[#FAFAFA] placeholder:text-[#A1A1AA]"
              />
            </div>
          </div>
          <div className="max-h-[200px] overflow-y-auto p-1">
            {filtered.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  onSelect(t);
                  setOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "flex items-center gap-2 px-2.5 py-2 rounded-md cursor-pointer text-[13px] transition-colors",
                  selectedTenant?.id === t.id
                    ? "bg-brand-50 dark:bg-brand-50/10"
                    : "hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
                )}
              >
                <span>{t.icon}</span>
                <span className="flex-1 text-[#18181B] dark:text-[#FAFAFA]">{t.name}</span>
                {selectedTenant?.id === t.id && (
                  <Check className="w-3.5 h-3.5 text-brand" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
