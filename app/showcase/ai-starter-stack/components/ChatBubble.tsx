// File: app/components/ChatBubble.tsx
// Last updated: August 15, 2024

import React from 'react';

interface ChatBubbleProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`mb-4 ${isUser ? 'text-right' : 'text-left'}`}>
      <div
        className={`inline-block p-2 md:p-3 rounded-lg max-w-[75%] md:max-w-[70%] lg:max-w-[60%] ${
          isUser
            ? 'bg-primary-500 text-white'
            : 'bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100'
        }`}
      >
        <p className="text-sm md:text-base">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatBubble;

// last line
