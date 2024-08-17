// File: app/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Montserrat, Lato } from 'next/font/google';
import ClientLayout from './clientLayout';

// Font configurations (unchanged)
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});
const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata: Metadata = {
  // ... (unchanged)
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans bg-white dark:bg-deepBlue text-darkGray dark:text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};

export default RootLayout;