import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtUtils } from './utils/jwt'
import { cookies } from 'next/headers'
import { getNewAccessToken } from './service/getNewAccessToken'

const AUTH_ROUTES = ['/login', '/register']
const PUBLIC_ROUTES = ['/', '/news', '/login', '/register']

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const cookieStore = await cookies()

    let accessToken = request.cookies.get("accessToken")?.value
    const refreshToken = request.cookies.get("refreshToken")?.value

    let decodedAccessToken = accessToken ? await jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null
    const decodedRefreshToken = refreshToken ? await jwtUtils.verifyToken(refreshToken, process.env.JWT_ACCESS_SECRET as string) : null

    let userRole = null

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getNewAccessToken()

        if (result.success) {
            const newAccessToken = result.data.accessToken

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: 'lax'
            })

            accessToken = newAccessToken
            decodedAccessToken =  await jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string)
        }
    }

    if (!decodedAccessToken?.success) {
        cookieStore.delete('accessToken')
        // return NextResponse.redirect(new URL('/login', request.url))
    }

    if (decodedAccessToken?.success && decodedAccessToken.data) {
        userRole = (decodedAccessToken as JwtPayload).role
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