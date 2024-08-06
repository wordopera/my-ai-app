'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

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
}

export default function Home() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        console.error('Error fetching messages:', error)
      } else {
        setChat(data || [])
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
        body: JSON.stringify({ message })
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const { aiResponse } = await response.json()

      const newMessage: Message = {
        id: Date.now(),
        content: message,
        ai_response: aiResponse,
        created_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('messages')
        .insert(newMessage)

      if (error) {
        console.error('Error inserting message:', error)
      }

      setChat(prevChat => [newMessage, ...prevChat])
      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
      // Optionally, show an error message to the user
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">AI Chat App</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
      <div className="w-full max-w-md">
        {chat.map((msg) => (
          <div key={msg.id} className="mb-4">
            <p className="font-bold">You: {msg.content}</p>
            <p>AI: {msg.ai_response}</p>
          </div>
        ))}
      </div>
    </main>
  )
}