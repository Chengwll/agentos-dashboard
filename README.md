# AgentOS Dashboard

明源云 AI 智能体搭建平台 · 管理后台前端

## 技术栈

React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide React · Zustand · TanStack Query · MSW

## 快速启动

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev
```

浏览器打开 http://localhost:5173/agents

> Node.js ≥ 18 即可运行。所有数据为 MSW Mock，无需后端服务，完全离线可用。

## 页面路由

| 路由 | 页面 |
|------|------|
| `/agents` | Agent 管理（4 列布局） |
| `/dashboard` | 仪表盘 |
| `/market/agents` | Agent 市场 |
| `/market/skills` | Skill 市场 |
| `/knowledge` | 知识管理 |
| `/collaboration` | 协作空间 |
| `/skill-management` | Skill 管理 |
| `/settings` | 系统设置 |

## 生产构建

```bash
npm run build     # 输出到 dist/
npm run preview   # 预览构建结果
```
