// File: app/error/not-found.tsx
// August 16, 2024

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-lightGray dark:bg-deepBlue">
      <div className="text-center">
        <h1 className="text-h1 font-bold text-deepBlue dark:text-white mb-4">404 - Page Not Found</h1>
        <p className="text-body text-gray-600 dark:text-gray-300 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link href="/" className="btn btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
}
// Last line