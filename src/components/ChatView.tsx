"use client";

// ════════════════════════════════════════════════════════
// BASHA-A — Chat View
// Ultra-minimal chat UI: clean bubbles, glassmorphic input
// ════════════════════════════════════════════════════════

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Smile, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function ChatView() {
  const {
    activeMatchId,
    matches,
    conversations,
    sendMessage,
    setActiveMatch,
    setView,
  } = useAppStore();
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const match = matches.find((m) => m.id === activeMatchId);
  const conversation = activeMatchId
    ? conversations[activeMatchId]
    : undefined;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  const handleSend = () => {
    if (!input.trim() || !activeMatchId) return;
    setIsSending(true);
    sendMessage(activeMatchId, input.trim());
    setInput("");
    setTimeout(() => setIsSending(false), 200);
  };

  const handleBack = () => {
    setActiveMatch(null);
    setView("matches");
  };

  if (!match) return null;

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-heavy px-4 py-3 flex items-center gap-3 z-30 sticky top-0"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleBack}
          className="p-2 -ml-2 rounded-xl hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={20} className="text-text-primary" />
        </motion.button>

        <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={match.user.photos[0]}
            alt={match.user.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-text-primary">
            {match.user.name}
          </h3>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-text-muted">Online</span>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet/10 text-violet border border-violet/20">
          {match.user.mbtiType}
        </span>
      </motion.header>

      {/* ── Messages ────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Match intro card */}
        {conversation?.messages.length === 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center text-center py-8 mb-4"
          >
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-3 shadow-lg">
              <Image
                src={match.user.photos[0]}
                alt={match.user.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold text-text-primary mb-1">
              You matched with {match.user.name}!
            </h3>
            <p className="text-sm text-text-muted max-w-[240px]">
              {match.user.personalityEmoji} {match.user.personalityBadge} ·
              Start a conversation about your shared interests
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 mt-3">
              {match.user.interests.slice(0, 3).map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-violet/8 text-violet border border-violet/15"
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Message bubbles */}
        <AnimatePresence mode="popLayout">
          {conversation?.messages.map((msg, i) => {
            const isSent = msg.senderId === "me";
            const showTimestamp =
              i === 0 ||
              conversation.messages[i - 1]?.senderId !== msg.senderId;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`flex ${isSent ? "justify-end" : "justify-start"} mb-1 ${
                  showTimestamp ? "mt-3" : ""
                }`}
              >
                <div
                  className={`max-w-[78%] ${isSent ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`px-4 py-2.5 text-sm leading-relaxed ${
                      isSent ? "bubble-sent" : "bubble-received"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {showTimestamp && (
                    <span
                      className={`block text-[10px] text-text-muted mt-1 ${
                        isSent ? "text-right mr-1" : "ml-1"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isSending && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex justify-start mt-2"
            >
              <div className="bubble-received px-5 py-3 flex items-center gap-1">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-text-muted"
                />
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-text-muted"
                />
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-text-muted"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ──────────────────────────────────── */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-heavy px-4 py-3 sticky bottom-0"
      >
        {/* Quick suggestions */}
        {conversation?.messages.length === 0 && (
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 -mx-1 px-1">
            {[
              `Hi ${match.user.name}! 👋`,
              `Love your vibe ✨`,
              `What's your favorite ${match.user.interests[0].toLowerCase()} spot?`,
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setInput(suggestion);
                  inputRef.current?.focus();
                }}
                className="flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-medium bg-violet/8 text-violet border border-violet/15 hover:bg-violet/15 transition-colors flex items-center gap-1"
              >
                <Sparkles size={11} />
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-xl hover:bg-white/10 transition-colors">
            <Smile size={20} className="text-text-muted" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Say something nice..."
            className="flex-1 bg-surface-elevated rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted border border-border-subtle focus:outline-none focus:border-violet/30 transition-colors"
          />

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleSend}
            disabled={!input.trim()}
            className={`p-2.5 rounded-xl transition-all ${
              input.trim()
                ? "gradient-brand shadow-lg shadow-violet/20"
                : "bg-surface-elevated"
            }`}
          >
            <Send
              size={18}
              className={input.trim() ? "text-white" : "text-text-muted"}
            />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
