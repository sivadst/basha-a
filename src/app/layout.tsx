import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BASHA-A — Discover Your Person",
  description:
    "A personality-driven dating experience. Find authentic connections based on who you truly are, not just how you look.",
  keywords: ["dating", "personality", "connections", "MBTI", "basha-a"],
  openGraph: {
    title: "BASHA-A — Discover Your Person",
    description: "A personality-driven dating experience.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0d15" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
