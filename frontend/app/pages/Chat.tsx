import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router";
import { AppSidebar } from "~/components/AppSidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "~/components/ui/sidebar";
import { ProtectedRoute } from "~/ProtectedRoute";
import { api } from "~/services/api";
import {
    useCurrentUserStore,
    useMessagesStore,
    useUsersStore,
} from "~/store/store";

export default function Chat() {
    const { user, setUser } = useCurrentUserStore();
    const { users } = useUsersStore();
    const { userId } = useParams();
    const navigate = useNavigate();
    const {
        messages,
        setMessages,
        fetchMessages,
        setCurrentConversationId,
        currentConversationId,
        loading,
    } = useMessagesStore();
    useEffect(() => {
        if (userId) {
            api.conversations(userId as string).then((data) => {
                setCurrentConversationId(data.conversation.id);
                fetchMessages(data.conversation.id);
            });
        }
    }, [userId]);

    const handleLogout = async () => {
        await api.logout();
        setUser(null);
        navigate("/login", { replace: true });
    };

    return (
        <ProtectedRoute redirectTo="/login" shouldUserExist="Y">
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "350px",
                    } as React.CSSProperties
                }
            >
                <AppSidebar user={user as User} users={users} onLogout={handleLogout} />
                <SidebarInset>
                    <header className="sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b border-claude-hairline bg-claude-canvas px-6 py-4">
                        <Breadcrumb className="flex-1">
                            <BreadcrumbList className="justify-between text-claude-muted">
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to="/chat">
                                            <HugeiconsIcon
                                                icon={ArrowLeft01Icon}
                                                className="size-5 text-claude-ink"
                                            />
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-base font-medium text-claude-ink capitalize">
                                        {user?.id === userId
                                            ? "Saved messages"
                                            : users.find(
                                                  (user) => user.id === userId,
                                              )?.display_name ||
                                              "Anonymous user"}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                                <SidebarTrigger className="text-claude-ink" />
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <Outlet
                        context={{
                            userId,
                            messages,
                            setMessages,
                            currentConversationId,
                            loading,
                        }}
                    />
                </SidebarInset>
            </SidebarProvider>
        </ProtectedRoute>
    );
}
