// File: app/components/Footer.tsx
// August 17, 2024

import React from 'react';
import Link from 'next/link';
import { Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-deepBlue text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-h3 font-bold mb-4">Agentic 6</h3>
            <p className="text-small mb-4">Empowering business with embedded AI</p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/agentic6" target="_blank" rel="noopener noreferrer" className="text-white hover:text-fuschia transition duration-200">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://www.youtube.com/@agentic6" target="_blank" rel="noopener noreferrer" className="text-white hover:text-fuschia transition duration-200">
                <Youtube size={24} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-h3 font-bold mb-4">Demos</h4>
            <ul className="space-y-2">
              <li><Link href="/showcase/ai-starter-stack" className="hover:text-fuschia transition duration-200">AI Starter Stack</Link></li>
              <li><Link href="/showcase/custom-gpt" className="hover:text-fuschia transition duration-200">Custom GPT</Link></li>
              <li><Link href="/showcase/audio-to-text" className="hover:text-fuschia transition duration-200">Audio to Text</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-h3 font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-fuschia transition duration-200">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-fuschia transition duration-200">Contact</Link></li>
              <li><Link href="/join-us" className="hover:text-fuschia transition duration-200">Join Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-h3 font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-fuschia transition duration-200">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-fuschia transition duration-200">Terms of Use</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-small">&copy; 2024 Agentic6. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;