// File: app/page.tsx
// August 16, 2024

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-h1 font-bold text-deepBlue dark:text-white mb-4">Welcome to AI Starter Stack</h1>
        <p className="text-body text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Empower your projects with cutting-edge AI technology. Explore our solutions and get started today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/showcase" className="btn btn-primary">
            Explore Solutions
          </Link>
          <Link href="/about" className="btn bg-yellow text-deepBlue hover:bg-fuschia hover:text-white hover:scale-105 transition duration-200">
            Learn More
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-lightGray dark:bg-deepBlue-800 p-6 rounded-lg shadow-md">
          <h2 className="text-h3 font-bold mb-4">AI Starter Stack</h2>
          <p className="mb-4">Get your AI project off the ground quickly with our comprehensive starter kit.</p>
          <Link href="/showcase/ai-starter-stack" className="text-primaryBlue dark:text-fuschia hover:underline">Learn more →</Link>
        </div>
        <div className="bg-lightGray dark:bg-deepBlue-800 p-6 rounded-lg shadow-md">
          <h2 className="text-h3 font-bold mb-4">Custom GPT</h2>
          <p className="mb-4">Tailor GPT models to your specific needs with our customization tools.</p>
          <Link href="/showcase/custom-gpt" className="text-primaryBlue dark:text-fuschia hover:underline">Learn more →</Link>
        </div>
        <div className="bg-lightGray dark:bg-deepBlue-800 p-6 rounded-lg shadow-md">
          <h2 className="text-h3 font-bold mb-4">Audio to Text</h2>
          <p className="mb-4">Convert audio files to text with high accuracy using our advanced AI models.</p>
          <Link href="/showcase/audio-to-text" className="text-primaryBlue dark:text-fuschia hover:underline">Learn more →</Link>
        </div>
      </div>
    </div>
  );
}
// Last line