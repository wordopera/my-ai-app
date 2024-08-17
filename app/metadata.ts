// File: app/metadata.ts
// August 17, 2024
// called from layout.tsx

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Agentic 6: Unlock AI for Business Innovation",
  description: "Explore Agentic 6 on GitHub! Clear AI concepts, real-world applications, and business strategies. Transform your business with AI.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Agentic 6: Unlock AI for Business Innovation",
    description: "Explore Agentic 6 on GitHub! Clear AI concepts, real-world applications, and business strategies. Transform your business with AI.",
    url: "https://agentic6.com",
    siteName: "Agentic 6: Unlock AI for Business Innovation",
    images: [
      {
        url: "https://agentic6.com/og-image.png",
        width: 1200,
        height: 630,
      
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic 6: Unlock AI for Business Innovation",
    description: "Explore Agentic 6 on GitHub! Clear AI concepts, real-world applications, and business strategies. Transform your business with AI.",
    images: ["https://agentic6.com/twitter-image.png"],
  },
  alternates: {
    canonical: 'https://agentic6.com',
    languages: {
      'en': 'https://agentic6.com',
      'x-default': 'https://agentic6.com'
    }
  },
};

// Last line