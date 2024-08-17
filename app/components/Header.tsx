// File: app/components/Header.tsx
// August 16, 2024

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white dark:bg-deepBlue shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="AI Starter Stack Logo" width={40} height={40} />
            <span className="ml-2 text-2xl font-bold text-primaryBlue dark:text-white">
              AI Starter Stack
            </span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="nav-item text-gray-800 dark:text-white hover:text-fuschia dark:hover:text-fuschia">Home</Link>
            <Link href="/about" className="nav-item text-gray-800 dark:text-white hover:text-fuschia dark:hover:text-fuschia">About</Link>
            <div className="relative group">
              <button className="nav-item text-gray-800 dark:text-white hover:text-fuschia dark:hover:text-fuschia" aria-haspopup="true" aria-expanded="false">Demo</button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-deepBlue-800 shadow-lg rounded-md overflow-hidden transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                <Link href="/showcase/ai-starter-stack" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-deepBlue-700 transition-colors duration-200">AI Starter Stack</Link>
                <Link href="/showcase/custom-gpt" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-deepBlue-700 transition-colors duration-200">Custom GPT</Link>
                <Link href="/showcase/audio-to-text" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-deepBlue-700 transition-colors duration-200">Audio to Text</Link>
              </div>
            </div>
            <Link href="/contact" className="nav-item text-gray-800 dark:text-white hover:text-fuschia dark:hover:text-fuschia">Contact</Link>
          </nav>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-primaryBlue dark:text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && isMobileView && (
        <div className="md:hidden bg-white dark:bg-deepBlue py-4">
          <div className="container mx-auto px-4 space-y-4">
            <Link href="/" className="block nav-item text-gray-800 dark:text-white hover:text-fuschia dark:hover:text-fuschia">Home</Link>
            <Link href="/about" className="block nav-item text-gray-800 dark:text-white hover:text-fuschia dark:hover:text-fuschia">About</Link>
            <div className="space-y-2">
              <button className="block w-full text-left nav-item text-gray-800 dark:text-white hover:text-fuschia dark:hover:text-fuschia">Demo</button>
              <div className="pl-4 space-y-2">
                <Link href="/showcase/ai-starter-stack" className="block py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-deepBlue-700 transition-colors duration-200">AI Starter Stack</Link>
                <Link href="/showcase/custom-gpt" className="block py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-deepBlue-700 transition-colors duration-200">Custom GPT</Link>
                <Link href="/showcase/audio-to-text" className="block py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-deepBlue-700 transition-colors duration-200">Audio to Text</Link>
              </div>
            </div>
            <Link href="/contact" className="block nav-item text-gray-800 dark:text-white hover:text-fuschia dark:hover:text-fuschia">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;