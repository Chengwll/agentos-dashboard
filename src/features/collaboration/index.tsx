import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Users,
  UserPlus,
  Settings,
  Circle,
  Bot,
  PauseCircle,
  UserCheck,
  Activity,
  MoreHorizontal,
  PanelRightClose,
  PanelRightOpen,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SpaceMember {
  name: string;
  avatar: string;
  avatarBg: string;
  role: "拥有者" | "管理员" | "编辑者" | "查看者";
  status: "在线" | "离线" | "待接受";
}

interface SpaceAgent {
  name: string;
  iconBg: string;
  iconColor: string;
  status: "运行中" | "已停用";
}

interface SpaceSkill {
  name: string;
  iconBg: string;
  iconColor: string;
  refCount: string;
}

interface Activity {
  avatar: string;
  avatarBg: string;
  user: string;
  action: string;
  target?: string;
  targetType?: "agent" | "member" | "skill" | "resource";
  time: string;
  tag: string;
  tagBg: string;
  tagColor: string;
}

interface Space {
  id: string;
  name: string;
  desc: string;
  gradient: string;
  members: number;
  avatars: { bg: string; text: string }[];
  extraAvatars: number;
  tab: "created" | "joined";
  agents: SpaceAgent[];
  skills: SpaceSkill[];
  membersList: SpaceMember[];
  stats: { running: number; stopped: number; online: number; activity: number };
  activities: Activity[];
}

const spaces: Space[] = [
  {
    id: "space-1", name: "翡翠天际营销组", desc: "翡翠天际项目营销协作",
    gradient: "linear-gradient(135deg,#4F46E5,#818CF8)",
    members: 8, avatars: [{ bg: "#4F46E5", text: "李" }, { bg: "#10B981", text: "张" }, { bg: "#F59E0B", text: "王" }],
    extraAvatars: 5, tab: "created",
    stats: { running: 4, stopped: 1, online: 3, activity: 12 },
    agents: [
      { name: "销售跟进助手", iconBg: "#EEF2FF", iconColor: "#4F46E5", status: "运行中" },
      { name: "营销内容生成", iconBg: "#FEF3C7", iconColor: "#F59E0B", status: "运行中" },
      { name: "活动复盘分析师", iconBg: "#EDE9FE", iconColor: "#8B5CF6", status: "运行中" },
      { name: "竞品情报监控", iconBg: "#FEE2E2", iconColor: "#EF4444", status: "运行中" },
      { name: "项目初始化 Agent", iconBg: "#DCFCE7", iconColor: "#10B981", status: "已停用" },
    ],
    skills: [
      { name: "CRM 数据查询", iconBg: "#EDE9FE", iconColor: "#8B5CF6", refCount: "3 个 Agent 引用" },
      { name: "企微消息推送", iconBg: "#DCFCE7", iconColor: "#10B981", refCount: "2 个 Agent 引用" },
      { name: "合同文档解析", iconBg: "#FEF3C7", iconColor: "#F59E0B", refCount: "1 个 Agent 引用" },
    ],
    membersList: [
      { name: "李明远", avatar: "李", avatarBg: "#4F46E5", role: "拥有者", status: "在线" },
      { name: "张晓芸", avatar: "张", avatarBg: "#10B981", role: "管理员", status: "在线" },
      { name: "王浩然", avatar: "王", avatarBg: "#F59E0B", role: "编辑者", status: "在线" },
      { name: "刘思远", avatar: "刘", avatarBg: "#8B5CF6", role: "编辑者", status: "离线" },
      { name: "陈静怡", avatar: "陈", avatarBg: "#EF4444", role: "查看者", status: "离线" },
      { name: "赵磊", avatar: "赵", avatarBg: "#6B7280", role: "查看者", status: "离线" },
      { name: "孙浩", avatar: "孙", avatarBg: "#A1A1AA", role: "查看者", status: "待接受" },
      { name: "吴雨霏", avatar: "吴", avatarBg: "#A1A1AA", role: "编辑者", status: "待接受" },
    ],
    activities: [
      { avatar: "李", avatarBg: "#4F46E5", user: "李明远", action: "编辑了智能体", target: "销售跟进助手", targetType: "agent", time: "今天 10:15", tag: "智能体", tagBg: "#EEF2FF", tagColor: "#4F46E5" },
      { avatar: "张", avatarBg: "#10B981", user: "张晓芸", action: "创建了智能体", target: "营销内容生成", targetType: "agent", time: "今天 09:48", tag: "智能体", tagBg: "#EEF2FF", tagColor: "#4F46E5" },
      { avatar: "张", avatarBg: "#10B981", user: "张晓芸", action: "邀请了成员", target: "孙浩", targetType: "member", time: "昨天 18:30", tag: "成员", tagBg: "#DCFCE7", tagColor: "#10B981" },
      { avatar: "王", avatarBg: "#F59E0B", user: "王浩然", action: "添加了技能", target: "企微消息推送", targetType: "skill", time: "昨天 16:02", tag: "技能", tagBg: "#EDE9FE", tagColor: "#8B5CF6" },
      { avatar: "刘", avatarBg: "#8B5CF6", user: "刘思远", action: "停用了智能体", target: "项目初始化 Agent", targetType: "agent", time: "05-15 14:22", tag: "智能体", tagBg: "#EEF2FF", tagColor: "#4F46E5" },
      { avatar: "李", avatarBg: "#4F46E5", user: "李明远", action: "创建了协作空间", time: "05-10 09:00", tag: "成员", tagBg: "#DCFCE7", tagColor: "#10B981" },
    ],
  },
  {
    id: "space-2", name: "集团总部运营组", desc: "集团级运营监控与协调",
    gradient: "linear-gradient(135deg,#10B981,#6EE7B7)",
    members: 12, avatars: [{ bg: "#10B981", text: "张" }, { bg: "#8B5CF6", text: "刘" }],
    extraAvatars: 10, tab: "joined",
    stats: { running: 6, stopped: 2, online: 5, activity: 8 },
    agents: [
      { name: "运营数据看板", iconBg: "#EEF2FF", iconColor: "#4F46E5", status: "运行中" },
      { name: "日报自动汇总", iconBg: "#FEF3C7", iconColor: "#F59E0B", status: "运行中" },
      { name: "异常预警推送", iconBg: "#FEE2E2", iconColor: "#EF4444", status: "运行中" },
    ],
    skills: [
      { name: "明源数据查询", iconBg: "#EDE9FE", iconColor: "#8B5CF6", refCount: "5 个 Agent 引用" },
      { name: "企微消息推送", iconBg: "#DCFCE7", iconColor: "#10B981", refCount: "3 个 Agent 引用" },
    ],
    membersList: [
      { name: "张明华", avatar: "张", avatarBg: "#10B981", role: "拥有者", status: "在线" },
      { name: "刘建国", avatar: "刘", avatarBg: "#8B5CF6", role: "管理员", status: "在线" },
      { name: "周文博", avatar: "周", avatarBg: "#F59E0B", role: "编辑者", status: "在线" },
    ],
    activities: [
      { avatar: "张", avatarBg: "#10B981", user: "张明华", action: "更新了智能体配置", target: "运营数据看板", targetType: "agent", time: "今天 11:00", tag: "智能体", tagBg: "#EEF2FF", tagColor: "#4F46E5" },
      { avatar: "刘", avatarBg: "#8B5CF6", user: "刘建国", action: "添加了新成员", target: "周文博", targetType: "member", time: "昨天 15:30", tag: "成员", tagBg: "#DCFCE7", tagColor: "#10B981" },
    ],
  },
  {
    id: "space-3", name: "赛普咨询项目组", desc: "赛普咨询协作与交付",
    gradient: "linear-gradient(135deg,#F59E0B,#FCD34D)",
    members: 5, avatars: [{ bg: "#F59E0B", text: "王" }, { bg: "#EF4444", text: "陈" }],
    extraAvatars: 3, tab: "created",
    stats: { running: 2, stopped: 0, online: 2, activity: 3 },
    agents: [
      { name: "咨询报告生成", iconBg: "#EEF2FF", iconColor: "#4F46E5", status: "运行中" },
      { name: "数据分析助手", iconBg: "#ECFDF5", iconColor: "#059669", status: "运行中" },
    ],
    skills: [
      { name: "PDF 内容提取", iconBg: "#FEF3C7", iconColor: "#B45309", refCount: "2 个 Agent 引用" },
    ],
    membersList: [
      { name: "王思远", avatar: "王", avatarBg: "#F59E0B", role: "拥有者", status: "在线" },
      { name: "陈晓峰", avatar: "陈", avatarBg: "#EF4444", role: "编辑者", status: "在线" },
    ],
    activities: [
      { avatar: "王", avatarBg: "#F59E0B", user: "王思远", action: "创建了智能体", target: "咨询报告生成", targetType: "agent", time: "今天 08:30", tag: "智能体", tagBg: "#EEF2FF", tagColor: "#4F46E5" },
      { avatar: "陈", avatarBg: "#EF4444", user: "陈晓峰", action: "上传了项目资料", time: "昨天 17:00", tag: "资源", tagBg: "#FEF3C7", tagColor: "#D97706" },
    ],
  },
];

const roleConfig: Record<string, { bg: string; text: string }> = {
  "拥有者": { bg: "bg-[#FEF3C7] dark:bg-[#78350F]/30", text: "text-[#D97706] dark:text-[#FBBF24]" },
  "管理员": { bg: "bg-[#EDE9FE] dark:bg-[#5B21B6]/30", text: "text-[#8B5CF6] dark:text-[#A78BFA]" },
  "编辑者": { bg: "bg-[#EEF2FF] dark:bg-[#3730A3]/30", text: "text-[#4F46E5] dark:text-[#818CF8]" },
  "查看者": { bg: "bg-[#F4F4F5] dark:bg-[#27272A]", text: "text-[#A1A1AA]" },
};

type SpaceTab = "created" | "joined";
type DetailTab = "agents" | "skills" | "members";
type ActivityFilter = "全部" | "智能体" | "成员" | "技能" | "资源";

export default function CollaborationPage() {
  const [activeTab, setActiveTab] = useState<SpaceTab>("created");
  const [selectedSpace, setSelectedSpace] = useState<Space>(spaces[0]);
  const [search, setSearch] = useState("");
  const [detailTab, setDetailTab] = useState<DetailTab>("agents");
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>("全部");
  const [activityOpen, setActivityOpen] = useState(true);

  const filteredSpaces = spaces.filter((s) => {
    if (s.tab !== activeTab) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!s.name.toLowerCase().includes(q) && !s.desc.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const space = selectedSpace;

  const filteredAgents = space.agents;
  const filteredMembers = space.membersList;
  const filteredActivities = space.activities.filter((a) => {
    if (activityFilter === "全部") return true;
    return a.tag === activityFilter;
  });

  const detailTabs: { key: DetailTab; label: string; count: number }[] = [
    { key: "agents", label: "智能体", count: space.agents.length },
    { key: "skills", label: "技能", count: space.skills.length },
    { key: "members", label: "成员", count: space.membersList.length },
  ];

  const activityFilters: ActivityFilter[] = ["全部", "智能体", "成员", "技能", "资源"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full"
    >
      {/* Topbar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-[#E4E4E7] dark:border-[#27272A] flex-shrink-0">
        <h1 className="text-lg font-bold text-[#18181B] dark:text-[#FAFAFA]">协作空间</h1>
        <div className="flex-1" />
        <button className="inline-flex items-center gap-1.5 bg-brand text-white text-[13px] font-medium px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          创建空间
        </button>
      </div>

      {/* Content: 2-column layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Space List */}
        <div className="w-[280px] border-r border-[#E4E4E7] dark:border-[#27272A] flex flex-col flex-shrink-0">
          {/* Search */}
          <div className="p-3">
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
              <input
                placeholder="搜索空间..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-7 pr-3 py-1.5 text-[12px] rounded-lg border border-[#E4E4E7] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand transition-colors"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#E4E4E7] dark:border-[#27272A]">
            {[
              { key: "created" as const, label: "我创建的" },
              { key: "joined" as const, label: "我加入的" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); }}
                className={cn(
                  "flex-1 text-[13px] font-medium py-2 border-b-2 transition-colors",
                  activeTab === tab.key
                    ? "border-brand text-brand"
                    : "border-transparent text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Space List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredSpaces.length > 0 ? (
              filteredSpaces.map((s) => (
                <div key={s.id} className="relative group">
                  <button
                    onClick={() => setSelectedSpace(s)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all",
                      selectedSpace.id === s.id
                        ? "bg-brand-50 dark:bg-brand-50/10 border border-brand/20"
                        : "hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] border border-transparent"
                    )}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: s.gradient }}
                    >
                      <Users className="w-[18px] h-[18px] text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold text-[#18181B] dark:text-[#FAFAFA] truncate">{s.name}</div>
                      <div className="text-[11px] text-[#A1A1AA] truncate">{s.desc}</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex -space-x-1">
                          {s.avatars.map((a, i) => (
                            <div key={i} className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-medium text-white border-2 border-white dark:border-[#18181B]" style={{ background: a.bg }}>
                              {a.text}
                            </div>
                          ))}
                          {s.extraAvatars > 0 && (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] text-[#A1A1AA] bg-[#F4F4F5] dark:bg-[#27272A] border-2 border-white dark:border-[#18181B]">
                              +{s.extraAvatars}
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] text-[#A1A1AA]">{s.members} 成员</span>
                      </div>
                    </div>
                  </button>
                  {/* Quick actions on hover */}
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      title="更多操作"
                      className="w-6 h-6 rounded-md flex items-center justify-center bg-white dark:bg-[#27272A] border border-[#E4E4E7] dark:border-[#3F3F46] hover:bg-[#F4F4F5] dark:hover:bg-[#3F3F46] transition-colors"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <MoreHorizontal className="w-3.5 h-3.5 text-[#A1A1AA]" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-[13px] text-[#A1A1AA]">
                {search ? "未找到匹配的空间" : activeTab === "created" ? "暂无创建的空间" : "暂无加入的空间"}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Space Detail */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="p-5 border-b border-[#E4E4E7] dark:border-[#27272A]">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-lg font-bold"
                style={{ background: space.gradient }}
              >
                {space.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[18px] font-bold text-[#18181B] dark:text-[#FAFAFA]">{space.name}</div>
                <div className="text-[12px] text-[#A1A1AA] mt-0.5">{space.desc}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  title="即将上线"
                  className="inline-flex items-center gap-1.5 bg-brand text-white text-[12px] font-medium px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-colors"
                >
                  <UserPlus className="w-3 h-3" />
                  邀请成员
                </button>
                <button
                  title="即将上线"
                  className="inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg border border-dashed border-[#D1D1D6] dark:border-[#3F3F46] text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors cursor-not-allowed opacity-60"
                >
                  <Settings className="w-3 h-3" />
                  设置
                </button>
              </div>
            </div>
          </div>

          {/* Stats — clickable, highlights active tab */}
          <div className="grid grid-cols-4 gap-4 p-5">
            {[
              { icon: Bot, color: "#10B981", iconBg: "bg-[#DCFCE7] dark:bg-[#064E3B]/30", value: space.stats.running, label: "运行中智能体", tab: "agents" as DetailTab },
              { icon: PauseCircle, color: "#F59E0B", iconBg: "bg-[#FEF3C7] dark:bg-[#78350F]/30", value: space.stats.stopped, label: "已停用", tab: "agents" as DetailTab },
              { icon: UserCheck, color: "#8B5CF6", iconBg: "bg-[#EDE9FE] dark:bg-[#5B21B6]/30", value: space.stats.online, label: "在线成员", tab: "members" as DetailTab },
              { icon: Activity, color: "#EF4444", iconBg: "bg-[#FEE2E2] dark:bg-[#7F1D1D]/30", value: space.stats.activity, label: "今日动态", tab: null },
            ].map((stat, i) => (
              <button
                key={i}
                onClick={() => { if (stat.tab) { setDetailTab(stat.tab); setActivityOpen(true); } }}
                className={cn(
                  "bg-white dark:bg-[#18181B] rounded-xl border border-[#E4E4E7] dark:border-[#27272A] p-4 flex items-center gap-3 text-left transition-all",
                  stat.tab ? "cursor-pointer hover:shadow-sm hover:-translate-y-0.5" : "cursor-default"
                )}
              >
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.iconBg)}>
                  <stat.icon size={18} color={stat.color} />
                </div>
                <div>
                  <div className="text-lg font-bold text-[#18181B] dark:text-[#FAFAFA]">{stat.value}</div>
                  <div className="text-[11px] text-[#A1A1AA]">{stat.label}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail Tabs + Content */}
          <div className="px-5 pb-5">
            {/* Tab bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-0 border-b border-[#E4E4E7] dark:border-[#27272A]">
                {detailTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setDetailTab(tab.key)}
                    className={cn(
                      "text-[14px] font-medium px-4 py-2.5 transition-colors flex items-center gap-2 border-b-2 -mb-px",
                      detailTab === tab.key
                        ? "border-brand text-brand"
                        : "border-transparent text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7]"
                    )}
                  >
                    {tab.label}
                    <span className={cn(
                      "text-[11px] px-1.5 py-0.5 rounded-full font-medium",
                      detailTab === tab.key
                        ? "bg-brand-50 dark:bg-brand-50/20 text-brand"
                        : "bg-[#F4F4F5] dark:bg-[#27272A] text-[#A1A1AA]"
                    )}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Activity panel toggle */}
              <button
                onClick={() => setActivityOpen(!activityOpen)}
                className={cn(
                  "inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg border transition-colors",
                  activityOpen
                    ? "border-brand bg-brand-50 dark:bg-brand-50/10 text-brand"
                    : "border-[#D1D1D6] dark:border-[#3F3F46] text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
                )}
              >
                {activityOpen
                  ? <PanelRightClose className="w-3.5 h-3.5" />
                  : <PanelRightOpen className="w-3.5 h-3.5" />
                }
                动态
              </button>
            </div>

            {/* Content area: main + optional activity feed */}
            <div className="flex gap-5">
              {/* Main tab content */}
              <div className={activityOpen ? "flex-1 min-w-0" : "flex-1"}>
                <AnimatePresence mode="wait">
                  {detailTab === "agents" && (
                    <motion.div
                      key="agents"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-1.5"
                    >
                      {filteredAgents.map((a, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: a.iconBg }}>
                            <svg width="14" height="14" fill="none" stroke={a.iconColor} strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
                          </div>
                          <span className="flex-1 text-[13px] text-[#18181B] dark:text-[#FAFAFA]">{a.name}</span>
                          <span className={cn(
                            "inline-flex items-center gap-1 text-[11px]",
                            a.status === "运行中" ? "text-[#10B981]" : "text-[#A1A1AA]"
                          )}>
                            <Circle className={cn("w-1.5 h-1.5 fill-current", a.status === "运行中" ? "text-[#10B981]" : "text-[#A1A1AA]")} />
                            {a.status}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {detailTab === "skills" && (
                    <motion.div
                      key="skills"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-2"
                    >
                      {space.skills.map((sk, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: sk.iconBg }}>
                            <svg width="14" height="14" fill="none" stroke={sk.iconColor} strokeWidth="1.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                          </div>
                          <span className="flex-1 text-[13px] text-[#18181B] dark:text-[#FAFAFA]">{sk.name}</span>
                          <span className="text-[11px] text-[#A1A1AA]">{sk.refCount}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {detailTab === "members" && (
                    <motion.div
                      key="members"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="grid grid-cols-3 gap-3">
                        {filteredMembers.map((m, i) => (
                          <div key={i} className={cn(
                            "bg-white dark:bg-[#18181B] rounded-lg border p-3 text-center",
                            m.status === "待接受"
                              ? "border-dashed border-[#D1D1D6] dark:border-[#3F3F46] opacity-70"
                              : "border-[#E4E4E7] dark:border-[#27272A]"
                          )}>
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold text-white mx-auto mb-1.5"
                              style={{ background: m.status === "待接受" ? "#A1A1AA" : m.avatarBg }}
                            >
                              {m.status === "待接受" ? "?" : m.avatar}
                            </div>
                            <div className="text-[12px] font-medium text-[#18181B] dark:text-[#FAFAFA] truncate">{m.name}</div>
                            <div className={cn(
                              "text-[10px] px-1.5 py-0.5 rounded font-medium mt-1 inline-block",
                              roleConfig[m.role]?.bg,
                              roleConfig[m.role]?.text,
                            )}>
                              {m.role}
                            </div>
                            <div className={cn(
                              "text-[10px] mt-1",
                              m.status === "在线" ? "text-[#10B981]" :
                              m.status === "待接受" ? "text-[#F59E0B]" : "text-[#A1A1AA]"
                            )}>
                              {m.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Activity Feed — collapsible */}
              {activityOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 320, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="w-[320px] flex-shrink-0"
                >
                  <div className="bg-white dark:bg-[#18181B] rounded-xl border border-[#E4E4E7] dark:border-[#27272A] overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[14px] font-semibold text-[#18181B] dark:text-[#FAFAFA]">
                          动态
                          <span className="font-normal text-[12px] text-[#A1A1AA] ml-1.5">今日 {space.stats.activity} 条</span>
                        </span>
                        <button
                          onClick={() => setActivityOpen(false)}
                          className="w-5 h-5 rounded flex items-center justify-center text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors"
                        >
                          <ChevronDown className="w-3.5 h-3.5 rotate-90" />
                        </button>
                      </div>
                      <div className="flex gap-1">
                        {activityFilters.map((f) => (
                          <button
                            key={f}
                            onClick={() => setActivityFilter(f)}
                            className={cn(
                              "text-[11px] px-2 py-0.5 rounded-full transition-colors",
                              activityFilter === f
                                ? "bg-brand text-white font-medium"
                                : "text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
                            )}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="divide-y divide-[#E4E4E7] dark:divide-[#27272A]">
                      {filteredActivities.length > 0 ? (
                        filteredActivities.map((a, i) => (
                          <div key={i} className="px-4 py-3 flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold text-white flex-shrink-0" style={{ background: a.avatarBg }}>
                              {a.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[12px] text-[#18181B] dark:text-[#FAFAFA] leading-relaxed">
                                <b>{a.user}</b> {a.action}
                                {a.target && (
                                  a.targetType === "agent"
                                    ? <span className="text-brand font-medium"> {a.target}</span>
                                    : a.targetType === "skill"
                                      ? <span className="text-[#8B5CF6] font-medium"> {a.target}</span>
                                      : <b> {a.target}</b>
                                )}
                              </div>
                              <div className="text-[10px] text-[#A1A1AA] mt-1">{a.time}</div>
                            </div>
                            <span
                              className="text-[10px] px-2 py-0.5 rounded font-medium flex-shrink-0"
                              style={{ background: a.tagBg, color: a.tagColor }}
                            >
                              {a.tag}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-[12px] text-[#A1A1AA]">
                          暂无{activityFilter === "全部" ? "" : activityFilter}动态
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-2.5 border-t border-[#E4E4E7] dark:border-[#27272A] text-center">
                      <button className="text-[12px] text-brand hover:underline font-medium" title="即将上线">
                        查看全部动态
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
