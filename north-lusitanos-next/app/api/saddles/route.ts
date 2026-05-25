import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import type { SaddleInput } from '@/types/saddle'

// GET /api/saddles — lista todas as selas (público)
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('saddles')
    .select('*')
    .order('sold', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

// POST /api/saddles — cria sela nova (admin)
export async function POST(request: Request) {
  const body: SaddleInput = await request.json()

  const { data, error } = await supabaseAdmin
    .from('saddles')
    .insert([body])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data, { status: 201 })
}
