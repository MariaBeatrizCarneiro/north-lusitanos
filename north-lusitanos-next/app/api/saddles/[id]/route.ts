import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import type { SaddleInput } from '@/types/saddle'

type Params = { params: Promise<{ id: string }> }

// GET /api/saddles/[id]
export async function GET(_req: Request, { params }: Params) {
  const { id } = await params
  const { data, error } = await supabaseAdmin
    .from('saddles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

// PUT /api/saddles/[id] — atualiza sela (admin)
export async function PUT(request: Request, { params }: Params) {
  const { id } = await params
  const body: Partial<SaddleInput> = await request.json()

  const { data, error } = await supabaseAdmin
    .from('saddles')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// DELETE /api/saddles/[id] — elimina sela e as suas fotos (admin)
export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params

  // Busca as fotos para as eliminar do storage
  const { data: saddle } = await supabaseAdmin
    .from('saddles')
    .select('photos')
    .eq('id', id)
    .single()

  if (saddle?.photos?.length) {
    const paths = saddle.photos.map((url: string) => {
      // Extrai o path relativo do URL público
      const marker = '/saddle-photos/'
      const idx = url.indexOf(marker)
      return idx !== -1 ? url.slice(idx + marker.length) : url
    })
    await supabaseAdmin.storage.from('saddle-photos').remove(paths)
  }

  const { error } = await supabaseAdmin.from('saddles').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}
