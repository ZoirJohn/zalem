import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useContext, useMemo } from "react"
import { Link, Outlet, useParams } from "react-router"
import { AppSidebar } from "~/components/AppSidebar"
import Protected from "~/components/Protected"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "~/components/ui/breadcrumb"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { AuthContext } from "~/context/AuthContext"
import { useUsersStore } from "~/server/store"

export default function Dashboard() {
    const { userId } = useParams()
    const { users } = useUsersStore()
    const { user } = useContext(AuthContext)

    const currentCrumb = useMemo(() => {
        return userId
            ? user?.id === userId
                ? "Saved Messages"
                : users.find((user) => user.id === userId)?.display_name
            : "Anonymous User"
    }, [location.pathname, users])

    return (
        <Protected shouldUserExist="Y" redirectTo="/login">
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "350px",
                    } as React.CSSProperties
                }
            >
                <AppSidebar currentUserId={user?.id} />
                <SidebarInset>
                    <header className="sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b border-claude-hairline bg-claude-canvas px-6 py-4">
                        <Breadcrumb className="flex-1">
                            <BreadcrumbList className="justify-between text-claude-muted">
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to="/chat">
                                            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-5 text-claude-ink" />
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-base font-medium text-claude-ink capitalize">
                                        {currentCrumb}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                                <SidebarTrigger className="text-claude-ink" />
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </Protected>
    )
}
