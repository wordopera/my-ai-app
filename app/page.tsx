'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

interface Message {
  id: number;
  content: string;
  ai_response: string;
  created_at: string;
  model: string;
}

const models = ["gpt-3.5-turbo", "gpt-4", "claude-2", "llama-2", "gemini-pro"];

export default function Home() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState(models[0])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50)

        if (error) {
          throw error;
        }

        setChat(data || [])
      } catch (error) {
        console.error('Error fetching messages:', error)
        toast.error('Failed to load chat history')
      }
    }

    fetchMessages()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, model: selectedModel })
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const { aiResponse } = await response.json()

      const newMessage: Message = {
        id: Date.now(),
        content: message,
        ai_response: aiResponse,
        created_at: new Date().toISOString(),
        model: selectedModel
      }

      setChat(prevChat => [newMessage, ...prevChat])
      setMessage('')
      toast.success('Message sent successfully')
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-bold mb-8">AI Chat App</h1>
      <div className="w-full max-w-2xl flex flex-col h-[calc(100vh-200px)]">
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <div className="flex space-x-2">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={isLoading}
            >
              {models.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
            <button 
              type="submit" 
              className="w-32 bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Send'}
            </button>
          </div>
        </form>
        <div className="flex-grow overflow-y-auto border border-gray-300 rounded p-4">
          {chat.map((msg) => (
            <div key={msg.id} className="mb-4 p-2 bg-gray-100 rounded">
              <p className="font-bold">You: {msg.content}</p>
              <p className="mt-1">AI ({msg.model}): {msg.ai_response}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
