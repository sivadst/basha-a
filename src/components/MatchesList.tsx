"use client";

// ════════════════════════════════════════════════════════
// BASHA-A — Matches List
// Clean grid of matched users with smooth entry animations
// ════════════════════════════════════════════════════════

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function MatchesList() {
  const { matches, setActiveMatch } = useAppStore();

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-text-primary">Matches</h1>
        <p className="text-sm text-text-muted mt-1">
          {matches.length} connection{matches.length !== 1 ? "s" : ""} waiting
        </p>
      </div>

      {/* New Matches Row */}
      {matches.filter((m) => !m.lastMessage).length > 0 && (
        <div className="px-5 mb-6">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles size={12} className="text-violet" />
            New Matches
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {matches
              .filter((m) => !m.lastMessage)
              .map((match, i) => (
                <motion.button
                  key={match.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveMatch(match.id)}
                  className="flex flex-col items-center gap-2 flex-shrink-0"
                >
                  <div className="relative">
                    <div className="absolute -inset-0.5 gradient-brand rounded-full opacity-70" />
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-surface">
                      <Image
                        src={match.user.photos[0]}
                        alt={match.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-text-primary max-w-[64px] truncate">
                    {match.user.name}
                  </span>
                </motion.button>
              ))}
          </div>
        </div>
      )}

      {/* Conversations */}
      <div className="px-5">
        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <MessageCircle size={12} className="text-violet" />
          Messages
        </h3>

        <div className="space-y-1">
          {matches
            .filter((m) => m.lastMessage)
            .map((match, i) => (
              <motion.button
                key={match.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveMatch(match.id)}
                className="w-full flex items-center gap-3.5 p-3 rounded-2xl hover:bg-surface-elevated transition-colors text-left"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden">
                    <Image
                      src={match.user.photos[0]}
                      alt={match.user.name}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {match.unread && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 gradient-brand rounded-full border-2 border-surface" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`font-semibold text-sm ${
                        match.unread ? "text-text-primary" : "text-text-primary"
                      }`}
                    >
                      {match.user.name}
                    </h4>
                    <span className="text-xs text-text-muted flex-shrink-0">
                      {match.matchedAt}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p
                      className={`text-sm truncate ${
                        match.unread
                          ? "text-text-primary font-medium"
                          : "text-text-muted"
                      }`}
                    >
                      {match.lastMessage}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
        </div>

        {/* Empty state */}
        {matches.filter((m) => m.lastMessage).length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 rounded-full gradient-brand-subtle flex items-center justify-center mb-4">
              <MessageCircle size={28} className="text-violet" />
            </div>
            <h3 className="font-semibold text-text-primary mb-1">
              No messages yet
            </h3>
            <p className="text-sm text-text-muted max-w-[240px]">
              Start a conversation with your matches!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
