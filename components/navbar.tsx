'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const routes = [
  { href: '/chat?tab=Chat', label: 'Chat' },
  { href: '/chat?tab=Saved', label: 'Saved' },
  { href: '/chat?tab=Craft', label: 'Craft' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <div className="mr-4 flex items-center md:mr-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Dua Maker</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetTitle>Dua Maker</SheetTitle>
              <nav className="flex flex-col gap-4 pt-10">
                {routes.map((route) => (
                  <Link key={route.href} href={route.href} className="text-lg font-medium transition-colors hover:text-primary" onClick={() => setIsOpen(false)}>
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <nav className="hidden  items-center space-x-6 md:flex">
            {routes.map((route) => (
              <Link key={route.href} href={route.href} className="text-sm font-medium transition-colors hover:text-primary">
                {route.label}
              </Link>
            ))}
          </nav>
          <ModeToggle />
          <Button className="hidden md:flex">Sign In</Button>
        </div>
      </div>
    </header>
  )
}
