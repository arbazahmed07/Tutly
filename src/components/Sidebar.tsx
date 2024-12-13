import { Role, User } from "@prisma/client";
import {
  BarChart,
  Bookmark,
  ChevronRight,
  ClipboardList,
  FileBarChart,
  FileText,
  GraduationCap,
  Home,
  Terminal,
  Trophy,
  UserCheck,
  Users,
  Users2,
} from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useRouter } from "@/hooks/use-router.ts";

export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ReactNode;
}

interface SidebarComponentProps {
  user: User & { role: Role };
  initialSideBarItems?: SidebarItem[];
}

export function SidebarComponent({ user, initialSideBarItems }: SidebarComponentProps) {
  const organization = {
    name: "Tutly",
    role: user?.role,
  };

  const router = useRouter();
  const pathname = router.pathname;
  const InstructorItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: GraduationCap,
    },
    {
      title: "Notes",
      url: "/notes",
      icon: FileText,
    },
    {
      title: "Bookmarks",
      url: "/bookmarks",
      icon: Bookmark,
    },
    {
      title: "Assignments",
      url: "/instructor/assignments",
      icon: ClipboardList,
    },
    {
      title: "Leaderboard",
      url: "/instructor/leaderboard",
      icon: Trophy,
    },
    {
      title: "Community",
      url: "/community",
      icon: Users,
    },
    {
      title: "Attendance",
      url: "/instructor/attendance",
      icon: UserCheck,
    },
    {
      title: "Statistics",
      url: "/tutor/statistics",
      icon: BarChart,
    },
    {
      title: "Report",
      url: "/instructor/report",
      icon: FileBarChart,
    },
    {
      title:"Users",
      url: "/instructor/users",
      icon: Users2
    }
  ];

  const MentorItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: GraduationCap,
    },
    {
      title: "Notes",
      url: "/notes",
      icon: FileText,
    },
    {
      title: "Bookmarks",
      url: "/bookmarks",
      icon: Bookmark,
    },
    {
      title: "Assignments",
      url: "/mentor/assignments",
      icon: ClipboardList,
    },
    {
      title: "Leaderboard",
      url: "/mentor/leaderboard",
      icon: Trophy,
    },
    {
      title: "Community",
      url: "/community",
      icon: Users,
    },
    {
      title: "Attendance",
      url: "/mentor/attendance",
      icon: UserCheck,
    },
    {
      title: "Statistics",
      url: "/tutor/statistics",
      icon: BarChart,
    },
    {
      title: "Report",
      url: "/mentor/report",
      icon: FileBarChart,
    },
  ];

  const StudentItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: GraduationCap,
    },
    {
      title: "Notes",
      url: "/notes",
      icon: FileText,
    },
    {
      title: "Bookmarks",
      url: "/bookmarks",
      icon: Bookmark,
    },
    {
      title: "Assignments",
      url: "/assignments",
      icon: ClipboardList,
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: Trophy,
    },
    {
      title: "Community",
      url: "/community",
      icon: Users,
    },
    {
      title: "Playgrounds",
      url: "/playgrounds",
      icon: Terminal,
    },
    {
      title: "Statistics",
      url: "/statistics",
      icon: BarChart,
    },
  ];

  let sideBarItems: any[] = initialSideBarItems || [];

  if (initialSideBarItems?.length === 0) {
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
  }

  return (
    <Sidebar collapsible="icon" className="w-56">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground mx-auto"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <img src="/logo-with-bg.png" alt="Logo" className="size-8 rounded-md" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{organization.name}</span>
                <span className="truncate text-xs">{organization.role}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sideBarItems?.map((item: any) => {
              const ItemIcon = item.icon;
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
                          className={`${pathname === item.url ? "bg-blue-600 text-white" : ""} hover:bg-blue-500 text-white m-auto flex cursor-pointer items-center gap-4 rounded px-5 py-6 text-base`}
                        >
                          {ItemIcon && <ItemIcon className="size-6" />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    ) : (
                      <a href={item.url}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`${pathname === item.url ? "bg-blue-600 text-white" : ""} hover:bg-blue-500 text-white m-auto flex cursor-pointer items-center gap-4 rounded px-5 py-6 text-base`}
                        >
                          {ItemIcon && <ItemIcon className="size-6" />}
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
                                  className={`${pathname === subItem.url ? "bg-blue-600 text-white" : ""} hover:bg-blue-500 text-white m-auto flex cursor-pointer items-center gap-4 rounded px-5 py-6 text-base`}
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
    </Sidebar>
  );
}
