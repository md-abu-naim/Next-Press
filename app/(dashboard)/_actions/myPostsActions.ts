import { cookies } from "next/headers"

export const getMyPosts = async() => {
     const cookieStore = await cookies()
    
        const accessToken = cookieStore.get('accessToken')?.value
    
        if(!accessToken) {
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