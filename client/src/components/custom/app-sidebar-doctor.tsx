import {
  Calendar,
  Home,
  Files,
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
} from "@/components/ui/dropdown-menu";
import { useRecoilValue } from "recoil";
import { doctorAtom } from "@/store/atom/atom";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    url: `/doctor-dashboard`,
    icon: Home,
  },
  {
    title: "Appointments",
    url: "/doctor-appointments",
    icon: Calendar,
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

function AppSidebarD() {
  const user = useRecoilValue(doctorAtom);
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="items-center">
        <Codesandbox className="text-green-500" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span className="font-semibold tracking-wide">{item.title}</span>
                    </Link>
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
                    <User2 className="text-orange-500" />
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
                  <Button variant={"ghost"} className="p-0.5 h-4">
                    Profile
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant={"ghost"} className="p-0.5 h-4">
                    Friends
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant={"ghost"} className="p-0.5 h-4" onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/")
                  }}>
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebarD