// File: app/layout.tsx
// Last updated: August 15, 2024

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: "AI Starter Technology Stack from Stephen Wise, Agentic 6",
  description: "Explore an AI chat app where you can select your preferred GPT model, provide input, and obtain AI-generated output. Part of the Agentic 6 tutorial on creating an AI Starter Technology Stack.",
  openGraph: {
    title: "AI Starter Technology Stack - Agentic 6",
    description: "Explore AI chat with customizable GPT models. Select, input, and get AI-generated output.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Starter Technology Stack - Agentic 6",
    description: "Explore AI chat with customizable GPT models. Select, input, and get AI-generated output.",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-full bg-neutral-50 dark:bg-neutral-900`}>
        <Header />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
