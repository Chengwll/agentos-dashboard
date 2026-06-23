import { useState, useRef, useEffect } from "react";
import { Send, Bot, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

interface TestPanelProps {
  agentName: string | null;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function TestPanel({ agentName }: TestPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset messages when agent changes
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: agentName
          ? `你好！我是「${agentName}」，有什么可以帮你的吗？`
          : "请先在左侧选择一个 Agent 开始对话测试",
      },
    ]);
    setInput("");
  }, [agentName]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !agentName) return;
    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const reply: ChatMessage = {
        role: "assistant",
        content: `收到你的消息：「${input}」。这是模拟回复，实际部署后将调用 Agent 进行推理回答。`,
      };
      setMessages((prev) => [...prev, reply]);
    }, 800);
  };

  const handleClear = () => {
    setMessages([
      {
        role: "assistant",
        content: agentName
          ? `你好！我是「${agentName}」，有什么可以帮你的吗？`
          : "请先在左侧选择一个 Agent 开始对话测试",
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3.5 border-b border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B]">
        <div className="flex items-center gap-2 mb-0.5">
          <Bot className="w-4 h-4 text-brand" />
          <span className="text-sm font-semibold text-[#18181B] dark:text-[#FAFAFA] flex-1">
            对话测试
          </span>
          {agentName && (
            <button
              onClick={handleClear}
              title="清空对话"
              className="w-6 h-6 rounded flex items-center justify-center text-[#A1A1AA] hover:text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[#7F1D1D]/20 transition-colors"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
        <div className="text-[11px] text-[#A1A1AA]">
          {agentName
            ? `当前测试：${agentName}`
            : "选择 Agent 后进行对话测试"}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {!agentName ? (
          <EmptyState
            icon={<Bot className="w-10 h-10 text-[#A1A1AA]" />}
            title="未选择 Agent"
            description="请从左侧列表中选择一个 Agent 开始对话测试"
          />
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-brand text-white rounded-br-md"
                    : "bg-[#F4F4F5] dark:bg-[#27272A] text-[#18181B] dark:text-[#FAFAFA] rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {agentName && (
        <div className="flex-shrink-0 px-5 py-3 border-t border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B] shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="输入测试消息…"
              className="flex-1 text-[13px] px-3 py-1.5 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] bg-[#F4F4F5] dark:bg-[#27272A] text-[#18181B] dark:text-[#FAFAFA] outline-none focus:border-brand placeholder:text-[#A1A1AA]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
