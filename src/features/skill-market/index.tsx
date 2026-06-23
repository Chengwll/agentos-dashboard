import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  X,
  Download,
  Settings,
  Star,
  ArrowUpDown,
  ArrowRight,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { skillCategoryMeta } from "@/config/categoryMeta";

interface SkillMarketCard {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  desc: string;
  tags: string[];
  rating: number;
  calls: string;
  version: string;
  status: "已启用" | "未安装" | "新上线";
  hot?: boolean;
  new?: boolean;
}

const cards: SkillMarketCard[] = [
  {
    id: "excel-parse", name: "Excel 数据解析", category: "数据处理",
    subtitle: "明源云官方",
    desc: "读取 Excel/CSV 文件并自动识别表头结构，输出标准化 JSON 数据，支持多 Sheet 页批量处理。",
    tags: ["Excel", "CSV", "JSON"], rating: 4.7, calls: "1,203", version: "v1.3.0",
    status: "已启用", hot: true,
  },
  {
    id: "wecom-push", name: "企微消息推送", category: "通知推送",
    subtitle: "明源云官方",
    desc: "向指定企业微信成员或群组发送文本、卡片、图文消息，支持 @指定人、定时发送与优先级控制。",
    tags: ["企微", "钉钉", "消息"], rating: 4.8, calls: "987", version: "v2.1.0",
    status: "已启用", hot: true,
  },
  {
    id: "pdf-extract", name: "PDF 内容提取", category: "文件处理",
    subtitle: "明源云官方",
    desc: "解析 PDF 合同、报告文件，提取文字、表格及关键字段，输出结构化内容供后续节点调用。",
    tags: ["PDF", "文档解析"], rating: 4.6, calls: "754", version: "v1.1.0",
    status: "未安装",
  },
  {
    id: "mingyuan-erp", name: "明源云 ERP 对接", category: "系统集成",
    subtitle: "明源云官方",
    desc: "直连明源云 ERP 数据源，读写客户档案、合同记录、回款信息，支持双向数据同步与变更订阅。",
    tags: ["ERP", "API", "同步"], rating: 4.9, calls: "432", version: "v1.0.0",
    status: "新上线", new: true,
  },
  {
    id: "sentiment-analysis", name: "情感倾向分析", category: "AI 能力",
    subtitle: "明源云官方",
    desc: "对客户对话、评价文本进行情感极性与意图识别，输出正/中/负分数及关键触发词，辅助客服决策。",
    tags: ["NLP", "情感分析"], rating: 4.5, calls: "618", version: "v1.0.5",
    status: "未安装",
  },
  {
    id: "kb-search", name: "知识库语义检索", category: "搜索查询",
    subtitle: "明源云官方",
    desc: "对内部知识库进行向量语义检索，返回 Top-K 相关段落及来源引用，支持混合检索与重排序策略。",
    tags: ["语义检索", "RAG", "向量"], rating: 4.7, calls: "839", version: "v1.4.0",
    status: "已启用",
  },
  {
    id: "email-auto", name: "邮件自动发送", category: "通知推送",
    subtitle: "社区贡献",
    desc: "基于模板自动生成并发送 HTML 邮件，支持附件上传、定时发送、发送状态回调，兼容主流邮件服务商。",
    tags: ["邮件", "HTML"], rating: 4.3, calls: "274", version: "v0.9.0",
    status: "未安装",
  },
  {
    id: "data-aggregate", name: "数据聚合计算", category: "数据处理",
    subtitle: "社区贡献",
    desc: "对多数据源输入进行分组汇总、求和、均值、排名等聚合运算，输出标准报表结构，无需编写 SQL。",
    tags: ["聚合计算", "报表"], rating: 4.4, calls: "391", version: "v1.0.2",
    status: "未安装",
  },
  {
    id: "http-request", name: "HTTP 请求调用", category: "系统集成",
    subtitle: "明源云官方",
    desc: "配置化发起 GET/POST/PUT 等 HTTP 请求，支持自定义 Header、鉴权参数及响应 JSON 路径提取。",
    tags: ["HTTP", "API", "REST"], rating: 4.6, calls: "1,056", version: "v2.0.0",
    status: "已启用", hot: true,
  },
  {
    id: "asr", name: "语音转文字", category: "AI 能力",
    subtitle: "明源云官方",
    desc: "将录音文件或实时音频流转换为高精度文字，支持多方言识别、说话人分离及关键词置信度输出。",
    tags: ["语音", "ASR", "识别"], rating: 4.8, calls: "723", version: "v1.5.0",
    status: "已启用",
  },
];

// ── Dynamic tag computation ──
function computeTags(cards: SkillMarketCard[]) {
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

// ── Skill Detail Modal ──
function SkillDetailModal({ card, onClose }: { card: SkillMarketCard; onClose: () => void }) {
  const meta = skillCategoryMeta[card.category] || skillCategoryMeta["数据处理"];

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
              <div className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">调用次数</div>
              <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">{card.calls} 次</div>
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
function SkillCardView({
  card,
  isFav,
  onToggleFav,
  onClick,
}: {
  card: SkillMarketCard;
  isFav: boolean;
  onToggleFav: () => void;
  onClick: () => void;
}) {
  const meta = skillCategoryMeta[card.category] || skillCategoryMeta["数据处理"];

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
        <span>调用 {card.calls} 次</span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#E4E4E7] dark:border-[#27272A]">
        <span className={cn(
          "text-[10px] px-2 py-0.5 rounded font-medium",
          card.status === "已启用" ? "bg-[#ECFDF5] text-[#059669]" :
          card.status === "新上线" ? "bg-[#EFF6FF] text-[#2563EB]" :
          "bg-[#F4F4F5] dark:bg-[#27272A] text-[#A1A1AA]"
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
            安装
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ── Page ──
export default function SkillMarketPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("全部");
  const [sortKey, setSortKey] = useState<SortKey>("popular");
  const [favs, setFavs] = useState<Set<string>>(new Set());
  const [detailCard, setDetailCard] = useState<SkillMarketCard | null>(null);

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
        result.sort((a, b) => (a.version < b.version ? 1 : -1));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        result.sort((a, b) => (parseInt(b.calls.replace(/,/g, "")) - parseInt(a.calls.replace(/,/g, ""))));
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
        <h1 className="text-lg font-bold text-[#18181B] dark:text-[#FAFAFA] flex-shrink-0">Skill 市场</h1>

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
            <div className="text-5xl mb-4 opacity-60">
              <Search size={48} className="mx-auto text-[#D1D1D6]" />
            </div>
            <div className="text-[16px] font-semibold text-[#18181B] dark:text-[#FAFAFA] mb-2">未找到匹配的 Skill</div>
            <div className="text-[13px] text-[#A1A1AA] mb-5">试试换个关键词，或浏览全部 Skills</div>
            <button
              onClick={() => { setSearch(""); setActiveTag("全部"); }}
              className="text-[13px] px-5 py-2 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors"
            >
              查看全部 Skills
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filtered.map((card) => (
              <SkillCardView
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
          <SkillDetailModal
            card={detailCard}
            onClose={() => setDetailCard(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
