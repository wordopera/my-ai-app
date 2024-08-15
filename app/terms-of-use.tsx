// app/terms-of-use.tsx
import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
      {/* Add your terms of use content here */}
      <p>Last updated: August 14, 2024</p>
      <ol className="list-decimal list-inside space-y-4">
        <li>
          <strong>Acceptance of Terms:</strong> By using Stephen's AI Chat ("the Service"), 
          you agree to these Terms of Use.
        </li>
        {/* ... rest of your terms of use ... */}
      </ol>
    </div>
  );
};

export default TermsOfUse;