// File: app/about/page.tsx
// August 16, 2024

import React from 'react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-h1 font-bold text-deepBlue dark:text-white mb-8 text-center">About Agentic 6</h1>
      <div className="bg-lightGray dark:bg-deepBlue-800 rounded-lg shadow-md p-8">
        <div className="max-w-3xl mx-auto text-body text-gray-600 dark:text-gray-300 space-y-6">
          <p>
            Agentic6 is a cutting-edge platform designed to empower developers and businesses with the latest in AI technology. Our mission is to make AI integration simple, efficient, and accessible to everyone.
          </p>
          <p>
            Founded in 2024, we've quickly grown to become a leader in providing AI solutions that are both powerful and easy to implement. Our team of experts is passionate about pushing the boundaries of what's possible with AI, always with a focus on practical, real-world applications.
          </p>
          <p>
            Whether you're a startup looking to integrate AI into your product, or an established company aiming to optimize your processes, Agentic 6 has the tools and expertise you need to succeed in the AI-driven future.
          </p>
        </div>
      </div>
    </div>
  );
}
// Last line