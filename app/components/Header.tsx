// File: app/components/Header.tsx
// Last updated: August 15, 2024

import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Agentic 6 Logo" width={50} height={50} />
          <h1 className="ml-3 text-3xl font-bold text-gray-900 dark:text-white">Agentic 6</h1>
        </Link>
        <p className="text-gray-600 dark:text-gray-300">
          Select GPT model, input query, get AI output
        </p>
      </div>
    </header>
  );
};

export default Header;
