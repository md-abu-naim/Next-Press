import Navbar from "@/components/shared/Navber"
import { getMe } from "@/service/getMe"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

    const user = await getMe()
    return (
        <div>
            <Navbar user={user} />
            {children}
        </div>
    )
}

export default DashboardLayout