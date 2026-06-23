import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, Star, Settings, Trash2, Edit3, X,
  Puzzle, Zap, Clock, Wrench
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──
interface Skill {
  id: string;
  name: string;
  icon: string;
  iconBg: string;
  status: "已启用" | "待配置";
  desc: string;
  rating: number;
  calls: string;
  version: string;
  date: string;
  type: "我添加的" | "我创建的";
  cat: string;
  roles: string[];
  scenes: string[];
  value: string;
  primaryAction: string;
  secondaryAction: string;
}

// ── Mock Data ──
const skills: Skill[] = [
  {
    id: "web-search", name: "网络搜索", icon: "🔍", iconBg: "#EEF2FF",
    status: "已启用", desc: "调用搜索引擎实时获取网页信息，支持 Bing / Google，可指定结果数量。",
    rating: 4.8, calls: "1,240", version: "v1.2.0", date: "2026-04-15",
    type: "我添加的", cat: "数据工具",
    roles: ["销售顾问", "客服Agent"],
    scenes: ["客户咨询", "市场调研", "竞品分析"],
    value: "实时获取最新信息，避免知识库滞后",
    primaryAction: "配置", secondaryAction: "卸载"
  },
  {
    id: "mingyuan-query", name: "明源数据查询", icon: "📊", iconBg: "#ECFDF5",
    status: "已启用", desc: "调用明源 ERP 接口查询来访、认购、网签等销售数据，支持按项目/时间段筛选。",
    rating: 4.9, calls: "2,051", version: "v2.1.0", date: "2026-03-20",
    type: "我添加的", cat: "数据工具",
    roles: ["销售主管", "数据分析师"],
    scenes: ["销售日报", "业绩统计", "客户分析"],
    value: "直接对接 ERP，无需手动导出数据",
    primaryAction: "配置", secondaryAction: "卸载"
  },
  {
    id: "wecom-push", name: "企微消息推送", icon: "📨", iconBg: "#FEF3C7",
    status: "已启用", desc: "向指定企业微信用户或群组发送消息通知，支持文本/Markdown/卡片消息格式。",
    rating: 4.6, calls: "893", version: "v1.0.5", date: "2026-02-08",
    type: "我添加的", cat: "通知推送",
    roles: ["运营人员", "销售顾问"],
    scenes: ["日报推送", "预警通知", "任务提醒"],
    value: "打通企微生态，实现消息闭环",
    primaryAction: "配置", secondaryAction: "卸载"
  },
  {
    id: "asr", name: "语音转文字", icon: "🎙️", iconBg: "#F3F4F6",
    status: "已启用", desc: "调用 ASR 服务将录音文件转写为文本，支持普通话/粤语，最大文件 200MB，时长不限。",
    rating: 4.5, calls: "512", version: "v1.1.0", date: "2026-01-22",
    type: "我添加的", cat: "AI 能力",
    roles: ["客服Agent", "销售顾问"],
    scenes: ["通话记录", "语音留言", "会议记录"],
    value: "自动转写语音，释放人工听录成本",
    primaryAction: "配置", secondaryAction: "卸载"
  },
  {
    id: "web-scrape", name: "网页爬取", icon: "🌐", iconBg: "#FDF2F8",
    status: "已启用", desc: "读取指定 URL 的页面内容，自动过滤广告和导航元素，返回结构化正文，适合竞品监控场景。",
    rating: 4.3, calls: "178", version: "v1.0.0", date: "2025-12-10",
    type: "我添加的", cat: "AI 能力",
    roles: ["市场专员", "数据分析师"],
    scenes: ["竞品监控", "价格追踪", "舆情监测"],
    value: "自动化信息采集，替代人工浏览",
    primaryAction: "配置", secondaryAction: "卸载"
  },
  {
    id: "contract-fill", name: "合同模板填充", icon: "📋", iconBg: "#F4F4F5",
    status: "待配置", desc: "自动将客户信息填入认购合同 Word 模板，生成可编辑 .docx 文件，需上传合同模板后生效。",
    rating: 4.0, calls: "0", version: "v0.9.0", date: "2026-05-01",
    type: "我添加的", cat: "内容生成",
    roles: ["销售顾问", "法务人员"],
    scenes: ["合同生成", "认购流程", "签约准备"],
    value: "减少人工填写错误，提升签约效率",
    primaryAction: "立即配置", secondaryAction: "卸载"
  },
  {
    id: "price-extract", name: "竞品价格提取", icon: "🔑", iconBg: "#EEF2FF",
    status: "已启用", desc: "针对万科·翡翠天际主要竞品页面的价格 CSS 选择器做了定制适配，精准提取价格信息。",
    rating: 4.7, calls: "67", version: "v1.0.0", date: "2026-04-28",
    type: "我创建的", cat: "数据工具",
    roles: ["市场专员", "销售主管"],
    scenes: ["竞品监控", "定价策略", "市场调研"],
    value: "定制化价格监控，精准锁定竞品动态",
    primaryAction: "编辑", secondaryAction: "删除"
  },
  {
    id: "customer-profile", name: "区域客户画像", icon: "👤", iconBg: "#ECFDF5",
    status: "已启用", desc: "聚合明源来访、企微会话、渠道带看等多源数据，生成区域级客户画像报告。",
    rating: 4.6, calls: "34", version: "v1.2.0", date: "2026-05-10",
    type: "我创建的", cat: "数据工具",
    roles: ["数据分析师", "营销经理"],
    scenes: ["客户分析", "精准营销", "区域策略"],
    value: "多源数据融合，360° 客户洞察",
    primaryAction: "编辑", secondaryAction: "删除"
  },
  {
    id: "daily-report", name: "来访日报自动生成", icon: "📑", iconBg: "#FEF3C7",
    status: "已启用", desc: "每日 18:00 自动汇总案场来访数据，生成结构化日报并通过企微推送给销售负责人。",
    rating: 4.8, calls: "128", version: "v2.0.0", date: "2026-05-05",
    type: "我创建的", cat: "内容生成",
    roles: ["销售主管", "案场经理"],
    scenes: ["日报生成", "数据汇总", "自动推送"],
    value: "自动化日报，解放人工统计时间",
    primaryAction: "编辑", secondaryAction: "删除"
  },
];

const categories = [
  { key: "all", label: "全部" },
  { key: "数据工具", label: "数据工具" },
  { key: "AI 能力", label: "AI 能力" },
  { key: "通知推送", label: "通知推送" },
  { key: "内容生成", label: "内容生成" },
];

type TabKey = "added" | "created";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = i <= Math.floor(rating) ? "#F59E0B" : i === Math.ceil(rating) && rating % 1 > 0 ? "url(#half)" : "#E4E4E7";
        return (
          <svg key={i} width="12" height="12" viewBox="0 0 24 24">
            {i === Math.ceil(rating) && rating % 1 > 0 ? (
              <>
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#E4E4E7" />
                  </linearGradient>
                </defs>
                <path fill="url(#half)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </>
            ) : (
              <path fill={fill} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            )}
          </svg>
        );
      })}
    </span>
  );
}

export default function SkillManagementPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("added");
  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const filteredSkills = useMemo(() => {
    return skills.filter((s) => {
      if (s.type !== (activeTab === "added" ? "我添加的" : "我创建的")) return false;
      if (activeCat !== "all" && s.cat !== activeCat) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!s.name.toLowerCase().includes(q) && !s.desc.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [activeTab, activeCat, searchQuery]);

  const counts = useMemo(() => {
    const added = skills.filter((s) => s.type === "我添加的").length;
    const created = skills.filter((s) => s.type === "我创建的").length;
    return { added, created };
  }, []);

  const catCounts = useMemo(() => {
    const tabSkills = skills.filter((s) => s.type === (activeTab === "added" ? "我添加的" : "我创建的"));
    const map: Record<string, number> = { all: tabSkills.length };
    categories.slice(1).forEach((c) => {
      map[c.key] = tabSkills.filter((s) => s.cat === c.key).length;
    });
    return map;
  }, [activeTab]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full"
    >
      {/* Topbar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
        <span className="text-[13px] text-[#A1A1AA]">
          <span className="text-[#18181B] dark:text-[#FAFAFA] font-medium">AgentOS</span>
          <span className="mx-1.5">/</span>
          Skill 管理
        </span>
        <div className="flex-1" />
        <div className="relative">
          <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
          <input
            placeholder="搜索 Skill 名称或功能..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[260px] pl-7 pr-3 py-1.5 text-[12px] rounded-lg border border-[#E4E4E7] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand transition-colors"
          />
        </div>
        <button className="inline-flex items-center gap-1.5 bg-brand text-white text-[13px] font-medium px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          新建 Skill
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { icon: Puzzle, iconBg: "#EEF2FF", label: "已安装 Skill", value: "14", delta: "较上月 +3", up: true },
            { icon: Zap, iconBg: "#ECFDF5", label: "本月调用次数", value: "5,219", delta: "+12.3%", up: true },
            { icon: Wrench, iconBg: "#FEF3C7", label: "自建 Skill", value: "3", delta: "本月新增 1 个", up: false },
            { icon: Clock, iconBg: "#FDF2F8", label: "平均响应时长", value: "1.2s", delta: "优化 0.4s", up: true },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
              className="bg-white dark:bg-[#18181B] rounded-xl border border-[#E4E4E7] dark:border-[#27272A] p-4 flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: kpi.iconBg }}>
                <kpi.icon className="w-5 h-5 text-brand" />
              </div>
              <div>
                <div className="text-[11px] text-[#A1A1AA]">{kpi.label}</div>
                <div className="text-lg font-bold text-[#18181B] dark:text-[#FAFAFA]">{kpi.value}</div>
                <div className={cn("text-[11px]", kpi.up ? "text-[#059669]" : "text-[#A1A1AA]")}>
                  {kpi.delta}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs + Category pills */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex">
            <button
              onClick={() => { setActiveTab("added"); setActiveCat("all"); setSelectedSkill(null); }}
              className={cn(
                "text-[13px] font-medium px-4 py-1.5 border rounded-l-lg transition-colors",
                activeTab === "added"
                  ? "bg-brand text-white border-brand"
                  : "bg-white dark:bg-[#18181B] text-[#52525B] dark:text-[#A1A1AA] border-[#D1D1D6] dark:border-[#3F3F46] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
              )}
            >
              我添加的 <span className="text-[11px] opacity-70 ml-1">{counts.added}</span>
            </button>
            <button
              onClick={() => { setActiveTab("created"); setActiveCat("all"); setSelectedSkill(null); }}
              className={cn(
                "text-[13px] font-medium px-4 py-1.5 border border-l-0 rounded-r-lg transition-colors",
                activeTab === "created"
                  ? "bg-brand text-white border-brand"
                  : "bg-white dark:bg-[#18181B] text-[#52525B] dark:text-[#A1A1AA] border-[#D1D1D6] dark:border-[#3F3F46] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
              )}
            >
              我创建的 <span className="text-[11px] opacity-70 ml-1">{counts.created}</span>
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => { setActiveCat(cat.key); setSelectedSkill(null); }}
                className={cn(
                  "text-[12px] font-medium px-3 py-1 rounded-full border whitespace-nowrap transition-all",
                  activeCat === cat.key
                    ? "bg-brand text-white border-brand"
                    : "bg-white dark:bg-[#18181B] text-[#52525B] dark:text-[#A1A1AA] border-[#D1D1D6] dark:border-[#3F3F46] hover:border-brand hover:text-brand"
                )}
              >
                {cat.label} · {catCounts[cat.key] ?? 0}
              </button>
            ))}
          </div>
        </div>

        {/* List + Detail */}
        <div className="flex gap-4 min-h-0">
          {/* Skill List */}
          <div
            className={cn(
              "flex flex-col gap-2.5 min-w-0 transition-all duration-300",
              selectedSkill ? "flex-[0_0_calc(100%-396px)]" : "flex-1"
            )}
          >
            {filteredSkills.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#A1A1AA]">
                <Search className="w-10 h-10 mb-3 opacity-30" />
                <div className="text-[14px] font-medium">未找到匹配的 Skill</div>
                <div className="text-[12px] mt-1">试试换个关键词或分类</div>
              </div>
            ) : (
              filteredSkills.map((skill) => {
                const isSelected = selectedSkill?.id === skill.id;
                return (
                  <motion.div
                    key={skill.id}
                    layout
                    onClick={() => setSelectedSkill(isSelected ? null : skill)}
                    className={cn(
                      "flex items-center gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all duration-150 relative",
                      isSelected
                        ? "border-brand bg-brand-50/60 dark:bg-brand-50/10 shadow-sm"
                        : "border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B] hover:border-brand/50 hover:bg-[#F9F9FA] dark:hover:bg-[#27272A]"
                    )}
                  >
                    {isSelected && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-brand rounded-r-[2px]" />
                    )}
                    <div
                      className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: skill.iconBg }}
                    >
                      {skill.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[14px] font-semibold text-[#18181B] dark:text-[#FAFAFA]">
                          {skill.name}
                        </span>
                        {skill.type === "我创建的" && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB] font-medium">自建</span>
                        )}
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded font-medium",
                          skill.status === "已启用"
                            ? "bg-[#ECFDF5] text-[#059669]"
                            : "bg-[#FFFBEB] text-[#D97706]"
                        )}>
                          {skill.status}
                        </span>
                      </div>
                      <div className="text-[12px] text-[#52525B] dark:text-[#A1A1AA] leading-relaxed line-clamp-1">
                        {skill.desc}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-[12px] text-[#A1A1AA] whitespace-nowrap">
                        <StarRating rating={skill.rating} />
                        <span className="text-[#52525B] dark:text-[#A1A1AA] font-medium ml-0.5">{skill.rating}</span>
                        <span className="text-[#D1D1D6] dark:text-[#3F3F46]">|</span>
                        <span>{skill.calls === "0" ? "未启用" : `调用 ${skill.calls} 次`}</span>
                        <span className="text-[#D1D1D6] dark:text-[#3F3F46]">|</span>
                        <span>{skill.version} · {skill.date}</span>
                      </div>
                      <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button className="w-7 h-7 rounded-md flex items-center justify-center text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors"
                          title={skill.primaryAction}>
                          {skill.type === "我创建的" ? <Edit3 className="w-3.5 h-3.5" /> : <Settings className="w-3.5 h-3.5" />}
                        </button>
                        <button className="w-7 h-7 rounded-md flex items-center justify-center text-[#A1A1AA] hover:text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[#7F1D1D]/20 transition-colors"
                          title={skill.secondaryAction}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Detail Panel */}
          <AnimatePresence>
            {selectedSkill && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 380, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden flex-shrink-0"
              >
                <div className="w-[380px]">
                  <div className="bg-white dark:bg-[#18181B] rounded-xl border border-[#E4E4E7] dark:border-[#27272A] overflow-hidden">
                    {/* Warning bar for pending config */}
                    {selectedSkill.status === "待配置" && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-[#FFFBEB] dark:bg-[#422006]/30 border-b border-[#FDE68A] dark:border-[#78350F] text-[12px] text-[#92400E] dark:text-[#FDE68A]">
                        <svg width="14" height="14" fill="none" stroke="#D97706" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        该 Skill 需完成配置后方可使用
                      </div>
                    )}

                    {/* Header */}
                    <div className="p-4 flex items-center gap-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: selectedSkill.iconBg }}>
                        {selectedSkill.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-semibold text-[#18181B] dark:text-[#FAFAFA]">{selectedSkill.name}</div>
                        <div className="text-[12px] text-[#A1A1AA] mt-0.5">{selectedSkill.desc}</div>
                      </div>
                      <button
                        onClick={() => setSelectedSkill(null)}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-4">
                      {/* Status + Stats */}
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "text-[11px] px-2 py-0.5 rounded font-medium",
                          selectedSkill.status === "已启用"
                            ? "bg-[#ECFDF5] text-[#059669]"
                            : "bg-[#FFFBEB] text-[#D97706]"
                        )}>
                          {selectedSkill.status}
                        </span>
                        <div className="flex items-center gap-1.5 text-[12px] text-[#A1A1AA]">
                          <StarRating rating={selectedSkill.rating} />
                          <span className="text-[#18181B] dark:text-[#FAFAFA] font-semibold ml-0.5">{selectedSkill.rating}</span>
                        </div>
                      </div>

                      {/* Roles */}
                      <div>
                        <div className="text-[11px] font-medium text-[#A1A1AA] mb-2">适用角色</div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedSkill.roles.map((r) => (
                            <span key={r} className="text-[12px] px-2.5 py-1 rounded-md bg-[#F4F4F5] dark:bg-[#27272A] text-[#52525B] dark:text-[#A1A1AA] border border-[#E4E4E7] dark:border-[#3F3F46]">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Scenes */}
                      <div>
                        <div className="text-[11px] font-medium text-[#A1A1AA] mb-2">业务场景</div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedSkill.scenes.map((s) => (
                            <span key={s} className="text-[12px] px-2.5 py-1 rounded-md bg-[#F4F4F5] dark:bg-[#27272A] text-[#52525B] dark:text-[#A1A1AA] border border-[#E4E4E7] dark:border-[#3F3F46]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Value */}
                      <div>
                        <div className="text-[11px] font-medium text-[#A1A1AA] mb-1.5">核心价值</div>
                        <div className="text-[13px] text-[#18181B] dark:text-[#FAFAFA] leading-relaxed">{selectedSkill.value}</div>
                      </div>

                      {/* Meta info */}
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E4E4E7] dark:border-[#27272A]">
                        <div>
                          <div className="text-[10px] text-[#A1A1AA]">调用次数</div>
                          <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">{selectedSkill.calls} 次</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#A1A1AA]">版本</div>
                          <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">{selectedSkill.version}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#A1A1AA]">更新日期</div>
                          <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">{selectedSkill.date}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#A1A1AA]">来源</div>
                          <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">{selectedSkill.type}</div>
                        </div>
                      </div>
                    </div>

                    {/* Footer actions */}
                    <div className="px-4 py-3 border-t border-[#E4E4E7] dark:border-[#27272A] flex items-center gap-2">
                      <button className="flex-1 bg-brand text-white text-[13px] font-medium px-4 py-1.5 rounded-lg hover:bg-brand-700 transition-colors">
                        {selectedSkill.primaryAction}
                      </button>
                      <button className="text-[13px] px-4 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[#7F1D1D]/20 transition-colors">
                        {selectedSkill.secondaryAction}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
