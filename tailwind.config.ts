// File: tailwind.config.ts
// Last updated: August 15, 2024

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1fe',
          100: '#cce3fd',
          200: '#99c7fb',
          300: '#66aaf9',
          400: '#338ef7',
          500: '#0072f5', // Main primary color, used in button
          600: '#005bc4',
          700: '#004493',
          800: '#002e62',
          900: '#001731',
        },
        secondary: {
          // ... (keep existing secondary colors)
        },
        neutral: {
          // ... (keep existing neutral colors)
        },
      },
      // ... (keep other existing configurations)
    },
  },
  plugins: [],
};

export default config;
