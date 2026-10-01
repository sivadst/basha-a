// ════════════════════════════════════════════════════════
// BASHA-A — Core Types
// Structured for easy migration to Supabase/Firebase
// ════════════════════════════════════════════════════════

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  photos: string[];
  personalityBadge: string;
  personalityEmoji: string;
  mbtiType: string;
  bio: string;
  interests: string[];
  location: string;
  distance: string;
  compatibility: number; // 0-100
}

export interface Match {
  id: string;
  user: UserProfile;
  matchedAt: string;
  lastMessage?: string;
  unread: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  matchId: string;
  messages: ChatMessage[];
}

export type SwipeDirection = "left" | "right" | "up";

export type AppView = "discover" | "matches" | "profile" | "chat" | "details";
