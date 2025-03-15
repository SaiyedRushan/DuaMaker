'use client'

import { useState } from 'react'
import { ArrowRight, MessageSquare, PenSquare, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface ChatSidebarProps {
  className?: string
  onTabChange: (tab: string) => void
}

export function ChatSidebar({ className, onTabChange }: ChatSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sidebarItems = [
    { icon: MessageSquare, label: 'Chat' },
    { icon: Save, label: 'Saved' },
    { icon: PenSquare, label: 'Craft' },
  ]

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <nav className="flex-1 my-4 md:p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Button variant="ghost" className="w-full justify-start p-0 md:p-4" onClick={() => onTabChange(item.label)}>
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="absolute right-4 top-[75px] z-20">
            <ArrowRight className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[240px]">
          <SheetTitle hidden>Chat Menu</SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className={cn('hidden border-r md:block w-[240px]', className)}>
        <SidebarContent />
      </div>
    </>
  )
}
