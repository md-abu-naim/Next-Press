import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtUtils } from './utils/jwt'
import { cookies } from 'next/headers'

const AUTH_ROUTES = ['/login', '/register']
const PUBLIC_ROUTES = ['/', '/news', '/login', '/register']

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const cookieStore = await cookies()

    const accessToken = request.cookies.get("accessToken")?.value

    const decodedToken = accessToken ? await jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null

    let userRole = null

    if(!decodedToken?.success){
        cookieStore.delete('accessToken')
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (decodedToken?.success && decodedToken.data) {
        userRole = (decodedToken as JwtPayload).role
    }

    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === 'USER') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        else if (userRole === 'AUTHOR') {
            return NextResponse.redirect(new URL('/author-dashboard', request.url))
        }
        else if (userRole === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        } else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    const isPublic = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))

    if (!accessToken && !isPublic) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (pathname.startsWith('/dashboard') && userRole !== 'USER') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    if (pathname.startsWith('/admin-dashboard') && userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    if (pathname.startsWith('/author-dashboard') && userRole !== 'AUTHOR') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // '/dashboard/:path*',
        // '/admin-dashboard/:path*'
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)',
    ],
}