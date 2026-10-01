"use client";

// ════════════════════════════════════════════════════════
// BASHA-A — Discovery Profile Card
// The hero component: large swipeable card with personality
// badges, gradients, and smooth Framer Motion animations
// ════════════════════════════════════════════════════════

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  PanInfo,
} from "framer-motion";
import {
  X,
  Heart,
  Sparkles,
  MapPin,
  ChevronDown,
  Zap,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function ProfileCard() {
  const { profiles, currentProfileIndex, swipeProfile, selectProfile } =
    useAppStore();
  const [exitDirection, setExitDirection] = useState<"left" | "right" | "up" | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const profile = profiles[currentProfileIndex];
  const nextProfile = profiles[(currentProfileIndex + 1) % profiles.length];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [0, 80, 150], [0, 0.5, 1]);
  const nopeOpacity = useTransform(x, [-150, -80, 0], [1, 0.5, 0]);
  const superLikeOpacity = useTransform(y, [-150, -80, 0], [1, 0.5, 0]);
  const cardScale = useTransform(
    x,
    [-300, 0, 300],
    [0.95, 1, 0.95]
  );
  // Background card scale animation
  const bgScale = useTransform(x, [-300, 0, 300], [1, 0.92, 1]);
  const bgOpacity = useTransform(x, [-300, 0, 300], [1, 0.6, 1]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 100;
      const yThreshold = -100;

      if (info.offset.y < yThreshold && Math.abs(info.offset.x) < threshold) {
        setExitDirection("up");
        setTimeout(() => {
          swipeProfile("up");
          setExitDirection(null);
        }, 300);
      } else if (info.offset.x > threshold) {
        setExitDirection("right");
        setTimeout(() => {
          swipeProfile("right");
          setExitDirection(null);
        }, 300);
      } else if (info.offset.x < -threshold) {
        setExitDirection("left");
        setTimeout(() => {
          swipeProfile("left");
          setExitDirection(null);
        }, 300);
      }
    },
    [swipeProfile]
  );

  const handleButtonSwipe = useCallback(
    (dir: "left" | "right" | "up") => {
      setExitDirection(dir);
      setTimeout(() => {
        swipeProfile(dir);
        setExitDirection(null);
      }, 400);
    },
    [swipeProfile]
  );

  if (!profile) return null;

  const exitVariants = {
    left: { x: -600, rotate: -30, opacity: 0 },
    right: { x: 600, rotate: 30, opacity: 0 },
    up: { y: -800, scale: 0.5, opacity: 0 },
  };

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-4 pt-2 pb-4">
      {/* ── Background / next card ────────────────────── */}
      {nextProfile && (
        <motion.div
          style={{ scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-x-4 top-2 bottom-4 card-elevated rounded-3xl overflow-hidden"
        >
          <Image
            src={nextProfile.photos[0]}
            alt={nextProfile.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 420px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </motion.div>
      )}

      {/* ── Main swipeable card ───────────────────────── */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={profile.id}
          className="relative w-full max-w-sm aspect-[3/4.2] cursor-grab active:cursor-grabbing z-10"
          style={{ x, y, rotate, scale: cardScale }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.9}
          onDragEnd={handleDragEnd}
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={
            exitDirection
              ? exitVariants[exitDirection]
              : { scale: 1, opacity: 1, y: 0 }
          }
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 26,
          }}
          onClick={() => {
            if (!isExpanded) setIsExpanded(true);
          }}
        >
          {/* Card container */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden card-elevated-lg">
            {/* Profile photo */}
            <Image
              src={profile.photos[0]}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 420px"
              priority
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/20 to-transparent" />

            {/* ── Swipe indicators ────────────────────── */}
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-8 left-6 z-20"
            >
              <div className="px-4 py-2 rounded-xl border-3 border-emerald-400 bg-emerald-400/20 backdrop-blur-sm rotate-[-12deg]">
                <span className="text-emerald-400 font-extrabold text-2xl tracking-wider">
                  LIKE
                </span>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-8 right-6 z-20"
            >
              <div className="px-4 py-2 rounded-xl border-3 border-red-400 bg-red-400/20 backdrop-blur-sm rotate-[12deg]">
                <span className="text-red-400 font-extrabold text-2xl tracking-wider">
                  NOPE
                </span>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: superLikeOpacity }}
              className="absolute top-1/3 left-1/2 -translate-x-1/2 z-20"
            >
              <div className="px-5 py-2.5 rounded-xl border-3 border-violet bg-violet/20 backdrop-blur-sm">
                <span className="text-violet font-extrabold text-2xl tracking-wider">
                  SUPER ✨
                </span>
              </div>
            </motion.div>

            {/* ── Compatibility badge (top-right) ─────── */}
            <div className="absolute top-5 right-5 z-10">
              <div className="glass rounded-full px-3 py-1.5 flex items-center gap-1.5">
                <Zap size={13} className="text-amber fill-amber" />
                <span className="text-xs font-semibold text-white">
                  {profile.compatibility}%
                </span>
              </div>
            </div>

            {/* ── Profile info overlay ────────────────── */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              {/* Personality badge */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-3"
              >
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold gradient-brand text-white badge-glow">
                  <span>{profile.personalityEmoji}</span>
                  {profile.personalityBadge}
                </span>
              </motion.div>

              {/* Name & age */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  {profile.name}
                  <span className="text-2xl font-light text-white/70 ml-2">
                    {profile.age}
                  </span>
                </h2>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-1 mt-1.5"
              >
                <MapPin size={13} className="text-white/60" />
                <span className="text-sm text-white/60">{profile.distance}</span>
              </motion.div>

              {/* MBTI chip */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-3 flex items-center gap-2"
              >
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-sm border border-white/10">
                  {profile.mbtiType}
                </span>
                <span className="text-xs text-white/50">•</span>
                <span className="text-xs text-white/50">
                  Tap to see more
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Action Buttons ────────────────────────────── */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="flex items-center gap-4 mt-5 z-20"
      >
        {/* Pass */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonSwipe("left")}
          className="w-14 h-14 rounded-full card-elevated flex items-center justify-center group transition-all hover:shadow-lg"
        >
          <X
            size={24}
            className="text-text-muted group-hover:text-red-400 transition-colors"
          />
        </motion.button>

        {/* Super Like */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.88 }}
          onClick={() => handleButtonSwipe("up")}
          className="w-12 h-12 rounded-full gradient-superlike flex items-center justify-center shadow-lg shadow-violet/25"
        >
          <Sparkles size={20} className="text-white" />
        </motion.button>

        {/* Like */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonSwipe("right")}
          className="w-14 h-14 rounded-full gradient-like flex items-center justify-center shadow-lg shadow-pink-500/25 group"
        >
          <Heart size={24} className="text-white" />
        </motion.button>
      </motion.div>

      {/* ── Expanded Profile Details Overlay ───────────── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ y: "70%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-surface rounded-t-3xl p-6 pt-3">
                {/* Drag handle */}
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-1 rounded-full bg-text-muted/30" />
                </div>

                {/* Close */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-5 right-5 p-2 rounded-full glass"
                >
                  <ChevronDown size={18} className="text-text-secondary" />
                </button>

                {/* Profile header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden">
                    <Image
                      src={profile.photos[0]}
                      alt={profile.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">
                      {profile.name}, {profile.age}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold gradient-brand text-white">
                        {profile.personalityEmoji} {profile.personalityBadge}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet/10 text-violet border border-violet/20">
                        {profile.mbtiType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    About
                  </h4>
                  <p className="text-text-primary leading-relaxed">
                    {profile.bio}
                  </p>
                </div>

                {/* Interests */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <span key={interest} className="pill-tag">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    Location
                  </h4>
                  <div className="flex items-center gap-2 text-text-primary">
                    <MapPin size={15} className="text-violet" />
                    <span>
                      {profile.location} · {profile.distance}
                    </span>
                  </div>
                </div>

                {/* Action buttons in expanded */}
                <div className="flex items-center gap-3 pb-6">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsExpanded(false);
                      handleButtonSwipe("left");
                    }}
                    className="flex-1 py-3.5 rounded-2xl card-elevated font-semibold text-text-muted flex items-center justify-center gap-2"
                  >
                    <X size={18} />
                    Pass
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsExpanded(false);
                      handleButtonSwipe("right");
                    }}
                    className="flex-1 py-3.5 rounded-2xl gradient-like font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20"
                  >
                    <Heart size={18} />
                    Like
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
