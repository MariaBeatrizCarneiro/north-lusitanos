import { NextResponse } from 'next/server'
import { setAdminCookie } from '@/lib/auth'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    // Pequeno delay para dificultar brute force
    await new Promise(r => setTimeout(r, 800))
    return NextResponse.json({ error: 'Password incorreta.' }, { status: 401 })
  }

  await setAdminCookie()
  return NextResponse.json({ ok: true })
}
