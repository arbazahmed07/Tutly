import { Role, User } from "@prisma/client";
import { actions } from "astro:actions";
import * as Icons from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useRouter } from "@/hooks/use-router.ts";

const iconMap: any = Icons;

export function SidebarComponent({ user }: { user: User & { role: Role } }) {
  const organization = {
    name: "Tutly",
    logo: "AudioWaveform",
    plan: user?.role,
  };

  const OrganizationIcon = iconMap[organization.logo];
  const router = useRouter();
  const pathname = router.pathname;
  const InstructorItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: "Home",
    },
    {
      title: "Courses",
      url: "/courses",
      icon: "GraduationCap",
    },
    {
      title: "Assignments",
      url: "/instructor/assignments",
      icon: "ClipboardList",
    },
    {
      title: "Leaderboard",
      url: "/instructor/leaderboard",
      icon: "Trophy",
    },
    {
      title: "Community",
      url: "/community",
      icon: "Users",
    },
    {
      title: "Attendance",
      url: "/instructor/attendance",
      icon: "UserCheck",
    },
    {
      title: "Statistics",
      url: "/instructor/statistics",
      icon: "BarChart",
    },
    {
      title: "Report",
      url: "/instructor/report",
      icon: "FileBarChart",
    }
  ];

  const MentorItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: "Home",
    },
    {
      title: "Courses",
      url: "/courses",
      icon: "GraduationCap",
    },
    {
      title: "Assignments",
      url: "/mentor/assignments",
      icon: "ClipboardList",
    },
    {
      title: "Leaderboard",
      url: "/mentor/leaderboard",
      icon: "Trophy",
    },
    {
      title: "Community",
      url: "/community",
      icon: "Users",
    },
    {
      title: "Attendance",
      url: "/mentor/attendance",
      icon: "UserCheck",
    },
    {
      title: "Statistics",
      url: "/mentor/statistics",
      icon: "BarChart",
    },
    {
      title: "Report",
      url: "/mentor/report",
      icon: "FileBarChart",
    }
  ];

  const StudentItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: "Home",
    },
    {
      title: "Courses",
      url: "/courses",
      icon: "GraduationCap",
    },
    {
      title: "Assignments",
      url: "/assignments",
      icon: "ClipboardList",
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: "Trophy",
    },
    {
      title: "Community",
      url: "/community",
      icon: "Users",
    },
    {
      title: "Playgrounds",
      url: "/playgrounds",
      icon: "Terminal",
    },
    {
      title: "Statistics",
      url: "/statistics",
      icon: "BarChart",
    }
  ];

  let sideBarItems: any[] = [];

  switch (user.role) {
    case "INSTRUCTOR":
      sideBarItems = InstructorItems;
      break;
    case "MENTOR":
      sideBarItems = MentorItems;
      break;
    case "STUDENT":
      sideBarItems = StudentItems;
      break;
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {OrganizationIcon && <OrganizationIcon />}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{organization.name}</span>
                <span className="truncate text-xs">{organization.plan}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Explore</SidebarGroupLabel>
          <SidebarMenu>
            {sideBarItems?.map((item: any) => {
              const ItemIcon = iconMap[item.icon];
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive || pathname.startsWith(item.url)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    {item.items ? (
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`${pathname === item.url ? "bg-sidebar-accent bg-opacity-20" : ""
                            }`}
                        >
                          {ItemIcon && <ItemIcon />}
                          <span>{item.title}</span>
                          <Icons.ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    ) : (
                      <a href={item.url}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`${pathname === item.url ? "bg-sidebar-accent bg-opacity-20" : ""
                            }`}
                        >
                          {ItemIcon && <ItemIcon />}
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </a>
                    )}
                    {item.items && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem: any) => {
                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  className={`${pathname === subItem.url
                                    ? "bg-sidebar-accent bg-opacity-20"
                                    : ""
                                    }`}
                                >
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.image ?? ""} alt={user.name ?? user.username} />
                    <AvatarFallback className="rounded-lg">
                      {user.name
                        ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                        : user.username}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <Icons.ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.image ?? ""} alt={user.name} />
                      <AvatarFallback className="rounded-lg">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <a href="/profile">
                    <DropdownMenuItem>
                      <Icons.BadgeCheck />
                      Account
                    </DropdownMenuItem>
                  </a>
                  <DropdownMenuItem>
                    <Icons.Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <a href="/api/auth/signout">
                  <DropdownMenuItem>
                    <Icons.LogOut />
                    Log out
                  </DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
