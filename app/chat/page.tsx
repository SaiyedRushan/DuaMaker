'use client'

import { ChatSidebar } from '@/components/chat-sidebar'
import { ChatInterface } from '@/components/chat-interface'

export default function ChatPage() {
  return (
    // 64 px is the height of the navbar
    <div className="flex flex-1 max-h-[calc(100vh-63px)]">
      <ChatSidebar />
      <div className="flex flex-1 flex-col">
        <header className="border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <h1 className="text-xl font-bold">Chat Room</h1>
        </header>
        <main className="flex flex-1 flex-col overflow-hidden">
          <ChatInterface />
        </main>
      </div>
    </div>
  )
}
