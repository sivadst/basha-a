"use client";

// ════════════════════════════════════════════════════════
// BASHA-A — Match Animation Overlay
// Celebratory animation when two users match
// ════════════════════════════════════════════════════════

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function MatchAnimation() {
  const { showMatchAnimation, newMatchProfile, dismissMatch, setView, matches, setActiveMatch } =
    useAppStore();

  if (!showMatchAnimation || !newMatchProfile) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

        {/* Floating hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * 300 - 150,
              y: 200,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
              y: -300 - Math.random() * 200,
              x: Math.random() * 300 - 150,
            }}
            transition={{
              duration: 2 + Math.random(),
              delay: 0.3 + i * 0.15,
              ease: "easeOut",
            }}
            className="absolute"
          >
            <Heart
              size={16 + Math.random() * 16}
              className="text-pink-400 fill-pink-400"
            />
          </motion.div>
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Glow circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 gradient-brand rounded-full blur-2xl opacity-40 scale-125" />
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <Image
                src={newMatchProfile.photos[0]}
                alt={newMatchProfile.name}
                fill
                className="object-cover"
              />
            </div>
            {/* Heart pulse */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute -bottom-2 -right-2 w-10 h-10 gradient-like rounded-full flex items-center justify-center shadow-lg"
            >
              <Heart size={18} className="text-white fill-white" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-2"
          >
            <h2 className="text-3xl font-extrabold gradient-text mb-1">
              It&apos;s a Match!
            </h2>
            <p className="text-white/60 text-sm">
              You and {newMatchProfile.name} liked each other
            </p>
          </motion.div>

          {/* Personality badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium glass text-white">
              {newMatchProfile.personalityEmoji} {newMatchProfile.personalityBadge}
            </span>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3 w-full max-w-xs"
          >
            <button
              onClick={() => {
                const match = matches.find(
                  (m) => m.user.id === newMatchProfile.id
                );
                if (match) {
                  setActiveMatch(match.id);
                }
                dismissMatch();
              }}
              className="w-full py-3.5 rounded-2xl gradient-brand font-semibold text-white flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle size={18} />
              Send a Message
            </button>
            <button
              onClick={dismissMatch}
              className="w-full py-3.5 rounded-2xl glass font-semibold text-white/70 hover:text-white transition-colors"
            >
              Keep Swiping
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
