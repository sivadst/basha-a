"use client";

// ════════════════════════════════════════════════════════
// BASHA-A — Bottom Navigation
// Sleek, glassmorphic bottom nav with animated indicators
// ════════════════════════════════════════════════════════

import { motion } from "framer-motion";
import { Compass, MessageCircleHeart, User } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { AppView } from "@/lib/types";

const navItems: { id: AppView; label: string; icon: typeof Compass }[] = [
  { id: "discover", label: "Discover", icon: Compass },
  { id: "matches", label: "Matches", icon: MessageCircleHeart },
  { id: "profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const { currentView, setView, matches } = useAppStore();
  const unreadCount = matches.filter((m) => m.unread).length;

  // Hide nav in chat or detail views
  if (currentView === "chat" || currentView === "details") return null;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-lg px-4 pb-2">
        <div className="glass-heavy rounded-2xl px-2 py-1.5 flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.id}
                onClick={() => setView(item.id)}
                className="relative flex flex-col items-center gap-0.5 px-6 py-2 rounded-xl transition-colors"
                whileTap={{ scale: 0.92 }}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl gradient-brand-subtle"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={`transition-colors duration-200 ${
                      isActive ? "text-violet" : "text-text-muted"
                    }`}
                  />

                  {/* Unread badge */}
                  {item.id === "matches" && unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1.5 w-4 h-4 gradient-like rounded-full flex items-center justify-center"
                    >
                      <span className="text-[9px] font-bold text-white">
                        {unreadCount}
                      </span>
                    </motion.span>
                  )}
                </div>

                <span
                  className={`text-[10px] font-medium transition-colors duration-200 relative ${
                    isActive ? "text-violet" : "text-text-muted"
                  }`}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
