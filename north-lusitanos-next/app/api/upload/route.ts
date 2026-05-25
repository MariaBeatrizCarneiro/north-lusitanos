import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// POST /api/upload — faz upload de uma foto para o Supabase Storage
// Espera multipart/form-data com campo "file" e opcional "saddleId"
export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'Nenhum ficheiro enviado.' }, { status: 400 })
  }

  // Valida tipo de ficheiro
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Tipo de ficheiro não suportado. Usa JPEG, PNG ou WebP.' }, { status: 400 })
  }

  // Limita tamanho a 10 MB
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'Ficheiro demasiado grande (máx. 10 MB).' }, { status: 400 })
  }

  const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`

  const { error } = await supabaseAdmin.storage
    .from('saddle-photos')
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('saddle-photos')
    .getPublicUrl(fileName)

  return NextResponse.json({ url: publicUrl }, { status: 201 })
}
