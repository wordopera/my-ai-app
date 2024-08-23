// File: app/components/LoadingIndicator.tsx
// Last updated: August 15, 2024

import React from 'react';

interface LoadingIndicatorProps {
  color?: string;
  size?: number;
  text?: string;
  speed?: string; // Animation speed, e.g., 'fast', 'medium', 'slow'
  shape?: 'circle' | 'dots'; // Shape of the spinner
  loading?: boolean; // Control whether the spinner is displayed
}

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Processing...
    </div>
  );
};

export default LoadingIndicator;

// # color: Customizes the color of the spinner. Defaults to 'currentColor'.
// # size: Controls the size of the spinner in pixels. Defaults to 24px.
// # text: Custom text displayed next to the spinner. Defaults to 'Processing...'.
// # speed: Determines the speed of the spinner's animation. Can be 'fast', 'medium', or 'slow'. Defaults to 'medium'.
// # shape: Allows choosing between two shapes of spinners: 'circle' or 'dots'. Defaults to 'circle'.
// # loading: A boolean to control whether the spinner is displayed. Defaults to true

// last line