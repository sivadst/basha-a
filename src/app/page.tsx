"use client";

// ════════════════════════════════════════════════════════
// BASHA-A — Main App Shell
// Routes between views based on Zustand state
// ════════════════════════════════════════════════════════

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import BottomNav from "@/components/BottomNav";
import DiscoverHeader from "@/components/DiscoverHeader";
import ProfileCard from "@/components/ProfileCard";
import MatchesList from "@/components/MatchesList";
import ChatView from "@/components/ChatView";
import ProfileView from "@/components/ProfileView";
import MatchAnimation from "@/components/MatchAnimation";

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function Home() {
  const { currentView } = useAppStore();

  return (
    <div className="relative min-h-screen max-w-lg mx-auto flex flex-col bg-background">
      {/* ── Match Celebration Overlay ──────────────────── */}
      <MatchAnimation />

      {/* ── Page Content ──────────────────────────────── */}
      <AnimatePresence mode="wait">
        {currentView === "discover" && (
          <motion.div
            key="discover"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <DiscoverHeader />
            <ProfileCard />
          </motion.div>
        )}

        {currentView === "matches" && (
          <motion.div
            key="matches"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <MatchesList />
          </motion.div>
        )}

        {currentView === "chat" && (
          <motion.div
            key="chat"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col h-screen"
          >
            <ChatView />
          </motion.div>
        )}

        {currentView === "profile" && (
          <motion.div
            key="profile"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <ProfileView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom Navigation ─────────────────────────── */}
      <BottomNav />
    </div>
  );
}
