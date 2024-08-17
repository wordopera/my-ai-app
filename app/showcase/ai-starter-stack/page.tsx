// File: app/showcase/ai-starter-stack/page.tsx
// Last updated: August 16, 2024

"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import ChatBubble from "./components/ChatBubble";
import LoadingIndicator from "./components/LoadingIndicator";
import ModelSelector from "./components/ModelSelector";

const models = ["gpt-3.5-turbo", "gpt-4"];

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setError(null);
    const newMessage: ChatMessage = { role: "user", content: message };
    setChat((prevChat) => [...prevChat, newMessage, { role: "assistant", content: "" }]);
    setMessage("");

    try {
      const res = await fetch("/api/showcase/ai-starter-stack/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage.content, model: selectedModel }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Response body is not readable");

      let aiResponse = "";
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        aiResponse += chunk;
        setChat((prevChat) => {
          const newChat = [...prevChat];
          newChat[newChat.length - 1] = { role: "assistant", content: aiResponse };
          return newChat;
        });
      }

      if (!aiResponse.trim()) {
        throw new Error("Received an empty response from the server");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      setChat((prevChat) => prevChat.slice(0, -1)); // Remove the empty assistant message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 md:p-6 lg:p-8">
      <Toaster position="top-right" />
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">AI Chat App</h1>
      <div className="flex-grow overflow-y-auto mb-4 space-y-4">
        {chat.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        {error && (
          <div className="p-2 bg-red-100 text-red-700 rounded">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 md:p-3 text-sm md:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <ModelSelector
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          disabled={isLoading}
          className="w-full md:w-auto"
        />
        <button
          type="submit"
          className="w-full md:w-auto px-4 py-2 md:py-3 bg-primary-500 text-white rounded disabled:bg-gray-300 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? <LoadingIndicator /> : "Send"}
        </button>
      </form>
    </div>
  );
}