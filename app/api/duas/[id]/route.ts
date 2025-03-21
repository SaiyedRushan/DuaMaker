import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET single dua
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabase.from('saved_duas').select('*').eq('id', params.id).single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error fetching dua' }, { status: 500 })
  }
}

// PUT update dua
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { dua } = await request.json()
    const { data, error } = await supabase.from('saved_duas').update({ dua, updated_at: new Date().toISOString() }).eq('id', params.id).select().single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error updating dua' }, { status: 500 })
  }
}

// DELETE dua
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase.from('saved_duas').delete().eq('id', params.id)
    if (error) throw error
    return NextResponse.json({ message: 'Dua deleted successfully' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error deleting dua' }, { status: 500 })
  }
}
