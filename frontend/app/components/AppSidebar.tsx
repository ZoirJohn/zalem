import * as React from "react"

import { NavUser } from "~/components/NavUser"
import { Label } from "~/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar"
import { Switch } from "~/components/ui/switch"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  InboxIcon,
  FileIcon,
  SentIcon,
  ArchiveIcon,
  Delete02Icon,
  CommandIcon,
} from "@hugeicons/core-free-icons"
import { useState } from "react"
import { Link } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Inbox",
      url: "inbox",
      icon: <HugeiconsIcon icon={InboxIcon} strokeWidth={2} />,
      isActive: true,
    },
    {
      title: "Drafts",
      url: "drafts",
      icon: <HugeiconsIcon icon={FileIcon} strokeWidth={2} />,
      isActive: false,
    },
    {
      title: "Sent",
      url: "sent",
      icon: <HugeiconsIcon icon={SentIcon} strokeWidth={2} />,
      isActive: false,
    },
    {
      title: "Junk",
      url: "junk",
      icon: <HugeiconsIcon icon={ArchiveIcon} strokeWidth={2} />,
      isActive: false,
    },
    {
      title: "Trash",
      url: "trash",
      icon: <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />,
      isActive: false,
    },
  ],
  mails: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },
    {
      name: "Alice Smith",
      email: "alicesmith@example.com",
      subject: "Re: Project Update",
      date: "Yesterday",
      teaser:
        "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
    },
    {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      subject: "Weekend Plans",
      date: "2 days ago",
      teaser:
        "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
    },
    {
      name: "Emily Davis",
      email: "emilydavis@example.com",
      subject: "Re: Question about Budget",
      date: "2 days ago",
      teaser:
        "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
    },
    {
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
      subject: "Important Announcement",
      date: "1 week ago",
      teaser:
        "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
    },
    {
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
      subject: "Re: Feedback on Proposal",
      date: "1 week ago",
      teaser:
        "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
    },
    {
      name: "David Lee",
      email: "davidlee@example.com",
      subject: "New Project Idea",
      date: "1 week ago",
      teaser:
        "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@example.com",
      subject: "Vacation Plans",
      date: "1 week ago",
      teaser:
        "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
    },
    {
      name: "James Martin",
      email: "jamesmartin@example.com",
      subject: "Re: Conference Registration",
      date: "1 week ago",
      teaser:
        "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
    },
    {
      name: "Sophia White",
      email: "sophiawhite@example.com",
      subject: "Team Dinner",
      date: "1 week ago",
      teaser:
        "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = useState(data.navMain[0])
  const [mails, setMails] = useState(data.mails)
  const { open } = useSidebar()

  return (
    <Sidebar
      collapsible="icon"
      className="hidden flex-1 overflow-hidden md:flex"
      {...props}
    >
      <SidebarHeader
        className={"gap-3.5  p-4" + `${open ? "" : " invisible"}`}
      >
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">
            {activeItem?.title}
          </div>
          <Label className="flex items-center gap-2 text-sm">
            <span>Unreads</span>
            <Switch className="shadow-none" />
          </Label>
        </div>
        <SidebarInput placeholder="Type to search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            {mails.map((mail) => (
              <Link
                to="/"
                key={mail.email}
                className="flex items-center justify-center gap-4 border-t py-4 text-sm leading-tight whitespace-nowrap last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <div className="flex w-full items-center gap-2">
                    <span>{mail.name}</span>
                    <span className="ml-auto text-xs">{mail.date}</span>
                  </div>
                  <span className="line-clamp-2 w-65 text-xs whitespace-break-spaces">
                    {mail.teaser}
                  </span>
                </div>
              </Link>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
