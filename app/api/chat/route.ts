import { OpenAI } from 'openai'
import { NextRequest, NextResponse } from 'next/server'
export const config = { runtime: 'edge' } // Increases timeout to 30s

const openai = new OpenAI({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
  apiKey: process.env.GEMINI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const instructions =
      'Please enhance the dua that the user enters. Use all the names of Allah and attributes that are relevant to the dua to make the dua more powerful. Provide english meaning in brackets for the names. Only respond with the enhanced dua in the english language, no other text. Keep it around 40 words.'
    const { message } = await req.json()
    const response = await openai.chat.completions.create({
      model: 'gemini-2.0-flash',
      messages: [
        { role: 'system', content: instructions },
        { role: 'user', content: message },
      ],
    })

    return NextResponse.json({ reply: response.choices[0].message.content })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 })
  }
}
