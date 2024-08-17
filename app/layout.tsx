// File: app/layout.tsx
// August 17, 2024

import React from 'react';
import { Montserrat, Lato } from 'next/font/google';
import ClientLayout from './clientLayout';
import { metadata } from './metadata';
import StructuredData from './components/StructuredData';

// Font configurations
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

export { metadata };

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <StructuredData />
      </head>
      <body className="font-sans bg-white dark:bg-deepBlue text-darkGray dark:text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};

export default RootLayout;

// Last line