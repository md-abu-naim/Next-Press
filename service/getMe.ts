"use server"

import { cookies } from "next/headers"

export const getMe = async () => {
    const cookieStore = await cookies()

    const accessToken = cookieStore.get('accessToken')?.value
    // const token = cookieStore.get("accessToken")?.value;

    if(!accessToken) {
        return {
            success: false,
            message: 'User not Logged in!'
        }
    }

    const res = await fetch(`${process.env.BACKEND_URL}/api/users/me`, {
        headers: {
            // Authorization: accessToken as unknown as string
            // Authorization: `${accessToken}`
            // Authorization: `Bearer ${accessToken}`

            Cookie: `accessToken=${accessToken}`,
        }
    })

    const result = res.json()

    console.log(result);

    return result
}