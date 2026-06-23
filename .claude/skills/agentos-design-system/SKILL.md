---
name: agentos-design-system
description: "AgentOS 明源云 AI 智能体搭建平台 — 前端设计规范与代码生成。涵盖 Design Tokens、组件原语、页面模板、交互模式、响应式、可访问性、表单、通知、Zustand 状态管理、路由规范共 11 个维度。动作: design, create, build, review, refactor, check, fix 新页面或组件。项目类型: 管理后台 Dashboard SaaS。技术栈: React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide React + Zustand + TanStack Query。"
---

# AgentOS Design System

AgentOS · 明源云 AI 智能体搭建平台前端设计规范。本 Skill 的所有规则和代码片段均从项目实际代码中提取并标准化，后续所有新页面、新组件必须遵守。

---

## 使用方式

当以下任一场景发生时，必须调用本 Skill：

- 创建新页面或新功能模块
- 创建或修改 UI 组件（按钮、表单、卡片、表格、图表等）
- 审查 UI 代码的风格一致性
- 选择颜色、字号、间距、圆角等视觉属性
- 实现导航、动效、交互流程
- 处理加载态、空状态、错误态

---

## 架构总览（11 维度 · 4 优先级）

| 优先级 | 维度 | 说明 |
|--------|------|------|
| **P0** | 1. Design Tokens | 颜色·字号·间距·圆角·阴影 — 绝对不可变 |
| **P0** | 2. Component Primitives | 按钮·输入框·卡片·徽章·标签页·对话框·空状态·骨架屏 |
| **P0** | 3. Page Recipes | 列表+详情·仪表盘·表格管理·设置页·市场浏览 |
| **P1** | 4. Interaction Patterns | 导航·选中·展开·编辑·搜索·反馈·动效·键盘·滚动 |
| **P1** | 5. Responsive Strategy | 断点框架·最小宽度·弹性列 |
| **P1** | 6. Accessibility | 焦点环·对比度·aria-label·reducedMotion |
| **P1** | 7. Data Display | 表格·列表·树·时间线·图表 |
| **P2** | 8. Form Standards | 标签位置·校验·必填标识·布局 |
| **P2** | 9. Notification System | 成功横幅·Toast 占位·错误反馈 |
| **P2** | 10. Zustand Paradigm | Store 切分·Selector 模式·持久化 |
| **P2** | 11. Routing Standards | URL 结构·面包屑·深度链接 |

---

# P0-1 · Design Tokens（不可变基础）

## 1.1 颜色系统

### 品牌色

| 令牌 | 色值 | Tailwind 类 | 用途 |
|------|------|-------------|------|
| brand | `#4F46E5` | `bg-brand text-brand border-brand` | 主按钮、选中态、链接、焦点环 |
| brand-50 | `#EEF2FF` | `bg-brand-50` | 选中行背景、品牌浅底 |
| brand-300 | `#818CF8` | `text-brand-300` | 深色模式品牌文字 |
| brand-700 | `#3730A3` | `bg-brand-700` | 按钮 hover 深色 |

### 语义色

| 语义 | 文字色 | 背景色 | 深色背景 | 用途 |
|------|--------|--------|----------|------|
| 成功 Green | `text-[#059669]` | `bg-[#ECFDF5]` | `dark:bg-[#065F46]/20` | 保存成功、运行中 |
| 警告 Amber | `text-[#D97706]` | `bg-[#FFFBEB]` | `dark:bg-[#78350F]/20` | 编辑提示、待发布 |
| 错误 Red | `text-[#DC2626]` | `bg-[#FEF2F2]` | `dark:bg-[#7F1D1D]/20` | 删除、已停用 |
| 信息 Blue | `text-[#2563EB]` | `bg-[#EFF6FF]` | `dark:bg-[#1E3A5F]/30` | 日志 Info 级别 |

### 文字色层级

```
一级 text-[#18181B] dark:text-[#FAFAFA]  → 标题、正文、列表项名称
二级 text-[#52525B] dark:text-[#A1A1AA]  → 描述文字、表单标签、表格数据
三级 text-[#A1A1AA]                       → 副标题、占位符、元数据、时间戳
四级 text-[#D1D1D6] dark:text-[#3F3F46]  → 分隔符、禁用文字
```

### 背景色层级

```
页面底色     bg-[#F4F4F5] dark:bg-[#09090B]
卡片/面板     bg-white dark:bg-[#18181B]
次要列表列    bg-[#F9F9FA] dark:bg-[#18181B]
输入框背景    bg-[#F4F4F5] dark:bg-[#27272A]
hover 态     hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]
选中态       bg-brand-50 dark:bg-brand-50/10
```

### 边框色层级

```
常规分隔    border-[#E4E4E7] dark:border-[#27272A]
粗边框      border-[#D1D1D6] dark:border-[#3F3F46]
品牌边框    border-brand
虚线边框    border-dashed border-[#D1D1D6] dark:border-[#3F3F46]
```

## 1.2 字体层级

```
10px text-[10px]     — 导航分组标题、徽章计数
11px text-[11px]     — 状态徽章、副标题、元数据、表格表头 ← 高频
12px text-xs         — 筛选按钮、描述、标签、提示
13px text-[13px]     — ★ 正文基准：按钮、输入框、标签页、列表项
14px text-sm         — 对话框标题、面板标题
15px text-[15px]     — 图表标题
16px text-base       — 空状态标题、页面 H2
18px text-lg         — 页面 H1
24px text-2xl        — KPI 数值
```

**字重**：标题 `font-semibold` | 按钮/标签 `font-medium` | 正文 `font-normal`（缺省）

**字体栈**：`-apple-system, PingFang SC, Microsoft YaHei, system-ui, sans-serif`

## 1.3 间距（4px 基准网格）

```
 4px  gap-1              — 紧密元素组
 6px  gap-1.5  py-1.5    — 搜索框、面包屑、行内图标 ← 最常用 gap
 8px  gap-2    py-2      — 卡片内元素、表单字段
10px  gap-2.5            — 头像+文字、侧边栏 Logo
12px  p-3     py-3       — 卡片、树节点、输入框
16px  p-4     py-4  mb-4 — 面板头部、侧边栏、区块间距
20px  p-5                — 详情标签页内容
24px  p-6                — 仪表盘页面、确认对话框
```

`gap-1.5`(6px) 是**默认行内间距**。`mb-4` 是**默认区块间距**。

## 1.4 圆角

```
rounded-md    (6px)   — 搜索框、小操作按钮
rounded-lg    (12px)  — ★ 默认：按钮、输入框、侧边栏
rounded-xl    (16px)  — 卡片、模态框、下拉面板
rounded-2xl   (16px+) — 大型模态框
rounded-full          — 徽章、状态点、头像
```

## 1.5 阴影

```
shadow-sm      — 选中卡片、FilterBar 激活项
shadow-md      — 卡片 hover 态（配合 hover:-translate-y-0.5）
shadow-lg      — 下拉菜单、弹出面板
shadow-2xl     — 模态框、抽屉
```

**规则**：阴影只与圆角组合使用。`rounded-xl` + `shadow-lg` 是下拉面板的标准搭配。

---

# P0-2 · Component Primitives（可组合零件）

## 2.1 Button（按钮）

### 主按钮 Primary
```tsx
<button className="bg-brand text-white text-[13px] font-medium px-4 py-1.5 rounded-lg
  hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
  保存
</button>
```

### 加载态主按钮
```tsx
<button disabled className="bg-brand text-white text-[13px] font-medium px-4 py-1.5
  rounded-lg disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-1.5">
  <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
  </svg>
  保存中…
</button>
```

### 次要按钮 Secondary
```tsx
<button className="text-[13px] px-4 py-1.5 rounded-lg border border-[#D1D1D6]
  dark:border-[#3F3F46] text-[#52525B] dark:text-[#A1A1AA]
  hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors">
  取消
</button>
```

### 幽灵按钮 Ghost
```tsx
<button className="w-7 h-7 rounded-md flex items-center justify-center text-[#A1A1AA]
  hover:text-[#52525B] dark:hover:text-[#E4E4E7]
  hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors">
  <Trash2 size={13} />
</button>
```

### 危险按钮 Danger（实心）
```tsx
<button className="bg-[#EF4444] text-white text-[13px] font-medium px-4 py-1.5 rounded-lg
  hover:bg-[#DC2626] transition-colors">
  删除
</button>
```

### 危险按钮 Danger（轮廓）
```tsx
<button className="text-[13px] font-medium px-4 py-1.5 rounded-lg text-[#EF4444]
  hover:bg-[#FEF2F2] dark:hover:bg-[#7F1D1D]/20 transition-colors">
  删除 Agent
</button>
```

### 未来功能按钮（虚线占位）
```tsx
<button disabled className="text-[13px] px-4 py-1.5 rounded-lg border border-dashed
  border-[#D1D1D6] dark:border-[#3F3F46] text-[#A1A1AA] cursor-not-allowed opacity-60">
  即将上线
</button>
```

## 2.2 Input（输入框）

### 文本输入
```tsx
<input className="flex-1 text-[13px] px-3 py-1.5 rounded-lg border border-[#E4E4E7]
  dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA]
  outline-none focus:border-brand placeholder:text-[#A1A1AA]" />
```

### 搜索框（标准模式：外框+内框）
```tsx
{/* 外层 */}
<div className="px-4 py-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
  {/* 内层 */}
  <div className="flex items-center gap-1.5 bg-[#F4F4F5] dark:bg-[#27272A] rounded-md px-2 py-1.5">
    <Search size={13} className="text-[#A1A1AA] flex-shrink-0" />
    <input
      placeholder="搜索…"
      className="bg-transparent border-none outline-none text-xs w-full
        text-[#18181B] dark:text-[#FAFAFA] placeholder:text-[#A1A1AA]" />
    {value && (
      <button onClick={() => clear()} className="text-[#A1A1AA] hover:text-[#52525B] flex-shrink-0">
        <X size={13} />
      </button>
    )}
  </div>
</div>
```

### 顶部栏搜索（特殊紧凑模式）
```tsx
<div className="flex items-center gap-1.5 bg-[#F4F4F5] dark:bg-[#27272A] border border-[#E4E4E7]
  dark:border-[#3F3F46] rounded-lg px-2.5 py-[5px]">
  <Search size={13} className="text-[#A1A1AA]" />
  <input className="border-none bg-transparent outline-none w-full text-[#52525B]
    dark:text-[#E4E4E7] text-[13px] placeholder:text-[#A1A1AA]" />
</div>
```

### Textarea
```tsx
<textarea rows={4} className="w-full text-[13px] px-3 py-1.5 rounded-lg border border-[#E4E4E7]
  dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA]
  outline-none focus:border-brand resize-none" />
```

### Select
```tsx
<select className="text-[13px] px-3 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46]
  bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand
  transition-colors w-[240px]">
```

## 2.3 Card（卡片）

### 标准卡片
```tsx
<div className="bg-white dark:bg-[#18181B] rounded-xl border border-[#E4E4E7]
  dark:border-[#27272A] p-4">
  {/* 内容 */}
</div>
```

### 可交互卡片（列表项）
```tsx
<div className={cn(
  "bg-white dark:bg-[#18181B] border rounded-xl p-3.5 cursor-pointer transition-all duration-150",
  isSelected ? "border-brand shadow-sm" : "border-[#E4E4E7] dark:border-[#27272A] hover:border-brand/50 hover:shadow-sm"
)}>
```

### 统计卡片
```tsx
<div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-[#F9F9FA]
  dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] flex-1">
```

### 设置分区卡片
```tsx
<div className="bg-white dark:bg-[#18181B] rounded-xl border border-[#E4E4E7]
  dark:border-[#27272A] p-5 mb-4">
  <h3 className="text-[15px] font-semibold text-[#18181B] dark:text-[#FAFAFA] mb-4">
    分区标题
  </h3>
  {/* 表单内容 */}
</div>
```

### 图表卡片（带头部）
```tsx
<div className="bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl">
  <div className="px-[22px] py-[18px] border-b border-[#E4E4E7] dark:border-[#27272A]">
    <h3 className="text-[15px] font-bold text-[#18181B] dark:text-[#FAFAFA]">图表标题</h3>
  </div>
  <div className="p-[22px]">
    {/* 图表 */}
  </div>
</div>
```

### KPI 卡片
```tsx
<div className="bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A]
  rounded-xl p-4 relative overflow-hidden transition-all duration-200
  hover:shadow-md hover:-translate-y-0.5">
  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl
    bg-gradient-to-r from-[#4F46E5] to-[#818CF8]" />
  {/* KPI 内容 */}
</div>
```

## 2.4 Badge（徽章）

### 状态徽章
```tsx
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium
  bg-[#ECFDF5] dark:bg-[#065F46]/20 text-[#059669] dark:text-[#34D399]">
  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
  运行中
</span>
```

### 计数徽章
```tsx
<span className="text-[11px] px-1.5 py-px rounded-full bg-[#F4F4F5]
  dark:bg-[#27272A] text-[#A1A1AA]">12</span>
```

### 标签 Pill
```tsx
<span className="text-[12px] px-2.5 py-1 rounded-lg bg-[#F4F4F5]
  dark:bg-[#27272A] text-[#52525B] dark:text-[#A1A1AA] font-medium">
  标签名
</span>
```

## 2.5 Tab（标签页）

### 下划线标签页（标准）
```tsx
<div className="flex gap-0 -mb-px">
  {tabs.map((tab) => (
    <button className={cn(
      "text-[13px] font-medium px-3 py-1.5 border-b-2 transition-colors",
      active === tab.key
        ? "border-brand text-brand"
        : "border-transparent text-[#A1A1AA] hover:text-[#52525B] dark:hover:text-[#E4E4E7]"
    )}>
      {tab.label}
    </button>
  ))}
</div>
```

### 药丸切换标签页（ButtonGroup 风格）
```tsx
<div className="flex items-center gap-1 bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg p-0.5">
  {options.map((opt) => (
    <button className={cn(
      "text-[12px] font-medium px-3 py-1.5 rounded-[7px] transition-colors",
      active === opt.key
        ? "bg-white dark:bg-[#3F3F46] text-[#18181B] dark:text-[#FAFAFA] shadow-sm"
        : "text-[#71717A] hover:text-[#52525B]"
    )}>
      {opt.label}
    </button>
  ))}
</div>
```

## 2.6 Dialog（对话框）

### 确认对话框
```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
  <div className="relative bg-white dark:bg-[#18181B] rounded-xl border border-[#E4E4E7]
    dark:border-[#27272A] shadow-lg p-6 max-w-sm w-full mx-4 animate-scale-in">
    <h2 className="text-[14px] font-semibold text-[#18181B] dark:text-[#FAFAFA] mb-2">标题</h2>
    <p className="text-[13px] text-[#52525B] dark:text-[#A1A1AA] mb-5">描述内容</p>
    <div className="flex gap-2 justify-end">
      <button className="text-[13px] px-4 py-1.5 ...">取消</button>
      <button className="bg-[#EF4444] text-white ...">确认删除</button>
    </div>
  </div>
</div>
```

### 抽屉面板
```tsx
<div className="fixed right-0 top-0 bottom-0 w-[400px] bg-white dark:bg-[#18181B]
  border-l border-[#E4E4E7] dark:border-[#27272A] z-50 flex flex-col shadow-2xl">
```

## 2.7 EmptyState（空状态）

```tsx
<div className="flex flex-col items-center justify-center py-16 px-5 text-center">
  <Icon className="w-10 h-10 text-[#A1A1AA] mb-3" />
  <h2 className="text-base font-semibold text-[#18181B] dark:text-[#FAFAFA] mb-2">
    暂无数据
  </h2>
  <p className="text-[13px] text-[#A1A1AA] mb-5 max-w-[320px] leading-relaxed">
    当前没有可显示的内容
  </p>
  {action && (
    <button onClick={action.onClick} className="text-[13px] px-4 py-1.5 rounded-lg
      border border-[#D1D1D6] dark:border-[#3F3F46] text-[#52525B]
      hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors">
      {action.label}
    </button>
  )}
</div>
```

## 2.8 Skeleton（骨架屏）

```tsx
{/* 卡片骨架 */}
<div className="bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A]
  rounded-xl p-3.5 animate-pulse">
  <div className="flex items-center gap-3 mb-2.5">
    <div className="w-9 h-9 rounded-lg bg-[#E4E4E7] dark:bg-[#27272A]" />
    <div className="flex-1">
      <div className="h-3.5 w-24 bg-[#E4E4E7] dark:bg-[#27272A] rounded mb-1" />
      <div className="h-2.5 w-16 bg-[#F4F4F5] dark:bg-[#3F3F46] rounded" />
    </div>
  </div>
  <div className="h-2.5 w-full bg-[#F4F4F5] dark:bg-[#27272A] rounded mb-1" />
  <div className="h-2.5 w-2/3 bg-[#F4F4F5] dark:bg-[#27272A] rounded" />
</div>
```

**规则**：骨架屏一律 `animate-pulse`，颜色 `bg-[#F4F4F5] dark:bg-[#27272A]`（浅骨架）或 `bg-[#E4E4E7] dark:bg-[#27272A]`（深骨架）。

---

# P0-3 · Page Recipes（页面模板）

## 3.1 Master-Detail（列表+详情）

**适用场景**：Agent 管理、知识管理

### 列宽配置

| 列 | 宽度 | 背景 | 滚动 |
|----|------|------|------|
| 列1-导航树 | `w-[200px] min-w-[200px]` | `bg-white` | 内部独立滚动 |
| 列2-列表 | `w-[380px] min-w-[380px]` | `bg-[#F9F9FA]` | 内部独立滚动 |
| 列3-详情 | `flex-1 min-w-0` | `bg-white` | 内部独立滚动 |
| 列4-辅助面板（可选） | `w-[320px]`，可收起为 `w-0` | `bg-white` | 内部独立滚动 |

### 列内 Flex 结构（铁律）
```tsx
<div className="flex flex-col h-full">
  {/* 头部：固定 */}
  <div className="flex-shrink-0 px-4 py-4 border-b border-[#E4E4E7] dark:border-[#27272A]">
    {/* 标题区 Row1 (mb-4) + 搜索/工具栏 Row2 */}
  </div>

  {/* 内容：滚动 */}
  <div className="flex-1 overflow-y-auto min-h-0 p-3 space-y-2">
    {/* 列表项 */}
  </div>

  {/* 底部：固定（可选） */}
  <div className="flex-shrink-0 px-5 py-3 border-t border-[#E4E4E7] dark:border-[#27272A]">
    {/* 操作按钮 */}
  </div>
</div>
```

### 页面级布局
```tsx
<MotionConfig reducedMotion="user">
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    className="flex-1 flex overflow-hidden">

    {/* 列1 */}
    <div className="w-[200px] min-w-[200px] bg-white dark:bg-[#18181B]
      border-r border-[#E4E4E7] dark:border-[#27272A] flex flex-col">
      <TreePanel />
    </div>

    {/* 列2 */}
    <div className="w-[380px] min-w-[380px] bg-[#F9F9FA] dark:bg-[#18181B]
      border-r border-[#E4E4E7] dark:border-[#27272A] flex flex-col">
      <ListPanel />
    </div>

    {/* 列3 */}
    <div className="flex-1 bg-white dark:bg-[#18181B] flex flex-col overflow-hidden min-w-0">
      <DetailPanel />
    </div>

    {/* 列4（可收起） */}
    <div className={cn(
      "bg-white dark:bg-[#18181B] border-l border-[#E4E4E7] dark:border-[#27272A]
       flex flex-col transition-all duration-300 overflow-hidden",
      isOpen ? "w-[320px] min-w-[320px]" : "w-0 min-w-0 border-l-0"
    )}>
      <AuxPanel />
    </div>
  </motion.div>
</MotionConfig>
```

## 3.2 Dashboard（仪表盘）

```tsx
<div className="flex-1 overflow-y-auto p-6">
  <h1 className="text-lg font-bold text-[#18181B] dark:text-[#FAFAFA] mb-5">仪表盘</h1>

  {/* KPI 卡片行（4列网格） */}
  <div className="grid grid-cols-4 gap-4 mb-6">
    <KPICard />
    <KPICard />
    <KPICard />
    <KPICard />
  </div>

  {/* 图表卡片（2列网格） */}
  <div className="grid grid-cols-2 gap-4">
    <ChartCard />
    <ChartCard />
  </div>
</div>
```

## 3.3 Table Management（表格管理）

```tsx
<div className="flex flex-col h-full">
  {/* 工具栏：搜索 + 筛选 + 操作 */}
  <div className="flex-shrink-0 px-5 py-3 border-b border-[#E4E4E7] dark:border-[#27272A]
    flex items-center gap-3">
    <SearchBox />
    <FilterBar />
    <div className="flex-1" />
    <PrimaryButton>新建</PrimaryButton>
  </div>

  {/* 表格 */}
  <div className="flex-1 overflow-y-auto min-h-0">
    <table className="w-full">
      <thead>
        <tr className="border-b border-[#E4E4E7] dark:border-[#27272A]">
          <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-[#A1A1AA]
            uppercase tracking-wider">列名</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-[#E4E4E7] dark:border-[#27272A]
          hover:bg-brand-50/30 dark:hover:bg-brand-50/5 transition-colors">
          <td className="px-4 py-2.5 text-[13px] text-[#18181B] dark:text-[#FAFAFA]">内容</td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* 分页（可选） */}
  <div className="flex-shrink-0 px-4 py-2 border-t border-[#E4E4E7] dark:border-[#27272A]">
    <Pagination />
  </div>
</div>
```

## 3.4 Settings（设置页）

```tsx
<div className="flex h-full">
  {/* 侧边导航 */}
  <div className="w-[220px] flex-shrink-0 border-r border-[#E4E4E7] dark:border-[#27272A]
    bg-white dark:bg-[#18181B] p-4 space-y-1">
    {navItems.map((item) => (
      <button className={cn(
        "w-full text-left text-[13px] px-3 py-2 rounded-lg transition-colors",
        active === item.key
          ? "bg-brand-50 dark:bg-brand-50/10 text-brand font-medium"
          : "text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
      )}>
        {item.label}
      </button>
    ))}
  </div>

  {/* 内容区 */}
  <div className="flex-1 overflow-y-auto p-6 space-y-5">
    <SectionCard title="分区标题">
      {/* 表单字段 */}
    </SectionCard>
  </div>
</div>
```

## 3.5 Marketplace（市场/浏览）

```tsx
<div className="flex-1 overflow-y-auto p-6">
  <h1 className="text-lg font-bold text-[#18181B] dark:text-[#FAFAFA] mb-5">浏览</h1>

  {/* 搜索 + 筛选 */}
  <div className="flex items-center gap-3 mb-5">
    <SearchBox />
    <FilterBar />
  </div>

  {/* 卡片网格 */}
  <div className="grid grid-cols-3 gap-4">
    <MarketCard />
  </div>
</div>
```

---

# P1-4 · Interaction Patterns（行为规范）

## 4.1 导航层级

```
侧边栏一级分组 → 侧边栏二级项 → 面包屑 → 页面内标签页
```

- 侧边栏选中项：`bg-sidebar-active text-[#FAFAFA]` + 左侧 3px 品牌色指示器
- 面包屑：`text-[13px]` 灰色 + 最后一段加粗黑色
- 切换页面时：保留滚动位置，不丢失筛选/搜索状态

## 4.2 选中与多选

- **单选**：点击卡片 → 边框变 `border-brand` + `shadow-sm`，同时刷新详情列
- **多选**：长按或勾选 checkbox → 顶部出现 BatchBar `bg-brand-50 border-brand/20`
- **取消选择**：BatchBar 右侧"取消"按钮

## 4.3 展开/收起

```tsx
<div className={cn(
  "transition-all duration-300 overflow-hidden",
  isOpen ? "w-[320px] min-w-[320px]" : "w-0 min-w-0 border-l-0"
)}>
```

- 收起态保留 toggle 按钮悬浮在面板外
- 过渡时长一律 `duration-300`

## 4.4 编辑模式

1. 进入编辑 → ConfigTab 顶部 amber 提示条："正在编辑配置 — 修改后请点击保存"
2. 编辑模式下切换 Agent → `ConfirmDialog` 拦截："当前配置有未保存的修改，切换将丢失更改"
3. 保存按钮进入 loading 态（spinner + "保存中…"），600ms 后切换到成功反馈

## 4.5 搜索与筛选

- **实时过滤**：`useMemo` 联动搜索词 + 筛选条件，无防抖
- **结果计数**：筛选按钮显示各状态数量（`全部 · 11`）
- **空结果**：显示"当前筛选条件下没有匹配的 XX"

## 4.6 反馈

| 场景 | 交互方式 |
|------|----------|
| 保存成功 | 绿色横幅 `AnimatePresence`，2.5s 自动消失 |
| 删除 | `ConfirmDialog` + 红色确认按钮 |
| 加载失败 | `EmptyState` 变体，红色图标 + 重试按钮 |
| 编辑未保存 | 切换前 `ConfirmDialog` 拦截 |

## 4.7 动效规范

| 场景 | 配置 | 时长 |
|------|------|------|
| 页面进入 | `y:8→0, opacity 0→1` | 0.2s |
| 标签切换 | `y:4→0, opacity 0→1` | 0.15s |
| 模态框进入 | `scale 0.95→1, opacity 0→1` | 0.15s |
| 抽屉滑入 | `x:100%→0, spring(25,200)` | — |
| 卡片 hover | `scale -0.5px + shadow-md` | 0.15s |
| 面板收起 | `transition-all` | 0.3s |

**必须**：所有页面包裹 `<MotionConfig reducedMotion="user">`

## 4.8 键盘

- `Enter`：搜索提交 / 聊天发送 / 表单提交
- `Escape`：关闭下拉 / 关闭模态框 / 取消编辑
- Tab 顺序与视觉顺序一致
- 模态框打开时焦点自动移到确认按钮

## 4.9 滚动

- 聊天消息 `useEffect` + `scrollIntoView({ behavior: "smooth" })` 自动滚底
- 面板内独立滚动：`flex-1 overflow-y-auto min-h-0`
- 面板间不互相影响滚动位置
- 无外层页面级水平滚动条

---

# P1-5 · Responsive Strategy（响应式策略）

当前项目纯桌面端，但新页面必须预留响应式框架：

### 断点体系

| 断点 | 宽度 | 布局策略 |
|------|------|----------|
| `sm` | ≥640px | — |
| `md` | ≥768px | 列宽开始弹性 |
| `lg` | ≥1024px | 多列布局完整展开 |
| `xl` | ≥1280px | 基准桌面端 |
| `2xl` | ≥1536px | — |

### 最小宽度

- 应用最小宽度：`min-w-[1024px]`（低于此宽度出现横向滚动条，非响应式降级）
- 侧边栏固定：`w-[220px] min-w-[220px]`
- 弹性列使用 `flex-1 min-w-0`（而非固定 px）

### 弹性列规则

- 详情/主内容区一律 `flex-1 min-w-0`，不用固定宽度
- 侧边面板（列表/树）使用固定 `w-[N] min-w-[N]`，防止被压缩

---

# P1-6 · Accessibility（可访问性）

### 必须遵守

1. **焦点环**：所有交互元素保留 `focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2`，禁止 `outline-none` 单独使用（除输入框内）
2. **对比度**：文字与背景 ≥ 4.5:1（AA 级）
3. **aria-label**：仅图标按钮必须加 `aria-label="关闭"` 或 `title="关闭"`
4. **reducedMotion**：全局 `MotionConfig reducedMotion="user"`
5. **alt text**：功能性图片必须有描述性 alt
6. **键盘导航**：模态框、下拉菜单支持 Tab/Enter/Escape
7. **heading 层级**：h1→h2→h3 不跳级

---

# P1-7 · Data Display（数据展示）

## 7.1 表格

```tsx
// 表头
<th className="px-4 py-2.5 text-left text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
// 数据行
<td className="px-4 py-2.5 text-[13px] text-[#18181B] dark:text-[#FAFAFA]">
// 行分隔
<tr className="border-b border-[#E4E4E7] dark:border-[#27272A]
  hover:bg-brand-50/30 dark:hover:bg-brand-50/5 transition-colors">
```

## 7.2 树

```tsx
// 节点：px-3 py-2 + hover 态 + 选中态高亮
// 展开指示器：ChevronRight + rotation-90 动画
// 缩进：每级 pl-4
```

## 7.3 时间线

```tsx
// 左侧时间轴 line + 右侧内容卡片
// 圆点：w-2 h-2 rounded-full bg-brand
// 连接线：absolute left-1 top-2 bottom-0 w-px bg-[#E4E4E7]
```

## 7.4 图表（Recharts）

- 统一卡片容器 `ChartCard`（见 2.3）
- 颜色方案使用品牌色系 `#4F46E5` + `#818CF8`
- Legend 在底部，Tooltip 使用 `rounded-lg shadow-lg` 白色背景

---

# P2-8 · Form Standards（表单规范）

### 标签位置

- **标签在上**（默认）：表单字段间距较大时使用
  ```tsx
  <label className="block text-[11px] font-semibold text-[#A1A1AA] mb-1.5">字段名</label>
  ```

- **标签在左**：设置页紧凑布局时使用
  ```tsx
  <div className="flex items-center gap-3">
    <label className="text-[13px] text-[#52525B] dark:text-[#A1A1AA] w-[120px] flex-shrink-0">字段名</label>
    <input />
  </div>
  ```

### 校验

- 校验时机：**onBlur**，不在 onKeyStroke 校验
- 错误信息：字段下方 `text-[11px] text-[#DC2626] mt-1`
- 多个错误：顶部汇总 + 锚点链接到具体字段

### 必填标识

- 标签后加 `*`，颜色 `text-[#EF4444]`
- 示例：`字段名 <span className="text-[#EF4444]">*</span>`

### 只读 vs 禁用

- 只读：`bg-transparent border-none px-0` 无输入外观
- 禁用：`opacity-40 cursor-not-allowed bg-[#F4F4F5]`

---

# P2-9 · Notification System（通知体系）

### 当前已有

- **成功横幅**：`bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]`，`AnimatePresence` 控制 2.5s 自动消失
- **编辑模式横幅**：`bg-[#FFFBEB] border-[#D97706]/30 text-[#D97706]`

### Toast（占位规范，待实现）

未来需要全局 Toast 组件时，统一接口：

```tsx
// API 设计
toast.success("配置已保存")
toast.error("保存失败，请重试")
toast.warning("该操作不可撤销")
toast.info("正在处理中…")

// 渲染位置：右下角固定
// 动画：slide-up + fade-in，5s 自动消失
// aria-live="polite" 通知屏幕阅读器
```

---

# P2-10 · Zustand Paradigm（状态管理范式）

### Store 切分规则

- 按**功能域**切分，不按页面切分
- 示例：`useAgentStore`（Agent 相关状态）、`useAuthStore`（认证）、`useThemeStore`（主题）

### Store 模板

```tsx
interface XxxState {
  // 数据
  selectedId: string | null;
  filter: "all" | "running" | "pending" | "disabled";

  // 动作
  select: (id: string) => void;
  setFilter: (filter: string) => void;
}

export const useXxxStore = create<XxxState>((set) => ({
  selectedId: null,
  filter: "all",

  select: (id) => set({ selectedId: id }),
  setFilter: (filter) => set({ filter }),
}));
```

### Selector 模式

- 从 Store 中获取状态的组件使用 selector，避免不必要的重渲染：

```tsx
const selectedId = useXxxStore((s) => s.selectedId);
const select = useXxxStore((s) => s.select);
```

### 持久化（按需）

```tsx
persist(create<State>(...), { name: "xxx-storage" })
```

---

# P2-11 · Routing Standards（路由规范）

### URL 结构

```
/agents              → Agent 管理首页
/agents/:id          → Agent 详情（深层链接）
/dashboard           → 仪表盘
/market/agents       → Agent 市场
/market/skills       → Skill 市场
/settings            → 系统设置
/settings/:section   → 设置子页
```

### 规则

- **kebab-case** URL 路径
- 详情页支持**深度链接**（可通过 URL 直接访问指定项）
- 列表状态（筛选、搜索、分页）可选存入 URL query params：`/agents?filter=running&search=test`
- 面包屑从路由路径自动派生

### 静态部署路由选型

| 部署方式 | 路由 | 原因 |
|----------|------|------|
| 静态托管（GitHub Pages / OSS / CDN） | `createHashRouter` | `#` 后的内容不发给服务器 |
| 有服务端（Nginx / Node / Vercel） | `createBrowserRouter` | 服务端可配置 SPA fallback |

---

# P2-12 · Deployment（部署规范）

## 部署检查清单

```bash
# 1. 平台可达性
curl -s --connect-timeout 5 https://目标域名 -o /dev/null -w "%{http_code}"

# 2. 构建产物
npm run build && ls dist/index.html dist/assets/

# 3. 部署后验证（检查 HTTP 状态码，不仅看 body）
curl -s --connect-timeout 10 https://部署URL -w "\nHTTP: %{http_code}\n"
```

## Vite 配置

```ts
// vite.config.ts — 子路径部署必须
export default defineConfig({
  base: "/项目名/",
});
```

## Mock 数据

```tsx
// ✅ Demo 用：所有环境加载
import("./mocks/setupMocks").then((m) => m.setupMocks());

// ❌ 仅开发模式：生产静默失败
if (import.meta.env.DEV) { ... }
```

## 部署工具

优先用 `gh-pages` npm 包，避免手写 git 分支操作：

```bash
npx gh-pages -d dist
```

---

## 快速参考卡片

### 新页面开发 Checklist

```
□ 颜色：使用令牌，禁止裸 hex（除语义色）
□ 字体：正文 13px、标题 semibold、副标题 text-[11px] text-[#A1A1AA]
□ 间距：gap-1.5 行内默认、mb-4 区块分隔
□ 圆角：卡片 rounded-xl、按钮/输入 rounded-lg
□ 布局：flex flex-col h-full + flex-shrink-0 头部 + flex-1 min-h-0 内容
□ 三态：Loading(Skeleton) + Error(EmptyState+重试) + Empty(EmptyState+创建)
□ 动效：MotionConfig + 页面进入 0.2s + 标签切换 0.15s
□ 暗色：所有颜色加 dark: 变体
□ 图标：Lucide React，默认 size={13}/w-4 h-4，颜色 text-[#A1A1AA]
□ 组件：优先用 Component Primitives（P0-2），不存在才新建
□ 无障碍：焦点环 + aria-label + reducedMotion
```
