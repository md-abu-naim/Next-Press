"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from 'jsonwebtoken'

type loginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}

export const LoginAction = async (prevState: loginState, formData: FormData) => {
    console.log(formData);
    const email = formData.get('email')
    const password = formData.get('password')

    const payload = {
        email, password
    }


    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result: loginState = await res.json()

    if (result.success) {
        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: 'lax'
        })

        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax'
        })

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload

        if (decodedToken.role === 'USER') {
            redirect('/')
        } else if (decodedToken.role === 'AUTHOR') {
            redirect('/author-dashboard')
        } else if (decodedToken.role === 'ADMIN') {
            redirect('/admin-dashboard')
        }
        // redirect('/', 'replace')
    }

    return result
}