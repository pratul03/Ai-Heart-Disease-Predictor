import {
  Calendar,
  Home,
  Files,
  MonitorCog,
  UsersRound,
  ContactRound,
  User2,
  ChevronUp,
  Codesandbox,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/store/atom/atom";

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Meetings",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Tools",
    url: "#",
    icon: MonitorCog,
  },
  {
    title: "Community",
    url: "#",
    icon: UsersRound,
  },
  {
    title: "Resources",
    url: "#",
    icon: Files,
  },
  {
    title: "Contact Us",
    url: "#",
    icon: ContactRound,
  },
];

export function AppSidebar() {
  const user = useRecoilValue(userAtom);

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="items-center"><Codesandbox className="text-green-500" /></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <User2 className="text-orange-500"/>
                    <p className="ml-1">{user.name ? user.name : "Guest"}</p>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="ml-2 w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
