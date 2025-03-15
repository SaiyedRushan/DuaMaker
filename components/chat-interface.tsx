'use client'

import type React from 'react'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

// Define message type
interface Message {
  id: string
  content: string
  sender: 'user' | 'other'
  timestamp: Date
}

// Sample initial messages
const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! How can I help you today?',
    sender: 'other',
    timestamp: new Date('2023-10-01T10:00:00'), // Hardcoded time
  },
  {
    id: '2',
    content: 'I have a question about the new features.',
    sender: 'user',
    timestamp: new Date('2023-10-01T10:01:00'), // Hardcoded time
  },
  {
    id: '3',
    content: "Sure, I'd be happy to explain the new features. What would you like to know specifically?",
    sender: 'other',
    timestamp: new Date('2023-10-01T10:02:00'), // Hardcoded time
  },
  {
    id: '4',
    content: "Sure, I'd be happy to explain the new features. What would you like to know specifically?",
    sender: 'other',
    timestamp: new Date('2023-10-01T10:02:00'), // Hardcoded time
  },
  {
    id: '5',
    content: 'Hello! How can I help you today?',
    sender: 'other',
    timestamp: new Date('2023-10-01T10:00:00'), // Hardcoded time
  },
  {
    id: '6',
    content: 'I have a question about the new features.',
    sender: 'user',
    timestamp: new Date('2023-10-01T10:01:00'), // Hardcoded time
  },
  {
    id: '7',
    content: "Sure, I'd be happy to explain the new features. What would you like to know specifically?",
    sender: 'other',
    timestamp: new Date('2023-10-01T10:02:00'), // Hardcoded time
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    // Create new message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage])
    setNewMessage('')

    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I received your message: "${newMessage}"`,
        sender: 'other',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, responseMessage])
    }, 1000)
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex h-full flex-col ">
      {/* Messages area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 pb-4">
          {messages.map((message) => (
            <div key={message.id} className={cn('flex items-end gap-2 max-w-[80%]', message.sender === 'user' ? 'ml-auto justify-end' : '')}>
              {message.sender === 'other' && (
                <Avatar className="h-8 w-8">
                  <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center rounded-full text-sm font-medium">A</div>
                </Avatar>
              )}

              <div className={cn('rounded-lg px-4 py-2', message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                <p>{message.content}</p>
                <p className={cn('text-xs mt-1', message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{formatTime(message.timestamp)}</p>
              </div>

              {message.sender === 'user' && (
                <Avatar className="h-8 w-8">
                  <div className="bg-secondary text-secondary-foreground flex h-full w-full items-center justify-center rounded-full text-sm font-medium">U</div>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message input */}
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message..." className="flex-1" />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
