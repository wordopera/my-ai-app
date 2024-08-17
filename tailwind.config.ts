// File: tailwind.config.ts
// Last updated: August 16, 2024

import type { Config } from 'tailwindcss';

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
          500: '#0072f5', // Primary Blue
          600: '#005bc4',
          700: '#004493',
          800: '#002e62',
          900: '#001731',
        },
        neutral: {
          lightGray: '#f0f0f0', // Light Gray
          darkGray: '#333333',  // Dark Gray
          white: '#ffffff',    // White
        },
        deepBlue: {
          DEFAULT: '#020659', // Deep Blue
          800: '#010440',
          900: '#01032E',
        },
        fuschia: '#F241A3', // Fuschia
        yellow: '#F2D544',  // Yellow
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        serif: ['var(--font-lato)', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      fontSize: {
        'h1': '2.5rem',
        'h2': '2rem',
        'h3': '1.75rem',
        'body': '1rem',
        'small': '0.875rem',
      },
      lineHeight: {
        'heading': '1.2',
        'body': '1.6',
      },
      spacing: {
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
      },
      borderRadius: {
        'full': '20px',
      },
      scale: {
        '105': '1.05',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideDown: 'slideDown 0.3s ease-in-out',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;