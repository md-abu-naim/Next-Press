"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LoginAction } from "../_actions/authActions"

const LoginForm = () => {
    return (
        <form action={LoginAction} className="space-y-6">
            <Card className="p-4 space-y-4">
                <Input name="email" type="email" placeholder="Enter Your Email" required />
                <Input name="password" type="password" placeholder="Enter Your Password" required />
                <Button type="submit">Login</Button>
            </Card>
        </form>
    )
}

export default LoginForm