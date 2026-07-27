"use server"

import { verifyToken } from "@/utils/jwt"
import { cookies } from "next/headers"

export const getNewAccessToken = async () => {
    const cookieStore = await cookies()

    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
        return {
            success: false,
            message: 'User not Logged in!'
        }
    }

    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
            Cookie: `refreshToken=${refreshToken}`,
        },
        cache: 'no-cache'
    })

    const result = await res.json()

    console.log(result);

    return result
}

export const isAccessTokenExists = async () => {
    const cookieStore = await cookies()

    let accessToken = cookieStore.get('accessToken')?.value
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!accessToken && !refreshToken) {
        return {
            success: false,
            message: 'User not Logged in!'
        }
    }

    const decodedAccessToken = accessToken ? await verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null
    const decodedRefreshToken = refreshToken ? await verifyToken(refreshToken, process.env.JWT_ACCESS_SECRET as string) : null

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
        }
    }

    return accessToken
}