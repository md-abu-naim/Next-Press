import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const LoginForm = () => {
    return (
        <div className="space-y-6">
            <Card className="p-4 space-y-4">
                <Input name="email" type="email" placeholder="Enter Your Email" required />
                <Input name="password" type="password" placeholder="Enter Your Password" required />
                <Button type="submit">Login</Button>
            </Card>
        </div>
    )
}

export default LoginForm