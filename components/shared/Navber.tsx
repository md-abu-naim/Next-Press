"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  User,
  Settings,
  LifeBuoy,
  LogOut,
  ChevronDown,
  Command,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/service/logout"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const navLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Docs", href: "/docs" },
]

const userMenuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, shortcut: "⌘D" },
  { label: "Profile", href: "/profile", icon: User, shortcut: "⌘P" },
  { label: "Settings", href: "/settings", icon: Settings, shortcut: "⌘S" },
  { label: "Support", href: "/support", icon: LifeBuoy },
]

type IUser = {
  "success": boolean,
  "statusCode": number,
  "message": string,
  "data": {
    "profile": {
      "id": string,
      "name": string,
      "email": string,
      "activeStatus": string,
      "role": string,
      "createdAt": string,
      "updatedAt": string,
      "profile": {
        "id": string,
        "profilePhoto": string,
        "bio": string,
        "userId": string,
        "createdAt": string,
        "updatedAt": string
      }
    }
  }
}

type NavberProps = {
  user: IUser
}

function Navbar({ user }: NavberProps) {
  const [islogout, setLogout] = useState(false)
  const router = useRouter()

  const handleUserMenuAction = async (action: string) => {
    console.log(`User Menu Action: ${action}`);

    if (action === 'logout') {
      await logout()
      setLogout(true)
    }
  }

  useEffect(() => {
    if (islogout) {
      toast.success('User logOut Successfull')
      router.push('/login')
    }
  }, [islogout, router])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Command className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Next Press</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User dropdown */}
        {
          user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(buttonVariants({ variant: "ghost" }), "gap-2 pl-1.5 pr-2")}
              >
                <Avatar className="size-7">
                  <AvatarImage src="/diverse-avatars.png" alt="User avatar" />
                  <AvatarFallback>{user ? user.data.profile?.name : 'name'}</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:inline">{user ? user.data.profile?.name : 'JD'}</span>
                <ChevronDown className="size-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userMenuItems.map((item) => (
                    <DropdownMenuItem key={item.href} onClick={() => router.push(item.href)}>
                      <item.icon />
                      {item.label}
                      {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={async () => {
                  await handleUserMenuAction('logout')
                }}>
                  <LogOut />
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : <Link href={'/login'}>
            <Button className="cursor-pointer">Login</Button>
          </Link>
        }
      </div>
    </header>
  )
}

export default Navbar