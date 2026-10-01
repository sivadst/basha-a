// ════════════════════════════════════════════════════════
// BASHA-A — Mock Data
// Rich personality-driven profiles for the discovery feed
// ════════════════════════════════════════════════════════

import { UserProfile, Match, Conversation } from "./types";

export const mockProfiles: UserProfile[] = [
  {
    id: "1",
    name: "Amara",
    age: 26,
    photos: ["/profiles/profile-1.jpg"],
    personalityBadge: "The Adventurer",
    personalityEmoji: "🌍",
    mbtiType: "ENFP",
    bio: "Coffee enthusiast who believes every sunset deserves a photo. Currently learning to make the perfect sourdough and planning my next trip to somewhere I can't pronounce.",
    interests: [
      "Travel",
      "Photography",
      "Coffee",
      "Hiking",
      "Sourdough",
      "Live Music",
    ],
    location: "Brooklyn, NY",
    distance: "3 mi away",
    compatibility: 94,
  },
  {
    id: "2",
    name: "Ethan",
    age: 28,
    photos: ["/profiles/profile-2.jpg"],
    personalityBadge: "Introverted Creative",
    personalityEmoji: "🎨",
    mbtiType: "INFP",
    bio: "Graphic designer by day, amateur astronomer by night. I'll talk about fonts for hours and I'm not sorry about it. Looking for someone who appreciates comfortable silence.",
    interests: [
      "Design",
      "Astronomy",
      "Film",
      "Reading",
      "Vinyl Records",
      "Museums",
    ],
    location: "Manhattan, NY",
    distance: "5 mi away",
    compatibility: 87,
  },
  {
    id: "3",
    name: "Yuki",
    age: 25,
    photos: ["/profiles/profile-3.jpg"],
    personalityBadge: "Gentle Dreamer",
    personalityEmoji: "🌸",
    mbtiType: "INFJ",
    bio: "Piano teacher with a weakness for matcha lattes and long bookstore visits. I believe in deep conversations, handwritten letters, and finding beauty in quiet moments.",
    interests: [
      "Piano",
      "Matcha",
      "Literature",
      "Yoga",
      "Watercolor",
      "Poetry",
    ],
    location: "Williamsburg, NY",
    distance: "2 mi away",
    compatibility: 91,
  },
  {
    id: "4",
    name: "Marcus",
    age: 29,
    photos: ["/profiles/profile-4.jpg"],
    personalityBadge: "The Connector",
    personalityEmoji: "⚡",
    mbtiType: "ENTJ",
    bio: "Tech founder who still makes time for weekend basketball and hosting dinner parties. I cook a mean jollof rice and I'm always down for a spontaneous road trip.",
    interests: [
      "Tech",
      "Basketball",
      "Cooking",
      "Podcasts",
      "Road Trips",
      "Mentoring",
    ],
    location: "SoHo, NY",
    distance: "4 mi away",
    compatibility: 82,
  },
  {
    id: "5",
    name: "Sofia",
    age: 30,
    photos: ["/profiles/profile-5.jpg"],
    personalityBadge: "Curious Mind",
    personalityEmoji: "📚",
    mbtiType: "ENTP",
    bio: "Architect who collects ideas like some people collect stamps. I'm the person who reads the entire museum placard. Let's debate philosophy over natural wine.",
    interests: [
      "Architecture",
      "Philosophy",
      "Wine",
      "Cycling",
      "Jazz",
      "Ceramics",
    ],
    location: "Chelsea, NY",
    distance: "6 mi away",
    compatibility: 89,
  },
];

export const mockMatches: Match[] = [
  {
    id: "m1",
    user: mockProfiles[2], // Yuki
    matchedAt: "2 hours ago",
    lastMessage: "That sounds lovely! ✨",
    unread: true,
  },
  {
    id: "m2",
    user: mockProfiles[3], // Marcus
    matchedAt: "1 day ago",
    lastMessage: "Haha yes, let's do it!",
    unread: false,
  },
  {
    id: "m3",
    user: mockProfiles[0], // Amara
    matchedAt: "3 days ago",
    lastMessage: undefined,
    unread: false,
  },
];

export const mockConversations: Record<string, Conversation> = {
  m1: {
    matchId: "m1",
    messages: [
      {
        id: "c1-1",
        senderId: "3",
        text: "Hi! I noticed we both love quiet bookstores 📖",
        timestamp: "2:14 PM",
        read: true,
      },
      {
        id: "c1-2",
        senderId: "me",
        text: "Yes! Have you been to The Strand? It's magical.",
        timestamp: "2:16 PM",
        read: true,
      },
      {
        id: "c1-3",
        senderId: "3",
        text: "I practically live there on weekends 😊 Maybe we could go together sometime?",
        timestamp: "2:18 PM",
        read: true,
      },
      {
        id: "c1-4",
        senderId: "me",
        text: "I'd love that! We could grab matcha after?",
        timestamp: "2:20 PM",
        read: true,
      },
      {
        id: "c1-5",
        senderId: "3",
        text: "That sounds lovely! ✨",
        timestamp: "2:21 PM",
        read: false,
      },
    ],
  },
  m2: {
    matchId: "m2",
    messages: [
      {
        id: "c2-1",
        senderId: "me",
        text: "Hey Marcus! Your jollof rice skills intrigue me 👀",
        timestamp: "Yesterday",
        read: true,
      },
      {
        id: "c2-2",
        senderId: "4",
        text: "Oh it's the real deal! I'll have to prove it to you sometime",
        timestamp: "Yesterday",
        read: true,
      },
      {
        id: "c2-3",
        senderId: "me",
        text: "Is that an invitation? 😄",
        timestamp: "Yesterday",
        read: true,
      },
      {
        id: "c2-4",
        senderId: "4",
        text: "Haha yes, let's do it!",
        timestamp: "Yesterday",
        read: true,
      },
    ],
  },
};
