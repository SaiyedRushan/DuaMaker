import { OpenAI } from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const instructions =
      'Please enhance the dua that the user enters. Use Allahs name and attributes that are relevant to the dua to make the dua more powerful. Only respond with the enhanced dua, no other text.'
    const { message } = await req.json()
    const response = await openai.chat.completions.create({
      model: 'deepseek-chat',
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
