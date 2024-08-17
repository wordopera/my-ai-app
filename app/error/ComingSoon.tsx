// File: app/error/ComingSoon.tsx
// August 16, 2024

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ComingSoonProps {
  featureName: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ featureName }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-deepBlue-800 dark:to-deepBlue">
      <div className="text-center p-8 bg-white dark:bg-deepBlue-900 rounded-lg shadow-xl max-w-md">
        <Link href="/" className="inline-block mb-8">
          <Image src="/logo.png" alt="AI Starter Stack Logo" width={100} height={100} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Coming Soon</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          We're working hard to bring you {featureName}. Stay tuned!
        </p>
        <Link href="/" className="bg-primaryBlue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;