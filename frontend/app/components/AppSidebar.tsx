import * as React from "react";

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInput, useSidebar } from "~/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Bookmark02Icon } from "@hugeicons/core-free-icons";
import { NavLink } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useState } from "react";
import type { ChatUser } from "~/types";
import clsx from "clsx";

export function AppSidebar({ users, currentUserId, ...props }: React.ComponentProps<typeof Sidebar> & { currentUserId: string | undefined; users: ChatUser[] }) {
	const { isMobile, open, setOpenMobile } = useSidebar();
	const [value, setValue] = useState("");
	return (
		<Sidebar
			collapsible="icon"
			className="hidden flex-1 overflow-hidden md:flex"
			style={
				{
					"--sidebar": "var(--claude-canvas)",
					"--sidebar-foreground": "var(--claude-ink)",
					"--sidebar-border": "var(--claude-hairline)",
					"--sidebar-accent": "var(--claude-surface-card)",
					"--sidebar-accent-foreground": "var(--claude-ink)",
				} as React.CSSProperties
			}
			{...props}
		>
			<SidebarHeader className={clsx("gap-3.5 bg-claude-canvas p-4", !open && !isMobile && "invisible")}>
				<div className="flex w-full items-center justify-between">
					<div className="text-base font-medium text-claude-ink">Messages</div>
					<Button variant="ghost" className="md:hidden" onClick={() => setOpenMobile(false)}>
						<HugeiconsIcon icon={Cancel01Icon} className="size-6" />
					</Button>
				</div>
				<SidebarInput placeholder="Type to search..." value={value} onChange={(e) => setValue(e.target.value)} className="h-9 rounded-[8px] border border-claude-hairline bg-claude-canvas text-sm text-claude-ink placeholder:text-claude-muted focus-visible:border-claude-primary focus-visible:ring-2 focus-visible:ring-claude-primary/20" />
			</SidebarHeader>
			<SidebarContent className="bg-claude-canvas">
				<SidebarGroup className="p-0">
					<SidebarGroupContent>
						{users.map((user) =>
							currentUserId === user.id ? (
								<NavLink to={"/chat" + `/${user.id}`} key={user.id} className={({ isActive }) => clsx("flex items-center gap-4 border-t border-claude-hairline p-4 text-sm leading-tight whitespace-nowrap text-claude-body transition-colors hover:bg-claude-surface-card hover:text-claude-ink [475px]:gap-4", !open && "px-2", isActive && "bg-claude-surface-card font-medium text-claude-ink")} onClick={() => setOpenMobile(false)}>
									<Avatar className={clsx(open && "size-12", !open && "size-8", "size-8")}>
										<AvatarImage src="" />
										<AvatarFallback>
											<HugeiconsIcon icon={Bookmark02Icon} className="size-5" />
										</AvatarFallback>
									</Avatar>
									<div className={clsx(open && !isMobile && "flex flex-col", !open && !isMobile && "hidden", "gap-1")}>
										<div className="flex w-full items-center gap-2">
											<span className="text-sm font-medium text-claude-ink">Saved Messages</span>
										</div>
									</div>
								</NavLink>
							) : (
								<NavLink to={"/chat" + `/${user.id}`} key={user.id} className={({ isActive }) => clsx("flex items-center gap-4 border-t border-claude-hairline p-4 text-sm leading-tight whitespace-nowrap text-claude-body transition-colors hover:bg-claude-surface-card hover:text-claude-ink [475px]:gap-4", !open && "px-2", isActive && "bg-claude-surface-card font-medium text-claude-ink")} onClick={() => setOpenMobile(false)}>
									<Avatar className={clsx(open && "size-12", !open && "size-8", "size-8")}>
										<AvatarImage />
										<AvatarFallback>{user.display_name?.[0]}</AvatarFallback>
									</Avatar>
									<div className={clsx(open && !isMobile && "flex flex-col", !open && !isMobile && "hidden", "gap-1")}>
										<div className="flex w-full items-center gap-2">
											<span className="text-sm font-medium text-claude-ink">{user.display_name || "Anonymous User"}</span>
										</div>
									</div>
								</NavLink>
							),
						)}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
