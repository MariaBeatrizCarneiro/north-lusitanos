import { cookies } from 'next/headers'

const COOKIE_NAME = 'nl_admin_auth'
// Cookie tem validade de 8 horas
const MAX_AGE = 60 * 60 * 8

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  return token === process.env.ADMIN_SESSION_TOKEN
}

export async function setAdminCookie() {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, process.env.ADMIN_SESSION_TOKEN!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  })
}

export async function clearAdminCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
