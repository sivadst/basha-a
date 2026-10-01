"use client";

// ════════════════════════════════════════════════════════
// BASHA-A — Discovery Header
// Clean top bar with logo and filter controls
// ════════════════════════════════════════════════════════

import { motion } from "framer-motion";
import { SlidersHorizontal, Bell } from "lucide-react";

export default function DiscoverHeader() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="px-5 pt-5 pb-2 flex items-center justify-between z-20"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-violet/20">
          <span className="text-white text-sm font-bold">B</span>
        </div>
        <h1 className="text-xl font-bold">
          <span className="gradient-text">BASHA</span>
          <span className="text-text-muted font-light">-A</span>
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="p-2.5 rounded-xl card-elevated"
        >
          <Bell size={18} className="text-text-secondary" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="p-2.5 rounded-xl card-elevated"
        >
          <SlidersHorizontal size={18} className="text-text-secondary" />
        </motion.button>
      </div>
    </motion.header>
  );
}
