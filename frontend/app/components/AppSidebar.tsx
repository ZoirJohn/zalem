import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    useSidebar,
} from "~/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { Link } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { useState } from "react"
import type { User } from "~/types"
import clsx from "clsx"
import { useUsers } from "~/hooks/useUsers"

const mails: User[] = []

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { isMobile, open, setOpenMobile } = useSidebar()
    const [value, setValue] = useState("")
    const { users } = useUsers()
    return (
        <Sidebar collapsible="icon" className="hidden flex-1 overflow-hidden md:flex" {...props}>
            <SidebarHeader className={clsx("gap-3.5 p-4", !open && !isMobile && "invisible")}>
                <div className="flex w-full items-center justify-between">
                    <div className="text-base font-medium text-foreground">Messages</div>
                    <Button variant="ghost" className="md:hidden" onClick={() => setOpenMobile(false)}>
                        <HugeiconsIcon icon={Cancel01Icon} className="size-6" />
                    </Button>
                </div>
                <SidebarInput
                    placeholder="Type to search..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="px-0">
                    <SidebarGroupContent>
                        {users.map((user) => (
                            <Link
                                to={"/chat" + `/${user.id}`}
                                key={user.id}
                                className={clsx(
                                    "flex items-center gap-4 border-t p-4 text-sm leading-tight whitespace-nowrap last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [475px]:gap-4",
                                    !open && "px-2"
                                )}
                                onClick={() => setOpenMobile(false)}
                            >
                                <Avatar className={clsx(open && "size-12", !open && "size-8", "size-8")}>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div
                                    className={clsx(
                                        open && !isMobile && "flex flex-col",
                                        !open && !isMobile && "hidden",
                                        "gap-1"
                                    )}
                                >
                                    <div className="flex w-full items-center gap-2">
                                        <span>{user.display_name || "Anonymous User"}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
