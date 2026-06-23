import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  X,
  Star,
  Download,
  Settings,
  XCircle,
  ArrowUpDown,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { agentCategoryMeta } from "@/config/categoryMeta";

interface AgentMarketCard {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  desc: string;
  tags: string[];
  rating: number;
  usage: string;
  version: string;
  date: string;
  status: "已启用" | "未使用";
  hot?: boolean;
  new?: boolean;
}

const cards: AgentMarketCard[] = [
  {
    id: "sales-follow", name: "销售跟进助手", category: "销售辅助",
    subtitle: "销售辅助 · 明源云官方", hot: true,
    desc: "接待完成后自动生成个性化跟进话术，按意向等级设定提醒计划，超时未跟进二次提醒。",
    tags: ["销售辅助", "跟进提醒", "意向评级"], rating: 4.6, usage: "893", version: "v2.1.0", date: "2026-04-15",
    status: "已启用",
  },
  {
    id: "content-gen", name: "营销内容生成", category: "内容创作",
    subtitle: "内容创作 · 明源云官方", hot: true,
    desc: "按平台规范生成抖音/小红书/朋友圈推广文案，自动读取项目核心卖点，支持多场景触发。",
    tags: ["内容创作", "文案生成", "多平台"], rating: 4.7, usage: "234", version: "v1.5.0", date: "2026-04-08",
    status: "未使用",
  },
  {
    id: "competitor-monitor", name: "竞品情报监控", category: "监控预警",
    subtitle: "监控预警 · 明源云官方",
    desc: "定时爬取竞品 URL，与历史版本对比识别价格、加推等异动，一级异动立即推送预警通知。",
    tags: ["监控预警", "竞品分析", "价格监控"], rating: 4.5, usage: "178", version: "v1.2.0", date: "2026-03-20",
    status: "未使用",
  },
  {
    id: "audio-transcribe", name: "录音转写 Agent", category: "知识管理",
    subtitle: "知识管理 · 明源云官方",
    desc: "客户接待录音自动转文字并提取关键要点，生成结构化接待记录存入知识库，支持全文检索。",
    tags: ["知识管理", "ASR", "全文检索"], rating: 4.8, usage: "512", version: "v1.4.0", date: "2026-04-12",
    status: "已启用",
  },
  {
    id: "monthly-review", name: "月度营销复盘", category: "数据分析",
    subtitle: "数据分析 · 明源云官方",
    desc: "自动汇总月度销售数据、来访量、转化率，生成图文复盘报告，识别本月最优成交话术。",
    tags: ["数据分析", "自动报表", "复盘"], rating: 4.4, usage: "89", version: "v1.1.0", date: "2026-03-28",
    status: "未使用",
  },
  {
    id: "ai-trainer", name: "置业顾问 AI 陪练", category: "销售辅助",
    subtitle: "销售辅助 · 社区贡献", new: true,
    desc: "模拟不同类型客户进行沙盘演练，对话结束后 AI 给出评分和改进建议，帮助新人快速成长。",
    tags: ["销售辅助", "AI 陪练", "评分"], rating: 4.3, usage: "45", version: "v1.0.0", date: "2026-05-10",
    status: "未使用",
  },
  {
    id: "project-init", name: "项目初始化 Agent", category: "知识管理",
    subtitle: "知识管理 · 明源云官方",
    desc: "上传项目笔记、销讲说辞、百问百答，自动生成标准化项目目录和知识结构，一键建库。",
    tags: ["知识管理", "项目建库", "自动索引"], rating: 4.8, usage: "142", version: "v2.0.0", date: "2026-04-18",
    status: "已启用",
  },
  {
    id: "market-daily", name: "市场行情日报", category: "数据分析",
    subtitle: "数据分析 · 社区贡献",
    desc: "每日自动爬取区域市场动态，聚合竞品价格、加推信息、网签数据，8 点前推送行情摘要。",
    tags: ["数据分析", "行情监控", "日报"], rating: 4.2, usage: "67", version: "v1.0.2", date: "2026-03-15",
    status: "未使用",
  },
  {
    id: "smart-cs", name: "智能客服机器人", category: "客户服务",
    subtitle: "客户服务 · 明源云官方",
    desc: "7×24 小时自动应答客户咨询，识别意向客户后无缝转人工，自动生成接待摘要推送给顾问。",
    tags: ["客户服务", "自动应答", "转人工"], rating: 4.6, usage: "321", version: "v2.3.0", date: "2026-04-20",
    status: "已启用",
  },
  {
    id: "complaint-handler", name: "投诉处理助手", category: "客户服务",
    subtitle: "客户服务 · 社区贡献",
    desc: "自动识别投诉类型并生成处理方案，跟踪处理进度，到期未解决自动升级并推送预警通知。",
    tags: ["客户服务", "投诉处理", "自动升级"], rating: 4.5, usage: "188", version: "v1.1.0", date: "2026-03-22",
    status: "未使用",
  },
];

// ── Dynamic tag computation ──
function computeTags(cards: AgentMarketCard[]) {
  const catCounts = new Map<string, number>();
  const tagCounts = new Map<string, number>();

  const catNames = new Set(cards.map((c) => c.category));

  cards.forEach((c) => {
    catCounts.set(c.category, (catCounts.get(c.category) || 0) + 1);
    c.tags.forEach((t) => {
      if (!catNames.has(t)) tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
    });
  });

  const categories = Array.from(catCounts.entries()).map(([name, count]) => ({
    label: `${name} · ${count}`,
    type: "category" as const,
    value: name,
  }));

  const plain = Array.from(tagCounts.entries()).map(([name, count]) => ({
    label: `${name} · ${count}`,
    type: "tag" as const,
    value: name,
  }));

  return [
    { label: `全部 · ${cards.length}`, type: "all" as const, value: "全部" },
    ...categories,
    ...plain,
  ];
}

type SortKey = "popular" | "newest" | "rating";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= Math.floor(rating) ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#E4E4E7]"}
        />
      ))}
    </span>
  );
}

// ── Agent Detail Modal ──
function AgentDetailModal({ card, onClose }: { card: AgentMarketCard; onClose: () => void }) {
  const meta = agentCategoryMeta[card.category] || agentCategoryMeta["销售辅助"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#18181B] rounded-2xl border border-[#E4E4E7] dark:border-[#27272A] w-full max-w-[560px] max-h-[80vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E4E4E7] dark:border-[#27272A] flex items-start gap-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", meta.bg, meta.color)}>
            <meta.Icon size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] font-bold text-[#18181B] dark:text-[#FAFAFA]">{card.name}</h2>
              {card.hot && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#D97706] font-semibold">HOT</span>}
              {card.new && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EEF2FF] text-[#4F46E5] font-semibold">NEW</span>}
            </div>
            <div className="text-[12px] text-[#A1A1AA] mt-0.5">{card.subtitle}</div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <div className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">描述</div>
            <p className="text-[13px] text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">{card.desc}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">版本</div>
              <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">{card.version}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">分类</div>
              <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">{card.category}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">评分</div>
              <div className="flex items-center gap-1.5">
                <StarRating rating={card.rating} />
                <span className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">{card.rating}</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">使用次数</div>
              <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">{card.usage} 次</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">发布日期</div>
              <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">{card.date}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">状态</div>
              <span className={cn(
                "inline-block text-[11px] px-2 py-0.5 rounded font-medium",
                card.status === "已启用" ? "bg-[#ECFDF5] text-[#059669]" : "bg-[#F4F4F5] dark:bg-[#27272A] text-[#A1A1AA]"
              )}>
                {card.status}
              </span>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">标签</div>
            <div className="flex flex-wrap gap-1.5">
              {card.tags.map((t) => (
                <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-[#F4F4F5] dark:bg-[#27272A] text-[#52525B] dark:text-[#A1A1AA]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-end gap-2">
          {card.status === "已启用" ? (
            <button className="inline-flex items-center gap-1.5 text-[12px] font-medium px-4 py-2 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors">
              <Settings size={14} />
              已安装 · 去管理
              <ArrowRight size={14} />
            </button>
          ) : (
            <button className="inline-flex items-center gap-1.5 text-[12px] font-medium px-4 py-2 rounded-lg bg-brand text-white hover:bg-brand-700 transition-colors">
              <Download size={14} />
              安装
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Card View ──
function AgentCardView({
  card,
  isFav,
  onToggleFav,
  onClick,
}: {
  card: AgentMarketCard;
  isFav: boolean;
  onToggleFav: () => void;
  onClick: () => void;
}) {
  const meta = agentCategoryMeta[card.category] || agentCategoryMeta["销售辅助"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="bg-white dark:bg-[#18181B] rounded-xl border border-[#E4E4E7] dark:border-[#27272A] p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", meta.bg, meta.color)}>
          <meta.Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] font-semibold text-[#18181B] dark:text-[#FAFAFA] truncate">{card.name}</span>
            {card.hot && <span className="text-[9px] px-1 py-0.5 rounded bg-[#FEF3C7] text-[#D97706] font-semibold flex-shrink-0">HOT</span>}
            {card.new && <span className="text-[9px] px-1 py-0.5 rounded bg-[#EEF2FF] text-[#4F46E5] font-semibold flex-shrink-0">NEW</span>}
          </div>
          <div className="text-[11px] text-[#A1A1AA] mt-0.5">{card.subtitle}</div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
          className={cn("p-1 rounded transition-colors flex-shrink-0", isFav ? "text-[#EF4444]" : "text-[#A1A1AA] hover:text-[#EF4444]")}
        >
          <Heart className={cn("w-4 h-4", isFav && "fill-current")} />
        </button>
      </div>

      <div className="text-[12px] text-[#52525B] dark:text-[#A1A1AA] leading-relaxed mb-3 line-clamp-2">
        {card.desc}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {card.tags.map((t) => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-[#F4F4F5] dark:bg-[#27272A] text-[#52525B] dark:text-[#A1A1AA]">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-[#A1A1AA] mb-3">
        <StarRating rating={card.rating} />
        <span className="text-[#52525B] dark:text-[#A1A1AA] font-medium">{card.rating}</span>
        <span className="text-[#D1D1D6] dark:text-[#3F3F46]">|</span>
        <span>使用 {card.usage} 次</span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#E4E4E7] dark:border-[#27272A]">
        <span className={cn(
          "text-[10px] px-2 py-0.5 rounded font-medium",
          card.status === "已启用" ? "bg-[#ECFDF5] text-[#059669]" : "bg-[#F4F4F5] dark:bg-[#27272A] text-[#A1A1AA]"
        )}>
          {card.status}
        </span>
        {card.status === "已启用" ? (
          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="inline-flex items-center gap-1 text-[11px] px-3 py-1 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors"
          >
            <Settings size={12} />
            配置
          </button>
        ) : (
          <button
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[11px] font-medium px-3 py-1 rounded-lg bg-brand text-white hover:bg-brand-700 transition-colors"
          >
            <Download size={12} />
            使用模板
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ── Page ──
export default function AgentMarketPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("全部");
  const [sortKey, setSortKey] = useState<SortKey>("popular");
  const [favs, setFavs] = useState<Set<string>>(new Set());
  const [detailCard, setDetailCard] = useState<AgentMarketCard | null>(null);

  const allTags = useMemo(() => computeTags(cards), []);

  const filtered = useMemo(() => {
    let result = [...cards];

    if (activeTag === "收藏") {
      result = result.filter((c) => favs.has(c.id));
    } else if (activeTag !== "全部") {
      result = result.filter((c) =>
        c.category === activeTag || c.tags.includes(activeTag)
      );
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q)
      );
    }

    switch (sortKey) {
      case "newest":
        result.sort((a, b) => (a.date < b.date ? 1 : -1));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        result.sort((a, b) => (parseInt(b.usage.replace(/,/g, "")) - parseInt(a.usage.replace(/,/g, ""))));
        break;
    }

    return result;
  }, [activeTag, search, sortKey, favs]);

  const toggleFav = useCallback((id: string) => {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "popular", label: "最热" },
    { key: "newest", label: "最新" },
    { key: "rating", label: "评分最高" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full overflow-y-auto"
    >
      {/* Topbar: title + search + sort */}
      <div className="flex items-center gap-4 px-5 py-3 border-b border-[#E4E4E7] dark:border-[#27272A] flex-shrink-0">
        <h1 className="text-lg font-bold text-[#18181B] dark:text-[#FAFAFA] flex-shrink-0">Agent 市场</h1>

        {/* Search */}
        <div className="relative flex-1 max-w-[360px]">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
          <input
            placeholder="搜索名称、描述…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 text-[12px] rounded-lg border border-[#E4E4E7] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#52525B]">
              <XCircle size={14} />
            </button>
          )}
        </div>

        <div className="flex-1" />

        {/* Sort */}
        <div className="flex items-center gap-1 bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg p-0.5">
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortKey(opt.key)}
              className={cn(
                "text-[12px] font-medium px-3 py-1.5 rounded-[7px] transition-colors flex items-center gap-1",
                sortKey === opt.key
                  ? "bg-white dark:bg-[#3F3F46] text-[#18181B] dark:text-[#FAFAFA] shadow-sm"
                  : "text-[#71717A] hover:text-[#52525B] dark:hover:text-[#A1A1AA]"
              )}
            >
              {opt.key === "popular" && <ArrowUpDown size={12} />}
              {opt.label}
            </button>
          ))}
        </div>

        {/* Favorites count */}
      </div>

      {/* Tag Cloud */}
      <div className="px-5 py-3 border-b border-[#E4E4E7] dark:border-[#27272A] flex flex-wrap gap-1.5">
        {favs.size > 0 && (
          <button
            onClick={() => setActiveTag(activeTag === "收藏" ? "全部" : "收藏")}
            className={cn(
              "text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all whitespace-nowrap inline-flex items-center gap-1",
              activeTag === "收藏"
                ? "bg-[#EF4444] text-white border-[#EF4444]"
                : "bg-white dark:bg-[#18181B] text-[#EF4444] border-[#EF4444]/30 hover:border-[#EF4444]"
            )}
          >
            <Heart size={11} className={activeTag === "收藏" ? "fill-white" : "fill-[#EF4444]"} />
            收藏 · {favs.size}
          </button>
        )}
        {allTags.map((tag) => (
          <button
            key={tag.label}
            onClick={() => setActiveTag(tag.value)}
            className={cn(
              "text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all whitespace-nowrap",
              activeTag === tag.value
                ? "bg-brand text-white border-brand"
                : "bg-white dark:bg-[#18181B] text-[#52525B] dark:text-[#A1A1AA] border-[#D1D1D6] dark:border-[#3F3F46] hover:border-brand hover:text-brand"
            )}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-5">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4 opacity-60">
              <Search size={48} className="mx-auto text-[#D1D1D6]" />
            </div>
            <div className="text-[16px] font-semibold text-[#18181B] dark:text-[#FAFAFA] mb-2">未找到匹配的 Agent</div>
            <div className="text-[13px] text-[#A1A1AA] mb-5">试试换个关键词，或浏览全部 Agents</div>
            <button
              onClick={() => { setSearch(""); setActiveTag("全部"); }}
              className="text-[13px] px-5 py-2 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors"
            >
              查看全部 Agents
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filtered.map((card) => (
              <AgentCardView
                key={card.id}
                card={card}
                isFav={favs.has(card.id)}
                onToggleFav={() => toggleFav(card.id)}
                onClick={() => setDetailCard(card)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailCard && (
          <AgentDetailModal
            card={detailCard}
            onClose={() => setDetailCard(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
