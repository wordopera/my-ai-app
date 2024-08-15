// File: app/components/Footer.tsx
// Last updated: August 15, 2024

import React from 'react';
import { Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © 2024 Stephen's AI Chat. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/privacy-policy"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition duration-150 ease-in-out"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition duration-150 ease-in-out"
            >
              Terms of Use
            </Link>
            <a
              href="https://x.com/agentic6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition duration-150 ease-in-out"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
