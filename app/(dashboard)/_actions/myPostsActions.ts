/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

type loginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: Record<string, any>
}

export const createPost = async(PreveState: loginState, formData: FormData) => {
    const payload = {
        title: formData.get('title'),
        content: formData.get('content'),
        thumbnail: formData.get('thumbnail'),
        tags: (formData.get("tags") as string).split(', '),
        isPremium: formData.get("isPremium") === 'on'
    };

    const cookieStore = await cookies()

    const accessToken = cookieStore.get('accessToken')?.value

    if (!accessToken) {
        return {
            success: false,
            message: 'User not Logged in!'
        }
    }

    const res = await fetch(`${process.env.BACKEND_URL}/api/posts`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await res.json()

    if(result.success){
        revalidateTag('my-posts', 'max')
    }

    if(result.success && result.data.isPremium){
        revalidateTag('premium-posts', 'max')
    }else{
        revalidateTag('public-posts', 'max')
    }

    return result
}

export const getMyPosts = async () => {
    const cookieStore = await cookies()

    const accessToken = cookieStore.get('accessToken')?.value

    if (!accessToken) {
        return {
            success: false,
            message: 'User not Logged in!'
        }
    }

    const res = await fetch(`${process.env.BACKEND_URL}/api/posts/my-posts`, {
        headers: {
            Cookie: `accessToken=${accessToken}`,
        },
        cache: 'force-cache',
        next: {
            revalidate: 60 * 60 * 24,
            tags: ["my-posts"]
        }
    })

    const result = await res.json()

    return result
}