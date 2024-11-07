import { User } from "@prisma/client";

import { DynamicBreadcrumbs } from "@/components/DynamicBreadcrumbs";
import { SidebarComponent } from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Bell, BadgeCheck, LogOut } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";

export interface SidebarProps {
  children: React.ReactNode;
  pathname: string;
  user: User;
}

export function Sidebar({ children, pathname, user }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarProvider>
      <SidebarComponent user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DynamicBreadcrumbs pathname={pathname} />
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <span className="text-md font-medium">
                {user.role}
              </span>
              <ModeToggle />
              <button className="hover:bg-muted rounded-full p-2">
                <Bell className="h-5 w-5 p-0.5" />
              </button>
              <DropdownMenu onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center bg-muted hover:bg-muted/80 rounded-xl px-2 py-1 cursor-pointer w-16">
                    <Avatar className="h-7 w-7 rounded-full cursor-pointer">
                      <AvatarImage src={user.image ?? ""} alt={user.name ?? user.username} />
                      <AvatarFallback className="rounded-full">
                        {user.name
                          ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                          : user.username}
                      </AvatarFallback>
                    </Avatar>
                    <div className="transition-transform duration-200 ml-1" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                      <FaCaretDown className="h-4 w-4" />
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-7 w-7 rounded-full">
                        <AvatarImage src={user.image ?? ""} alt={user.name} />
                        <AvatarFallback className="rounded-full">
                          {user.name
                            ?.split(" ")
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
                        <BadgeCheck className="size-6" />
                        Account
                      </DropdownMenuItem>
                    </a>
                    <DropdownMenuItem>
                      <Bell className="size-6" />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <a href="/api/auth/signout">
                    <DropdownMenuItem>
                      <LogOut className="size-6" />
                      Log out
                    </DropdownMenuItem>
                  </a>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-2 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
