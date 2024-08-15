// File: app/hooks/useDarkMode.ts
// Last updated: August 15, 2024

import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setIsDarkMode(event.matches);
    darkModeMediaQuery.addEventListener('change', handler);

    return () => darkModeMediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
