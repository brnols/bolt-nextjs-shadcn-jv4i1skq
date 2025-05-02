import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/main']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('access_token')?.value
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
    if (isProtected && !token) {
        const mainUUIDMatch = pathname.match(/^\/main\/([^\/]+)(?:\/.*)?$/)
        if (mainUUIDMatch) {
            const uuid = mainUUIDMatch[1]
            const redirectUrl = new URL(`/login/${uuid}`, request.url)
            return NextResponse.redirect(redirectUrl)
        }
        const fallbackLoginUrl = new URL('/login/dashboard', request.url)
        return NextResponse.redirect(fallbackLoginUrl)
    }
    return NextResponse.next()
}
