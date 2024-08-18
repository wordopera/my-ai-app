// File: app/clientLayout.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Sun, Moon } from 'lucide-react';
import './globals.css';
import { registerServiceWorker } from './utils/register-sw';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    registerServiceWorker();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Header />
      <main className={`flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 ${darkMode ? 'dark' : ''}`}>
        {children}
      </main>
      <Footer />
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-4 right-4 p-2 rounded-full bg-white text-fuschia dark:bg-primary-500 dark:text-white hover:bg-fuschia hover:text-white dark:hover:bg-fuschia transition-all duration-200 ease-in-out"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </>
  );
};

export default ClientLayout;