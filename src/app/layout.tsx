import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Personality Quiz",
  description:
    "Answer a set of questions and get an AI-written profile of how you think, decide and interact.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
