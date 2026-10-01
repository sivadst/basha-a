"use client";

// ════════════════════════════════════════════════════════
// BASHA-A — Profile View
// Current user's profile page with personality showcase
// ════════════════════════════════════════════════════════

import { motion } from "framer-motion";
import {
  Settings,
  Edit3,
  Shield,
  Bell,
  ChevronRight,
  Sparkles,
  Heart,
} from "lucide-react";

const currentUser = {
  name: "Alex",
  age: 27,
  mbtiType: "ENFJ",
  personalityBadge: "The Protagonist",
  personalityEmoji: "🌟",
  bio: "Design enthusiast, coffee snob, and eternal optimist.",
  interests: ["Design", "Coffee", "Hiking", "Music", "Travel", "Cooking"],
  stats: { likes: 142, matches: 23, conversations: 18 },
};

export default function ProfileView() {
  return (
    <div className="flex-1 overflow-y-auto pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Profile</h1>
        <button className="p-2.5 rounded-xl card-elevated">
          <Settings size={18} className="text-text-secondary" />
        </button>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-5 mt-4 p-5 rounded-3xl card-elevated-lg"
      >
        <div className="flex items-center gap-4">
          {/* Avatar placeholder */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {currentUser.name[0]}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 gradient-brand rounded-full flex items-center justify-center border-2 border-surface shadow-md">
              <Edit3 size={12} className="text-white" />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary">
              {currentUser.name}, {currentUser.age}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold gradient-brand text-white">
                {currentUser.personalityEmoji} {currentUser.personalityBadge}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-violet/10 text-violet border border-violet/20">
                {currentUser.mbtiType}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-sm text-text-secondary leading-relaxed">
          {currentUser.bio}
        </p>

        {/* Interests */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {currentUser.interests.map((interest) => (
            <span key={interest} className="pill-tag text-xs">
              {interest}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mx-5 mt-4 grid grid-cols-3 gap-3"
      >
        {[
          { label: "Likes", value: currentUser.stats.likes, icon: Heart, color: "text-pink-400" },
          { label: "Matches", value: currentUser.stats.matches, icon: Sparkles, color: "text-violet" },
          { label: "Chats", value: currentUser.stats.conversations, icon: Heart, color: "text-amber" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            className="p-4 rounded-2xl card-elevated text-center"
          >
            <stat.icon size={18} className={`${stat.color} mx-auto mb-2`} />
            <p className="text-xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Settings Menu */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-5 mt-6 rounded-2xl card-elevated overflow-hidden"
      >
        {[
          { icon: Edit3, label: "Edit Profile", color: "text-violet" },
          { icon: Shield, label: "Privacy & Safety", color: "text-emerald-400" },
          { icon: Bell, label: "Notifications", color: "text-amber" },
          { icon: Sparkles, label: "BASHA-A Premium", color: "text-pink-400" },
        ].map((item, i) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-surface-elevated transition-colors text-left ${
              i > 0 ? "border-t border-border-subtle" : ""
            }`}
          >
            <div className="w-9 h-9 rounded-xl gradient-brand-subtle flex items-center justify-center">
              <item.icon size={16} className={item.color} />
            </div>
            <span className="flex-1 text-sm font-medium text-text-primary">
              {item.label}
            </span>
            <ChevronRight size={16} className="text-text-muted" />
          </button>
        ))}
      </motion.div>

      {/* App version */}
      <p className="text-center text-xs text-text-muted mt-6 mb-4">
        BASHA-A v1.0.0 · Made with 💜
      </p>
    </div>
  );
}
