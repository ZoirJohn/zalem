import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, Outlet, useParams } from "react-router";
import { AppSidebar } from "~/components/AppSidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "~/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { ProtectedRoute } from "~/ProtectedRoute";
import { useCurrentUserStore, useUsersStore } from "~/store/store";

export default function Chat() {
    const { user } = useCurrentUserStore();
    const { users } = useUsersStore();
    return (
        <ProtectedRoute redirectTo="/login" shouldUserExist="Y">
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "350px",
                    } as React.CSSProperties
                }
            >
                <AppSidebar currentUserId={user?.id} users={users} />
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
                                    <BreadcrumbPage className="text-base font-medium text-claude-ink capitalize">{"currentCrumb"}</BreadcrumbPage>
                                </BreadcrumbItem>
                                <SidebarTrigger className="text-claude-ink" />
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </ProtectedRoute>
    );
}
