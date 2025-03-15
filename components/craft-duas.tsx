'use client'

import type React from 'react'

import { useState, useRef } from 'react'
import { Send, Save, RefreshCw, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import Link from 'next/link'
export function CraftDuas() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [regeneratePrompt, setRegeneratePrompt] = useState('')
  const responseRef = useRef<HTMLDivElement>(null)

  // Mock API call with delay
  const mockApiCall = async (inputPrompt: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a mock response based on the prompt
        const responses = [
          `Here's a response to "${inputPrompt}". This is a simulated API response that would normally come from the ChatGPT API.`,
          `I've analyzed your prompt: "${inputPrompt}". Here's what I think about it... [detailed mock response]`,
          `Regarding "${inputPrompt}": This is an interesting question. Let me provide some insights based on the latest information available.`,
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        resolve(randomResponse)
      }, 1500) // Simulate a 1.5 second API delay
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prompt.trim()) return

    setIsLoading(true)
    setResponse(null)

    try {
      const apiResponse = await mockApiCall(prompt)
      setResponse(apiResponse)

      // Scroll to response
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (error) {
      toast.error(`Failed to get response from API: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerate = async () => {
    if (!regeneratePrompt.trim()) return

    setIsLoading(true)

    try {
      // Combine original prompt with regeneration prompt
      const combinedPrompt = `Original prompt: "${prompt}". Follow-up: "${regeneratePrompt}"`
      const apiResponse = await mockApiCall(combinedPrompt)
      setResponse(apiResponse)
      setIsRegenerating(false)
      setRegeneratePrompt('')

      // Scroll to response
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (error) {
      toast.error(`Failed to regenerate response: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = () => {
    if (!response) return
    toast.success('Response saved', {
      action: (
        <Button variant="outline" asChild>
          <Link href="/chat?tab=Saved">View</Link>
        </Button>
      ),
      richColors: true,
    })
  }

  const handleDiscard = () => {
    setResponse(null)
    setPrompt('')
    setIsRegenerating(false)
    setRegeneratePrompt('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, type: 'submit' | 'regenerate') => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (type === 'submit') {
        handleSubmit(e as React.FormEvent)
      } else if (type === 'regenerate') {
        handleRegenerate()
      }
    }
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card className="mb-6  border-0">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Enter your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-y"
                disabled={isLoading}
                onKeyDown={(e) => handleKeyDown(e, 'submit')}
              />
            </div>
            <Button type="submit" disabled={!prompt.trim() || isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {response && (
        <Card className="mb-6" ref={responseRef}>
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap rounded-md bg-muted p-4">{response}</div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setIsRegenerating(true)} disabled={isLoading}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
            <Button variant="outline" onClick={handleSave} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" onClick={handleDiscard} disabled={isLoading}>
              <Trash2 className="mr-2 h-4 w-4" />
              Discard
            </Button>
          </CardFooter>
        </Card>
      )}

      {isRegenerating && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Regenerate Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="bg-muted">
                <AlertDescription>Enter a follow-up question or modification to refine your original prompt.</AlertDescription>
              </Alert>
              <Textarea
                placeholder="How would you like to refine your prompt?"
                value={regeneratePrompt}
                onChange={(e) => setRegeneratePrompt(e.target.value)}
                className="min-h-[100px] resize-y"
                disabled={isLoading}
                onKeyDown={(e) => handleKeyDown(e, 'regenerate')}
              />
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleRegenerate} disabled={!regeneratePrompt.trim() || isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Submit
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsRegenerating(false)
                    setRegeneratePrompt('')
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
