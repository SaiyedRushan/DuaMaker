'use client'

import { useEffect, useState } from 'react'
import { ChatSidebar } from '@/components/chat-sidebar'
import { ChatInterface } from '@/components/chat-interface'
import { SavedDuas } from '@/components/saved-duas'
import { CraftDuas } from '@/components/craft-duas'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ChatPage() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState(searchParams.get('tab') || 'Chat')
  const router = useRouter()
  useEffect(() => {
    setTab(searchParams.get('tab') || 'Chat')
  }, [searchParams])

  const handleTabChange = (tab: string) => {
    // rather than using the setTab function, we will use the searchParams to change the tab
    router.push(`/chat?tab=${tab}`)
  }

  return (
    // 64 px is the height of the navbar
    <div className="flex flex-1 max-h-[calc(100vh-63px)]">
      <ChatSidebar onTabChange={handleTabChange} />
      <div className="flex flex-1 flex-col">
        <header className="border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <h1 className="text-xl font-bold">
            {tab === 'Chat' && 'Talk your heart out'}
            {tab === 'Saved' && 'Saved Duas'}
            {tab === 'Craft' && 'Craft Duas'}
          </h1>
        </header>
        <main className="flex flex-1 flex-col overflow-hidden">
          {tab === 'Chat' && <ChatInterface />}
          {tab === 'Saved' && <SavedDuas />}
          {tab === 'Craft' && <CraftDuas />}
        </main>
      </div>
    </div>
  )
}
