# BASHA-A 💜

> **Discover Your Person** — A personality-driven dating experience.

BASHA-A is a sleek, minimalistic dating app heavily inspired by the **Boo** dating app. It focuses on authentic connections based on personality types, MBTI compatibility, and shared interests — not just appearances.

![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11+-ff69b4?style=flat-square)

## ✨ Features

- **Discovery Feed** — Swipeable profile cards with personality badges, MBTI types, and compatibility scores
- **Gesture-Based Interactions** — Drag to like/pass/super-like with directional indicators
- **Profile Details** — Tap to expand with smooth bottom-sheet animation showing bio, interests, and location
- **Match Celebration** — Beautiful overlay with floating hearts when mutual likes occur
- **Chat Interface** — Ultra-minimal messaging with gradient bubbles, typing indicators, and quick suggestions
- **Matches List** — New matches row with gradient rings + conversation history
- **Profile Page** — Stats, settings, and personality showcase

## 🎨 Design Philosophy

- **Boo-Inspired Aesthetic** — Clean, personality-focused, sophisticated yet playful
- **Glassmorphism** — Frosted glass effects for navigation and overlays
- **Soft Gradients** — Lavender → Coral → Pink brand palette throughout
- **Micro-Animations** — Spring-based Framer Motion animations on every interaction
- **Dark Mode Ready** — Full CSS custom property system for light/dark themes

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| State | Zustand |
| Icons | Lucide React |

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/sivadst/basha-a.git
cd basha-a

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css        # Design system (colors, gradients, glass, animations)
│   ├── layout.tsx          # Root layout with SEO metadata
│   └── page.tsx            # Main app shell with view routing
├── components/
│   ├── BottomNav.tsx       # Glassmorphic bottom navigation
│   ├── ChatView.tsx        # Minimal chat interface
│   ├── DiscoverHeader.tsx  # Brand header with actions
│   ├── MatchAnimation.tsx  # Match celebration overlay
│   ├── MatchesList.tsx     # Matches grid & conversation list
│   ├── ProfileCard.tsx     # Hero swipeable discovery card
│   └── ProfileView.tsx     # User profile & settings
└── lib/
    ├── data.ts             # Mock profiles & conversations
    ├── store.ts            # Zustand state management
    └── types.ts            # TypeScript interfaces
```

## 🔗 Connecting to a Real Backend

The Zustand store is architected for easy backend integration:

1. **Supabase/Firebase Auth** — Replace the `currentUser` mock with auth state
2. **Real-time Profiles** — Swap `mockProfiles` array with database queries
3. **Live Chat** — Connect `sendMessage` to Supabase Realtime or Firebase RTDB

## 📄 License

MIT License — built with 💜 by BASHA-A team
