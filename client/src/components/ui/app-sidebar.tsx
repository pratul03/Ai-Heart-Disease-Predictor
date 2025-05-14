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
  Stethoscope,
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./button";
import { Link, useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai/react";
import { userAtom } from "@/store/atom/userAtom";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Calendar,
  },
  {
    title: "Tools",
    url: "/tools",
    icon: MonitorCog,
  },
  {
    title: "Doctors",
    url: "/doctors",
    icon: Stethoscope,
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
    url: "/contact-us",
    icon: ContactRound,
  },
];

export function AppSidebar() {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  // useEffect(() => {
  //   (async () => {
  //     if (!localStorage.getItem("token")) {
  //       navigate("/");
  //     }
  //   })()
  // },[])

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="py-4 items-center">
        <Codesandbox className="text-green-500" />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} >
                    <Link to={item.url} className="flex justify-start items-center">
                      <item.icon />
                      <span className="font-semibold tracking-wide">
                        {item.title}
                      </span>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"ghost"} className="p-0.5 h-4">
                        Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant={"ghost"} className="p-0.5 h-4">
                    Friends
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant={"ghost"}
                    className="p-0.5 h-4"
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                    }}
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
