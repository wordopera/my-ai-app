import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = 'https://Agentic6.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Starter Technology Stack from Stephen Wise, Agentic 6",
  description: "Explore an AI chat app where you can select your preferred GPT model, provide input, and obtain AI-generated output. Part of the Agentic 6 tutorial on creating an AI Starter Technology Stack.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Agentic 6',
    title: "AI Starter Technology Stack - Agentic 6",
    description: "Explore AI chat with customizable GPT models. Select, input, and get AI-generated output.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Agentic 6 AI Starter Stack',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@agentic6",
    title: "AI Starter Technology Stack - Agentic 6",
    description: "Explore AI chat with customizable GPT models. Select, input, and get AI-generated output.",
    images: [`${siteUrl}/twitter-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}