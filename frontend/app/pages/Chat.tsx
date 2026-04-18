import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link, Outlet, useLocation } from "react-router"
import { AppSidebar } from "~/components/AppSidebar"
import ProtectedPage from "~/components/ProtectedPage"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "~/components/ui/breadcrumb"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"

export default function Dashboard() {
    const location = useLocation()
    const currentCrumb = location.pathname.split("/").at(2)
    return (
        <ProtectedPage>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "350px",
                    } as React.CSSProperties
                }
            >
                <AppSidebar />
                <SidebarInset>
                    <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
                        <Breadcrumb className="flex-1">
                            <BreadcrumbList className="justify-between">
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to="/chat">
                                            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-6 text-black" />
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="capitalize">{currentCrumb}</BreadcrumbPage>
                                </BreadcrumbItem>
                                <SidebarTrigger className="text-black" />
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </ProtectedPage>
    )
}
