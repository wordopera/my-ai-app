import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
      <p className="mb-4">Last Updated: August 14, 2024</p>

      <ol className="list-decimal list-inside space-y-4">
        <li>
          <strong>Acceptance of Terms:</strong> By using Agentic6's AI Chat ("the Service"), 
          you agree to these Terms of Use.
        </li>
        <li>
          <strong>Use of Service:</strong> You agree to use the Service for lawful purposes only 
          and in a way that does not infringe on others' rights.
        </li>
        <li>
          <strong>User Content:</strong> You are responsible for the content you submit to the Service. 
          Do not submit illegal, offensive, or harmful content.
        </li>
        <li>
          <strong>Intellectual Property:</strong> The Service and its original content are protected 
          by copyright and other laws. You may not reproduce or distribute any part of the Service 
          without permission.
        </li>
        <li>
          <strong>Disclaimer of Warranties:</strong> The Service is provided "as is" without any 
          warranties, express or implied.
        </li>
        <li>
          <strong>Limitation of Liability:</strong> We are not liable for any damages arising from 
          your use of the Service.
        </li>
        <li>
          <strong>Changes to Terms:</strong> We reserve the right to modify these Terms at any time. 
          Continued use of the Service after changes constitutes acceptance of the new Terms.
        </li>
        <li>
          <strong>Governing Law:</strong> These Terms are governed by the laws of Canada.
        </li>
      </ol>

      <p className="mt-8">By using Agentic6's AI Chat, you acknowledge that you have read and understood these Terms of Use.</p>
    </div>
  );
};

export default TermsOfUse;