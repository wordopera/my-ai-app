// File: app/metadata.ts
// August 16, 2024

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Starter Stack',
  description: 'Empower your projects with cutting-edge AI technology',
  openGraph: {
    title: 'AI Starter Stack',
    description: 'Empower your projects with cutting-edge AI technology',
    url: 'https://www.aistarterstact.com',
    siteName: 'AI Starter Stack',
    images: [
      {
        url: 'https://www.aistarterstact.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Starter Stack',
    description: 'Empower your projects with cutting-edge AI technology',
    creator: '@Agentic6',
    images: ['https://www.aistarterstact.com/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

// Last line