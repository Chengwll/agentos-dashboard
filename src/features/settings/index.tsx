import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  User, Bell, Shield, Palette, Globe, Database,
  Key, Mail, Moon, Sun, Monitor
} from "lucide-react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

const settingsSections = [
  { key: "profile" as const, label: "个人设置", icon: User },
  { key: "notification" as const, label: "通知偏好", icon: Bell },
  { key: "appearance" as const, label: "外观设置", icon: Palette },
  { key: "security" as const, label: "安全设置", icon: Shield },
  { key: "api" as const, label: "API 管理", icon: Key },
  { key: "data" as const, label: "数据管理", icon: Database },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string>("profile");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("zh-CN");

  const SectionIcon = settingsSections.find((s) => s.key === activeSection)?.icon ?? User;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full"
    >
      {/* Topbar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-[#E4E4E7] dark:border-[#27272A] flex-shrink-0">
        <span className="text-[13px] text-[#A1A1AA]">
          <span className="text-[#18181B] dark:text-[#FAFAFA] font-medium">AgentOS</span>
          <span className="mx-1.5">/</span>
          设置
        </span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-[220px] border-r border-[#E4E4E7] dark:border-[#27272A] flex-shrink-0 py-3">
          {settingsSections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors text-left",
                activeSection === section.key
                  ? "bg-brand-50 dark:bg-brand-50/10 text-brand font-medium border-r-2 border-brand"
                  : "text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
              )}
            >
              <section.icon className="w-4 h-4 flex-shrink-0" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatedContent activeSection={activeSection} theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedContent({
  activeSection, theme, setTheme, language, setLanguage,
}: {
  activeSection: string;
  theme: string;
  setTheme: (t: string) => void;
  language: string;
  setLanguage: (l: string) => void;
}) {
  return (
    <motion.div
      key={activeSection}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      {activeSection === "profile" && <ProfileSection />}
      {activeSection === "notification" && <NotificationSection />}
      {activeSection === "appearance" && <AppearanceSection theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />}
      {activeSection === "security" && <SecuritySection />}
      {activeSection === "api" && <ApiSection />}
      {activeSection === "data" && <DataSection />}
    </motion.div>
  );
}

function SectionCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-[#18181B] rounded-xl border border-[#E4E4E7] dark:border-[#27272A] p-5 mb-4">
      <div className="mb-4">
        <h3 className="text-[14px] font-semibold text-[#18181B] dark:text-[#FAFAFA]">{title}</h3>
        {description && <p className="text-[12px] text-[#A1A1AA] mt-1">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 py-3 first:pt-0 border-b border-[#E4E4E7] dark:border-[#27272A] last:border-0 last:pb-0">
      <div className="w-[140px] flex-shrink-0 text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA] pt-1.5">{label}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function ProfileSection() {
  return (
    <div className="max-w-2xl">
      <SectionCard title="个人信息" description="管理你的个人资料和账户信息">
        <FormField label="头像">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white text-lg font-semibold">李</div>
            <button className="text-[13px] text-brand hover:underline">更换头像</button>
          </div>
        </FormField>
        <FormField label="用户名">
          <input className="w-[240px] text-[13px] px-3 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand transition-colors" defaultValue="李明远" />
        </FormField>
        <FormField label="邮箱">
          <input className="w-[240px] text-[13px] px-3 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand transition-colors" defaultValue="limingyuan@mingyuanyun.com" />
        </FormField>
        <FormField label="手机号">
          <input className="w-[240px] text-[13px] px-3 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand transition-colors" defaultValue="138****8888" />
        </FormField>
      </SectionCard>

      <SectionCard title="组织信息">
        <FormField label="所属租户">
          <span className="text-[13px] text-[#18181B] dark:text-[#FAFAFA]">万科集团</span>
        </FormField>
        <FormField label="默认组织">
          <select className="w-[240px] text-[13px] px-3 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand transition-colors">
            <option>万科·翡翠天际</option>
            <option>万科·金域滨江</option>
            <option>万科·中央公园</option>
          </select>
        </FormField>
        <FormField label="角色">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[12px] font-medium bg-[#EEF2FF] text-[#4F46E5]">管理员</span>
        </FormField>
      </SectionCard>

      <div className="flex gap-2">
        <button className="bg-brand text-white text-[13px] font-medium px-4 py-1.5 rounded-lg hover:bg-brand-700 transition-colors">保存修改</button>
        <button className="text-[13px] px-4 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors">取消</button>
      </div>
    </div>
  );
}

function NotificationSection() {
  return (
    <div className="max-w-2xl">
      <SectionCard title="通知偏好" description="选择你想接收的通知类型和方式">
        {[
          { label: "Agent 运行异常", desc: "Agent 执行失败或异常终止时通知", checked: true },
          { label: "知识库更新", desc: "知识文件向量化完成或失败时通知", checked: true },
          { label: "协作空间动态", desc: "团队成员邀请、角色变更等通知", checked: true },
          { label: "系统公告", desc: "平台升级、维护等官方公告", checked: false },
          { label: "用量预警", desc: "API 调用量接近限额时提醒", checked: true },
          { label: "周报推送", desc: "每周一推送上周运营数据摘要", checked: false },
        ].map((item, i) => (
          <FormField key={i} label={item.label}>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#A1A1AA]">{item.desc}</span>
              <Toggle checked={item.checked} />
            </div>
          </FormField>
        ))}
      </SectionCard>

      <SectionCard title="通知渠道">
        <FormField label="站内通知">
          <Toggle checked={true} />
        </FormField>
        <FormField label="邮件通知">
          <Toggle checked={true} />
        </FormField>
        <FormField label="企微通知">
          <Toggle checked={false} />
        </FormField>
      </SectionCard>
    </div>
  );
}

function AppearanceSection({ theme, setTheme, language, setLanguage }: {
  theme: string;
  setTheme: (t: string) => void;
  language: string;
  setLanguage: (l: string) => void;
}) {
  return (
    <div className="max-w-2xl">
      <SectionCard title="主题模式" description="选择界面配色方案">
        <div className="flex gap-3">
          {[
            { value: "light", label: "浅色模式", icon: Sun },
            { value: "dark", label: "深色模式", icon: Moon },
            { value: "system", label: "跟随系统", icon: Monitor },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTheme(opt.value)}
              className={cn(
                "flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                theme === opt.value
                  ? "border-brand bg-brand-50 dark:bg-brand-50/10"
                  : "border-[#E4E4E7] dark:border-[#27272A] hover:border-brand/50"
              )}
            >
              <opt.icon className={cn("w-6 h-6", theme === opt.value ? "text-brand" : "text-[#A1A1AA]")} />
              <span className={cn("text-[13px] font-medium", theme === opt.value ? "text-brand" : "text-[#52525B] dark:text-[#A1A1AA]")}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="语言">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-[200px] text-[13px] px-3 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand transition-colors"
        >
          <option value="zh-CN">简体中文</option>
          <option value="en">English</option>
        </select>
      </SectionCard>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="max-w-2xl">
      <SectionCard title="密码管理" description="修改登录密码">
        <FormField label="当前密码">
          <input type="password" className="w-[240px] text-[13px] px-3 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand transition-colors" placeholder="输入当前密码" />
        </FormField>
        <FormField label="新密码">
          <input type="password" className="w-[240px] text-[13px] px-3 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand transition-colors" placeholder="输入新密码" />
        </FormField>
        <FormField label="确认密码">
          <input type="password" className="w-[240px] text-[13px] px-3 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand transition-colors" placeholder="再次输入新密码" />
        </FormField>
      </SectionCard>

      <SectionCard title="两步验证" description="添加额外的安全层保护账户">
        <FormField label="身份验证器">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#A1A1AA]">使用 Google Authenticator 或类似应用</span>
            <button className="text-[13px] px-3 py-1 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors">启用</button>
          </div>
        </FormField>
      </SectionCard>

      <SectionCard title="登录设备">
        <div className="space-y-3">
          {[
            { device: "MacBook Pro · macOS 15.4", location: "深圳 · 当前设备", time: "在线" },
            { device: "iPhone 16 Pro · iOS 20", location: "深圳", time: "2 小时前" },
            { device: "Windows PC · Chrome 132", location: "北京", time: "3 天前" },
          ].map((d, i) => (
            <div key={i} className="flex items-center gap-3 py-2 first:pt-0 border-b border-[#E4E4E7] dark:border-[#27272A] last:border-0 last:pb-0">
              <div className={cn("w-2 h-2 rounded-full flex-shrink-0", d.time === "在线" ? "bg-[#10B981]" : "bg-[#A1A1AA]")} />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-[#18181B] dark:text-[#FAFAFA]">{d.device}</div>
                <div className="text-[11px] text-[#A1A1AA]">{d.location}</div>
              </div>
              <span className="text-[11px] text-[#A1A1AA]">{d.time}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function ApiSection() {
  return (
    <div className="max-w-2xl">
      <SectionCard title="API 密钥" description="管理用于外部调用的 API 密钥">
        <div className="space-y-3">
          {[
            { key: "sk-proj-****a1b2", name: "生产环境密钥", created: "2026-04-15", lastUsed: "2 分钟前" },
            { key: "sk-test-****c3d4", name: "测试环境密钥", created: "2026-03-20", lastUsed: "3 天前" },
          ].map((k, i) => (
            <div key={i} className="flex items-center gap-3 py-3 first:pt-0 border-b border-[#E4E4E7] dark:border-[#27272A] last:border-0 last:pb-0">
              <Key className="w-4 h-4 text-[#A1A1AA] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">{k.name}</div>
                <div className="text-[11px] text-[#A1A1AA] font-mono">{k.key}</div>
                <div className="text-[10px] text-[#A1A1AA] mt-0.5">创建于 {k.created} · 最近使用 {k.lastUsed}</div>
              </div>
              <button className="text-[11px] text-[#EF4444] hover:underline">吊销</button>
            </div>
          ))}
        </div>
        <button className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-lg border border-dashed border-[#D1D1D6] dark:border-[#3F3F46] text-brand hover:bg-brand-50 dark:hover:bg-brand-50/10 transition-colors">
          生成新密钥
        </button>
      </SectionCard>

      <SectionCard title="调用限额">
        <FormField label="每日上限">
          <div className="flex items-center gap-2">
            <input className="w-[100px] text-[13px] px-3 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand transition-colors" defaultValue="10000" />
            <span className="text-[12px] text-[#A1A1AA]">次 / 天</span>
          </div>
        </FormField>
        <FormField label="并发限制">
          <div className="flex items-center gap-2">
            <input className="w-[100px] text-[13px] px-3 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand transition-colors" defaultValue="50" />
            <span className="text-[12px] text-[#A1A1AA]">并发请求</span>
          </div>
        </FormField>
      </SectionCard>
    </div>
  );
}

function DataSection() {
  const [showClearCacheConfirm, setShowClearCacheConfirm] = useState(false);
  const [showResetSpaceConfirm, setShowResetSpaceConfirm] = useState(false);

  return (
    <div className="max-w-2xl">
      <SectionCard title="数据导出" description="导出你的数据到本地备份">
        <div className="space-y-3">
          {[
            { label: "Agent 配置", desc: "导出所有 Agent 的配置信息为 JSON 格式" },
            { label: "运营数据", desc: "导出运营监测数据为 CSV 格式" },
            { label: "知识库文件", desc: "导出所有已向量化的知识文件" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 first:pt-0 border-b border-[#E4E4E7] dark:border-[#27272A] last:border-0 last:pb-0">
              <div>
                <div className="text-[13px] font-medium text-[#18181B] dark:text-[#FAFAFA]">{item.label}</div>
                <div className="text-[11px] text-[#A1A1AA]">{item.desc}</div>
              </div>
              <button className="text-[12px] px-3 py-1 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors">导出</button>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="危险操作" description="以下操作不可撤销，请谨慎执行">
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 first:pt-0 border-b border-[#E4E4E7] dark:border-[#27272A] last:border-0 last:pb-0">
            <div>
              <div className="text-[13px] font-medium text-[#EF4444]">清除所有缓存数据</div>
              <div className="text-[11px] text-[#A1A1AA]">清除向量缓存、搜索结果缓存等临时数据</div>
            </div>
            <button
              onClick={() => setShowClearCacheConfirm(true)}
              className="text-[12px] px-3 py-1 rounded-lg border border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
            >
              清除缓存
            </button>
          </div>
          <div className="flex items-center justify-between py-3 first:pt-0">
            <div>
              <div className="text-[13px] font-medium text-[#EF4444]">重置工作空间</div>
              <div className="text-[11px] text-[#A1A1AA]">删除所有 Agent、Skill 和数据，恢复到初始状态</div>
            </div>
            <button
              onClick={() => setShowResetSpaceConfirm(true)}
              className="text-[12px] px-3 py-1 rounded-lg bg-[#EF4444] text-white hover:bg-[#DC2626] transition-colors"
            >
              重置空间
            </button>
          </div>
        </div>
      </SectionCard>

      <ConfirmDialog
        open={showClearCacheConfirm}
        onOpenChange={setShowClearCacheConfirm}
        title="清除缓存数据"
        description="确定要清除所有缓存数据吗？这可能会短暂影响系统查询性能。"
        confirmLabel="清除缓存"
        confirmVariant="destructive"
        onConfirm={() => {}}
      />
      <ConfirmDialog
        open={showResetSpaceConfirm}
        onOpenChange={setShowResetSpaceConfirm}
        title="重置工作空间"
        description="此操作将永久删除所有 Agent、Skill 和数据。此操作不可撤销，请确认是否继续。"
        confirmLabel="重置空间"
        confirmVariant="destructive"
        onConfirm={() => {}}
      />
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange?: (v: boolean) => void }) {
  const [on, setOn] = useState(checked);
  const isOn = onChange ? checked : on;

  const handleClick = () => {
    if (onChange) {
      onChange(!checked);
    } else {
      setOn(!on);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      onClick={handleClick}
      className={cn(
        "w-9 h-5 rounded-full transition-colors relative flex-shrink-0",
        isOn ? "bg-brand" : "bg-[#D1D1D6] dark:bg-[#3F3F46]"
      )}
    >
      <div className={cn(
        "w-4 h-4 rounded-full bg-white shadow-sm absolute top-0.5 transition-all",
        isOn ? "left-[18px]" : "left-0.5"
      )} />
    </button>
  );
}
