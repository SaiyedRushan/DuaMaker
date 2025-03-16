'use client'

import type React from 'react'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  content: string
  sender: 'user' | 'other'
}

const responseMessages: Message[] = [
  {
    id: '1',
    content:
      'It is extremely important to include everything you need and want while making du’a, without holding back. No desire is too much for Allah to grant it. The Messenger of Allah (saw) said, ‘When one of you calls upon Allah, let him hope for the greatest of things. Verily, nothing has any greatness over Allah.’ [Ibn Hibban]',
    sender: 'other',
  },
  {
    id: '2',
    content:
      'The Messenger of Allah (saw) said, ‘Ask Allah for His favour. Verily, Allah Almighty loves to be asked and among the best acts of worship is to wait in expectation of relief.’ [Tirmidhi]',
    sender: 'other',
  },
  {
    id: '3',
    content:
      'The Prophet said, ‘The servant will continue to have his supplications answered as long as he does not ask for sin or cut family ties, and he is not impatient.’ They said, ‘O Messenger of Allah, what is its impatience?’ The Prophet said, ’He says, ”I have supplicated again and again, but I have not seen an answer.” He becomes frustrated with that and gives up supplicating”’. [Bukhari]',
    sender: 'other',
  },
  {
    id: '4',
    content: 'Good deeds elevate our du’as. Allah says, ‘To Him do good words go up and righteous action uplifts them.’ [The Noble Qur’an, 35:10]',
    sender: 'other',
  },
  {
    id: '5',
    content:
      'The Prophet (saw) said, ‘Du’a is worship itself’. Then the Prophet (saw) recited this verse, ‘Your Lord says: “Call upon Me and I will respond to you. Verily, those who disdain My worship will enter Hell in humiliation.” [The Noble Qur’an, 40:60]’. [Tirmidhi]',
    sender: 'other',
  },
  {
    id: '6',
    content:
      'SubhanAllah, raising our hands in du’a is a Sunnah with such a beautiful meaning behind it! We encourage you to remember the following hadith every time you physically raise your hands:The Prophet (saw) said, ‘Indeed your Lord - Blessed and Almighty is He - is Shy and Most Generous. He is shy when His servant raises his hands to Him (in du’a) to turn them away empty.’ [Abu Dawud]',
    sender: 'other',
  },
  {
    id: '7',
    content: 'Allah says, ‘And to Allah belong the Beautiful Names, so invoke Him by them.’ [The Noble Qur’an, 7:180]',
    sender: 'other',
  },
  {
    id: '8',
    content:
      'Don’t miss out on making du’a for other people! The Messenger of Allah (saw) said, ‘No Muslim servant supplicates for his brother behind his back but that an angel says, “And for you the same.“’ [Muslim]',
    sender: 'other',
  },
  {
    id: '9',
    content:
      'As Abu Zuhayr reported, ‘We went out one night with the Messenger of Allah (saw) and a man came to us who was earnestly supplicating to Allah for some matter. The Prophet stopped and listened to him, then he said, “It must be so if he seals it.” A man among the people said, “With what does he seal it?” The Prophet said, “Amin, for if he ends it with amin, it will be so…“’ [Abu Dawud]',
    sender: 'other',
  },
  {
    id: '10',
    content:
      'The Messenger of Allah (saw) said, ‘Ask Allah for His favour. Verily, Allah Almighty loves to be asked and among the best acts of worship is to wait in expectation of relief.’ [Tirmidhi]',
    sender: 'other',
  },
  {
    id: '11',
    content:
      'The Prophet (saw) said, ’There is no Muslim who calls upon Allah, without sin or cutting family ties, but that Allah will give him one of three answers: He will quickly fulfil his supplication, He will store it for him in the Hereafter, or He will divert an evil from him similar to it.′ They said, ‘In that case we will ask for more.’ The Prophet said, ′Allah has even more.′ [Ahmad]',
    sender: 'other',
  },
  {
    id: '12',
    content:
      'Prophet Muhammad PBUH said "Friday is twelve hours in which there is no Muslim slave who asks Allah (SWT) for something but He will give it to him, so seek it in the last hour after \'Asr." (Sunan Al Nisa’i).',
    sender: 'other',
  },
  {
    id: '13',
    content: 'Prophet Muhammad PBUH said “The nearest a slave can be to his Lord (Allāh) is while they are prostrating, so increase in supplication” (Muslim).',
    sender: 'other',
  },
  {
    id: '14',
    content:
      'Anas ibn Malik reported: The Messenger of Allah, peace and blessings be upon him, said, “Let one of you ask his Lord for his needs, all of them, even for a shoestring when his breaks.” (Sunan al-Tirmidhī 3973)',
    sender: 'other',
  },
]

const initialMessages: Message[] = [
  {
    id: '1',
    content:
      'Bismillahirrahmanirrahim. Don’t rush into your du’a without first praising Allah and then sending prayers upon our beloved Prophet (saw): The Prophet (saw) said, ‘When any one of you have performed Salah (prayer) and wants to supplicate, let him begin with praising His Lord (swt) and glorifying Him, then send prayers upon the Prophet (saw). Then he may supplicate for whatever he wishes.’ [Tirmidhi]',
    sender: 'other',
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage('')

    // Simulate response after a short delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * responseMessages.length)
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseMessages[randomIndex].content,
        sender: 'other',
      }

      setMessages((prev) => [...prev, responseMessage])
    }, 1000)
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
                  <img src="/hadith-bot.png" alt="" />
                </Avatar>
              )}

              <div className={cn('rounded-lg px-4 py-2', message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                <p>{message.content}</p>
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
