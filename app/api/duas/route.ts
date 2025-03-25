import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all duas
export async function GET() {
  try {
    const { data, error } = await supabase.from('saved_duas').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error fetching duas' }, { status: 500 })
  }
}

// POST new dua
export async function POST(request: Request) {
  try {
    const { dua, title } = await request.json()
    const { data, error } = await supabase
      .from('saved_duas')
      .insert([{ dua, title, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error creating dua' }, { status: 500 })
  }
}
