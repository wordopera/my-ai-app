// app/showcase/ai-starter-stack/page.tsx
// August 22, 2024

"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import ChatBubble from "./components/ChatBubble";
import LoadingIndicator from "./components/LoadingIndicator";
import ModelSelector from "./components/ModelSelector";
import { ModelProvider } from "./components/ModelContext";
import { models } from "./components/Models";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Home component for the AI Chat App.
 * Manages the chat interface, message submission, and response handling.
 */
export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [chatState, setChatState] = useState<ChatState>({
    isLoading: false,
    error: null
  });
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  }, [chat]);

  /**
   * Handles the submission of a new message to the AI chat.
   * Sends the message to the server, processes the streamed response,
   * and updates the chat state accordingly.
   * 
   * @param {React.FormEvent} e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatState({ isLoading: true, error: null });
    const newMessage: ChatMessage = { role: "user", content: message };
    setChat((prevChat) => [...prevChat, newMessage, { role: "assistant", content: "" }]);
    setMessage("");

    try {
      const res = await fetch("/api/showcase/ai-starter-stack/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage.content, model: models[0] }),
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
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        if (error.name === "TypeError" && error.message.includes("fetch")) {
          errorMessage = "Network error: Please check your internet connection.";
        } else if (error.name === "SyntaxError") {
          errorMessage = "Error parsing server response. Please try again.";
        } else {
          errorMessage = error.message;
        }
      }
      setChatState(prevState => ({ ...prevState, error: errorMessage }));
      toast.error(errorMessage);
      setChat((prevChat) => prevChat.slice(0, -1)); // Remove the empty assistant message
    } finally {
      setChatState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  return (
    <ModelProvider>
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <Toaster position="top-right" />
        <div className={`flex flex-col ${chat.length === 0 ? 'justify-end' : ''} flex-grow overflow-hidden p-4 md:p-6 lg:p-8`}>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">AI Chat App</h1>
          <div ref={chatContainerRef} className={`${chat.length > 0 ? 'h-[calc(70%*(100vh-12rem))]' : ''} overflow-y-auto mb-4 space-y-4`}>
            {chat.map((msg, index) => (
              <ChatBubble key={index} message={msg} />
            ))}
            {chatState.error && (
              <div className="p-2 bg-red-100 text-red-700 rounded">
                <p className="font-bold">Error:</p>
                <p>{chatState.error}</p>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className={`flex flex-col md:flex-row gap-2 ${chat.length > 0 ? 'h-[calc(20%*(100vh-12rem))]' : ''}`}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 md:p-3 text-sm md:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Type your question to the AI ..."
              disabled={chatState.isLoading}
            />
            <ModelSelector
              disabled={chatState.isLoading}
              className="w-full md:w-auto"
            />
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 md:py-3 bg-primary-500 text-white rounded disabled:bg-gray-300 flex items-center justify-center"
              disabled={chatState.isLoading}
            >
              {chatState.isLoading ? <LoadingIndicator /> : "Submit your question"}
            </button>
          </form>
        </div>
      </div>
    </ModelProvider>
  );
}

// Last line