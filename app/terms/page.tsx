// File: app/terms/page.tsx
// August 16, 2024

import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
      <p className="mb-4">Last Updated: August 14, 2024</p>

      <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
      <p className="mb-4">By using Agentic6’s app ("the Service"), you agree to these Terms of Use.</p>

      <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
      <p className="mb-4">You agree to use the Service for lawful purposes only and in a way that does not infringe on others' rights.</p>

      <h2 className="text-2xl font-semibold mb-4">3. User Content</h2>
      <p className="mb-4">You are responsible for the content you submit to the Service. Do not submit illegal, offensive, or harmful content.</p>

      <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
      <p className="mb-4">The Service and its original content are protected by copyright and other laws. You may not reproduce or distribute any part of the Service without permission.</p>

      <h2 className="text-2xl font-semibold mb-4">5. Disclaimer of Warranties</h2>
      <p className="mb-4">The Service is provided "as is" without any warranties, express or implied.</p>

      <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
      <p className="mb-4">We are not liable for any damages arising from your use of the Service.</p>

      <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
      <p className="mb-4">We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>

      <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
      <p className="mb-4">These Terms are governed by the laws of Canada.</p>

      <p className="mt-8 text-sm text-gray-600">By using Agent6’s service, you acknowledge that you have read and understood these Terms of Use.</p>
    </div>
  );
};

export default TermsOfUse;