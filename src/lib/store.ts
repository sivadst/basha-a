// ════════════════════════════════════════════════════════
// BASHA-A — Zustand Store
// Centralized state management, backend-ready architecture
// ════════════════════════════════════════════════════════

import { create } from "zustand";
import { UserProfile, Match, ChatMessage, AppView } from "./types";
import { mockProfiles, mockMatches, mockConversations } from "./data";

interface AppState {
  // ── Navigation ───────────────────────────────────────
  currentView: AppView;
  setView: (view: AppView) => void;

  // ── Discovery Feed ───────────────────────────────────
  profiles: UserProfile[];
  currentProfileIndex: number;
  selectedProfile: UserProfile | null;
  swipeProfile: (direction: "left" | "right" | "up") => void;
  selectProfile: (profile: UserProfile | null) => void;

  // ── Matches ──────────────────────────────────────────
  matches: Match[];
  activeMatchId: string | null;
  setActiveMatch: (matchId: string | null) => void;

  // ── Chat ─────────────────────────────────────────────
  conversations: Record<string, { matchId: string; messages: ChatMessage[] }>;
  sendMessage: (matchId: string, text: string) => void;

  // ── Match Animation ──────────────────────────────────
  showMatchAnimation: boolean;
  newMatchProfile: UserProfile | null;
  dismissMatch: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // ── Navigation ───────────────────────────────────────
  currentView: "discover",
  setView: (view) => set({ currentView: view, activeMatchId: null }),

  // ── Discovery Feed ───────────────────────────────────
  profiles: mockProfiles,
  currentProfileIndex: 0,
  selectedProfile: null,

  swipeProfile: (direction) => {
    const { currentProfileIndex, profiles } = get();
    const currentProfile = profiles[currentProfileIndex];

    if (direction === "right" || direction === "up") {
      // Simulate a match on ~50% of likes for demo
      const isMatch = Math.random() > 0.5;
      if (isMatch && currentProfile) {
        const newMatch: Match = {
          id: `m-${Date.now()}`,
          user: currentProfile,
          matchedAt: "Just now",
          unread: false,
        };
        set((state) => ({
          matches: [newMatch, ...state.matches],
          showMatchAnimation: true,
          newMatchProfile: currentProfile,
          conversations: {
            ...state.conversations,
            [newMatch.id]: { matchId: newMatch.id, messages: [] },
          },
        }));
      }
    }

    set({
      currentProfileIndex: (currentProfileIndex + 1) % profiles.length,
      selectedProfile: null,
    });
  },

  selectProfile: (profile) => set({ selectedProfile: profile }),

  // ── Matches ──────────────────────────────────────────
  matches: mockMatches,
  activeMatchId: null,
  setActiveMatch: (matchId) =>
    set({ activeMatchId: matchId, currentView: matchId ? "chat" : "matches" }),

  // ── Chat ─────────────────────────────────────────────
  conversations: mockConversations,
  sendMessage: (matchId, text) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
    };

    set((state) => ({
      conversations: {
        ...state.conversations,
        [matchId]: {
          matchId,
          messages: [
            ...(state.conversations[matchId]?.messages || []),
            newMessage,
          ],
        },
      },
    }));

    // Simulate auto-reply after 1.5s
    setTimeout(() => {
      const replies = [
        "That's so sweet! 😊",
        "Haha I love that!",
        "Tell me more! ✨",
        "You're amazing 💜",
        "Can't wait!",
        "That sounds perfect 🌸",
      ];
      const autoReply: ChatMessage = {
        id: `msg-${Date.now()}-reply`,
        senderId: "other",
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: false,
      };

      set((state) => ({
        conversations: {
          ...state.conversations,
          [matchId]: {
            matchId,
            messages: [
              ...(state.conversations[matchId]?.messages || []),
              autoReply,
            ],
          },
        },
      }));
    }, 1500);
  },

  // ── Match Animation ──────────────────────────────────
  showMatchAnimation: false,
  newMatchProfile: null,
  dismissMatch: () =>
    set({ showMatchAnimation: false, newMatchProfile: null }),
}));
