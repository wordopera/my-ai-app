"use client";

import { useState, useRef, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

const models = ["gpt-3.5-turbo", "gpt-4"];

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
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
    const newMessage = { role: "user", content: message };
    setChat((prevChat) => [...prevChat, newMessage, { role: "assistant", content: "" }]);
    setMessage("");

    try {
      const res = await fetch("/api/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage.content, model: selectedModel }),
      });

      if (!res.ok) {
        let errorMessage = `HTTP error! status: ${res.status}`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If parsing JSON fails, we'll use the default error message
        }
        throw new Error(errorMessage);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Response body is not readable");

      let aiResponse = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
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
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-bold mb-8">AI Chat App</h1>
      <div className="w-full max-w-2xl flex flex-col h-[calc(100vh-200px)]">
        <div className="flex-grow overflow-y-auto border border-gray-300 rounded p-4 mb-4">
          {chat.map((msg, index) => (
            <div key={index} className="mb-4 p-2 bg-gray-100 rounded">
              <p className="font-bold">{msg.role === "user" ? "You" : "AI"}:</p>
              <p>{msg.content}</p>
            </div>
          ))}
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded"
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="p-2 border border-gray-300 rounded"
              disabled={isLoading}
            >
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
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
              </>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}