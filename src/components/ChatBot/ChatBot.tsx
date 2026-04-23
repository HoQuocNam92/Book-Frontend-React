import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  User,
  Sparkles,
  Trash2,

} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import useChatBot from "@/hooks/useChatBot";
import { formatTime } from "@/utils/formatTime";
import type { Message } from "@/types/Message";
import { clearHistory, loadHistory, saveHistory } from "@/components/ChatBot/logic/handleStorage";




export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadHistory());
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);


  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { askQuestion } = useChatBot();

  useEffect(() => {
    saveHistory(messages);
  }, [messages]);


  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      content: trimmed,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((p) => [...p, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await askQuestion.mutateAsync(trimmed.toLowerCase());
      setMessages((p) => [
        ...p,
        {
          id: (Date.now() + 1).toString(),
          content: res.answer || "Xin lỗi, mình không có câu trả lời.",
          sender: "bot",
          timestamp: new Date().toISOString(),
        },
      ]);
      if (!isOpen) setHasUnread(true);
    } catch {
      setMessages((p) => [
        ...p,
        {
          id: (Date.now() + 1).toString(),
          content:
            "⚠️ Xin lỗi, mình đang gặp sự cố kết nối. Vui lòng thử lại sau.",
          sender: "bot",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };




  return (
    <>
      <Card
        className={cn(
          "fixed bottom-25 right-7 z-[9998]",
          "w-[400px] max-w-[calc(100vw-32px)] h-[580px] max-h-[calc(100vh-140px)]",
          "rounded-2xl overflow-hidden border-0 p-0 gap-0",
          "shadow-[0_20px_60px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)]",
          "flex flex-col origin-bottom-right transition-all duration-300",
          // Mobile
          "max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:max-w-full max-sm:h-full max-sm:max-h-full max-sm:rounded-none",
          isOpen
            ? "animate-window-in pointer-events-auto"
            : "scale-50 translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 shrink-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 text-white">
          <div className="flex items-center gap-3">
            <div>
              Alpha book shop
            </div>
          </div>

          <div className="flex items-center gap-1">

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => clearHistory({ setMessages })}
              className="text-white/80 hover:text-white hover:bg-white/15"
              title="Xóa lịch sử"
            >
              <Trash2 size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/15 hover:rotate-90 transition-transform"
            >
              <X size={18} />
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "flex-1 overflow-y-auto p-4 flex flex-col gap-3",
            "bg-gradient-to-b from-slate-50 to-indigo-50/30",
            "scroll-smooth",
            "[&::-webkit-scrollbar]:w-1",
            "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-indigo-500/15",
            "[&::-webkit-scrollbar-track]:bg-transparent"
          )}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-2 animate-msg-in",
                msg.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              {/* Bot avatar */}
              {msg.sender === "bot" && (
                <div className="size-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shrink-0">
                  <Sparkles size={14} />
                </div>
              )}

              {/* Bubble */}
              <div className="max-w-[78%] flex flex-col">
                <div
                  className={cn(
                    "px-3.5 py-2.5 rounded-2xl break-words",
                    msg.sender === "bot"
                      ? "bg-white text-foreground rounded-bl-sm shadow-sm"
                      : "bg-gradient-to-br from-indigo-500 to-indigo-400 text-white rounded-br-sm shadow-[0_2px_8px_rgba(99,102,241,0.25)]"
                  )}
                >
                  <div
                    className={cn(
                      "chatbot-prose",
                      msg.sender === "user" && "chatbot-prose-user"
                    )}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-[10px] text-muted-foreground mt-1 px-1",
                    msg.sender === "user" && "text-right"
                  )}
                >
                  {formatTime(msg.timestamp)}
                </span>
              </div>

              {/* User avatar */}
              {msg.sender === "user" && (
                <div className="size-7 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-500 flex items-center justify-center shrink-0">
                  <User size={14} />
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end gap-2 animate-msg-in">
              <div className="size-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shrink-0">
                <Sparkles size={14} />
              </div>
              <div className="flex items-center gap-1 px-4 py-3 bg-white rounded-2xl rounded-bl-sm shadow-sm">
                <span className="size-[7px] rounded-full bg-purple-400 animate-typing-1" />
                <span className="size-[7px] rounded-full bg-purple-400 animate-typing-2" />
                <span className="size-[7px] rounded-full bg-purple-400 animate-typing-3" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>



        {/* ── Input area ── */}
        <div className="px-4 pt-3 pb-2.5 border-t border-border bg-white shrink-0">
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              placeholder={
                "Nhập tin nhắn..."
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="flex-1 border-indigo-100 bg-slate-50/80 focus-visible:border-indigo-300 focus-visible:ring-indigo-500/10 text-[13.5px] rounded-xl h-10"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={
                !inputValue.trim() ||
                isTyping
              }
              className={cn(
                "shrink-0 rounded-xl transition-all",
                inputValue.trim()
                  ? "bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-lg text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Send size={16} />
            </Button>
          </div>
          <span className="block text-center text-[10px] text-muted-foreground/60 mt-1.5 tracking-wide">
            Powered by Alpha Books AI ✨
          </span>
        </div>
      </Card>

      <button
        className={cn(
          "fixed bottom-7 right-7 z-[9999]",
          "size-[60px] rounded-full border-none cursor-pointer",
          "bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-400",
          "shadow-[0_4px_20px_rgba(99,102,241,0.4),0_8px_32px_rgba(139,92,246,0.25)]",
          "flex items-center justify-center overflow-visible",
          "transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          "hover:scale-110 hover:shadow-[0_6px_28px_rgba(99,102,241,0.5),0_12px_40px_rgba(139,92,246,0.35)]",
          "active:scale-95",
          "animate-fab-entrance",
          // Mobile
          "max-sm:bottom-5 max-sm:right-5 max-sm:size-[54px]",
          isOpen && "scale-0 rotate-180 opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(true)}
        aria-label="Mở chat hỗ trợ"
      >
        <div className="flex items-center justify-center text-white relative z-[2]">
          <MessageCircle size={24} className="drop-shadow-sm" />
        </div>
        {hasUnread && (
          <span className="absolute -top-0.5 -right-0.5 size-4 bg-red-500 rounded-full border-[2.5px] border-white z-[3] animate-badge-pulse" />
        )}
        <div className="absolute -inset-1.5 rounded-full border-2 border-indigo-500/40 animate-ripple pointer-events-none" />
      </button>
    </>
  );
}
