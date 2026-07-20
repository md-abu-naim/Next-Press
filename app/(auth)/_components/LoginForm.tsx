"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LoginAction } from "../_actions/authActions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const LoginForm = () => {
    const initialState = {
        success: false,
        statusCode: 0,
        message: "",
        data: {
            accessToken: "",
            refreshToken: ""
        }
    }

    const [state, action, pending] = useActionState(LoginAction, initialState)

    useEffect(() => {
        if (state.success) {
            toast.success(state.message || "Login Successful")
        } else if (state.message) {
            toast.error(state.message || "Login failed")
        }
    }, [state])

    return (
        <form action={action} className="space-y-6">
            <Card className="p-4 space-y-4">
                <Input name="email" type="email" placeholder="Enter Your Email" required />
                <Input name="password" type="password" placeholder="Enter Your Password" required />
                <Button type="submit">
                    {
                        pending ? 'Submitting' : 'Login'
                    }
                </Button>
            </Card>
        </form>
    )
}

export default LoginForm