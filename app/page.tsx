// File: app/page.tsx
// August 17, 2024

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-deepBlue dark:text-white mb-4">
          Unlock AI for Business Innovation
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Clear AI concepts, real-world applications, and business strategies. Transform your business with AI
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <Link href="/showcase/ai-starter-stack" className="bg-primary-500 text-white rounded-full px-6 py-3 font-semibold hover:bg-primary-600 hover:scale-105 transition-all duration-300">
            Explore Solutions
          </Link>
          <Link href="/about" className="bg-yellow text-deepBlue rounded-full px-6 py-3 font-semibold hover:bg-fuschia hover:text-white hover:scale-105 transition-all duration-300">
            Learn More
          </Link>
        </div>
        
        {/* New Content Section */}
        <div className="bg-white dark:bg-deepBlue-800 p-6 md:p-8 rounded-lg shadow-md mb-12 text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-deepBlue dark:text-white mb-4">
            🚀 Agentic 6: Illuminating the AI Landscape
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Attention all business visionaries, AI enthusiasts, and curious minds! 🧠💡 We're thrilled to announce the launch of – your new gateway to understanding AI technology and its business implications!
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-deepBlue dark:text-white mb-3">
            What's in Store? 📚
          </h3>
          <ul className="list-none space-y-2 mb-6">
            <li className="flex items-start">
              <span className="mr-2">🎨</span>
              <span>Clear, accessible explanations of AI concepts and technologies</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🏢</span>
              <span>Real-world examples of AI applications in various industries</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🔮</span>
              <span>Insights into potential AI-driven business strategies</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🤝</span>
              <span>A community-driven platform for sharing ideas and insights</span>
            </li>
          </ul>
          <h3 className="text-xl md:text-2xl font-bold text-deepBlue dark:text-white mb-3">
            Why Agentic 6? 🤔
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Because understanding AI shouldn't require a Ph.D.! We're bridging the gap between complex technology and practical business applications.
          </p>
        </div>
      </div>
      
      {/* Existing Cards Section */}
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