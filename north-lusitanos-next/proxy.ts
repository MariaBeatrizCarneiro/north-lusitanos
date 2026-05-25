import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'nl_admin_auth'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protege todas as rotas /admin excepto /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get(COOKIE_NAME)?.value
    const validToken = process.env.ADMIN_SESSION_TOKEN

    if (!token || token !== validToken) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
