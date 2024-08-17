import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMegaMenu = () => setIsMegaMenuOpen(!isMegaMenuOpen);

  return (
    <header className="bg-white dark:bg-deepBlue shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="AI Starter Stack Logo" width={40} height={40} />
              <span className="ml-2 text-2xl font-bold text-primaryBlue dark:text-white">
                AI Starter Stack
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About</Link>
            <div className="relative">
              <button onClick={toggleMegaMenu} className="nav-link">Solutions</button>
              {isMegaMenuOpen && (
                <div className="absolute top-full left-0 w-64 bg-white dark:bg-deepBlue shadow-lg rounded-md p-4 fade-in slide-down">
                  <Link href="/solutions/ai-starter-stack" className="block py-2 hover:text-fuschia">Agentic6</Link>
                  <Link href="/solutions/custom-gpt" className="block py-2 hover:text-fuschia">Custom GPT</Link>
                  <Link href="/solutions/audio-to-text" className="block py-2 hover:text-fuschia">Audio to Text</Link>
                </div>
              )}
            </div>
            <Link href="/contact" className="nav-link">Contact</Link>
          </nav>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-primaryBlue dark:text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-deepBlue py-4 fade-in">
          <div className="container mx-auto px-4 space-y-4">
            <Link href="/" className="block nav-link">Home</Link>
            <Link href="/about" className="block nav-link">About</Link>
            <button onClick={toggleMegaMenu} className="block w-full text-left nav-link">Solutions</button>
            {isMegaMenuOpen && (
              <div className="pl-4 space-y-2 fade-in">
                <Link href="/solutions/ai-starter-stack" className="block hover:text-fuschia">Agentic6</Link>
                <Link href="/solutions/custom-gpt" className="block hover:text-fuschia">Custom GPT</Link>
                <Link href="/solutions/audio-to-text" className="block hover:text-fuschia">Audio to Text</Link>
              </div>
            )}
            <Link href="/contact" className="block nav-link">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;