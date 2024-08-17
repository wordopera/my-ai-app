// File: app/components/StructuredData.tsx
// August 17, 2024

import React from 'react';

const StructuredData: React.FC = () => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://agentic6.com/",
          "name": "Agentic 6",
          "description": "Unlock AI for Business Innovation",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://agentic6.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://twitter.com/agentic6",
            "https://www.youtube.com/@agentic6",
            "https://github.com/agentic6"
          ]
        })
      }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Agentic 6",
          "url": "https://agentic6.com/",
          "logo": "https://agentic6.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-647-696-6500",
            "contactType": "customer service"
          }
        })
      }}
    />
  </>
);

export default StructuredData;

// Last line