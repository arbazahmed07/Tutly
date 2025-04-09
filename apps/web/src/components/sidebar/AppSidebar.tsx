"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
import { getDefaultSidebarItems } from "@/config/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import type { SessionUser } from "@/lib/auth/session";
import { cn } from "@/lib/utils";

export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ElementType;
  items?: SidebarItem[];
  isActive?: boolean;
  className?: string;
}

interface AppSidebarProps {
  user: SessionUser;
  forceClose?: boolean;
  className?: string;
}

export function AppSidebar({ user, forceClose = false, className }: AppSidebarProps) {
  const organizationName = "Tutly";
  const pathname = usePathname();

  const sidebarItems = getDefaultSidebarItems({ role: user.role, isAdmin: user.isAdmin });
  const [isOpen, setIsOpen] = useState(() => !forceClose);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebarOpen");
      if (saved !== null) {
        setIsOpen(forceClose ? false : saved === "true");
      }
    }
  }, [forceClose]);

  const handleOpenChange = (open: boolean) => {
    if (forceClose) return;
    setIsOpen(open);
    localStorage.setItem("sidebarOpen", String(open));
  };

  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "flex-shrink-0 overflow-hidden transition-all duration-100 ease-in-out",
      {
        "sm:w-[220px]": isOpen && !forceClose,
        "sm:w-[45px]": !isOpen || forceClose,
      },
    )}>
      <SidebarProvider onOpenChange={handleOpenChange} open={isOpen && !forceClose}>
        {isMobile && !forceClose && (
          <div className="top-4 left-2 fixed flex items-center gap-2">
            <SidebarTrigger className="hover:bg-accent" />
          </div>
        )}
        <Sidebar
          collapsible={forceClose ? "icon" : "icon"}
          className={cn(
            "bg-background h-screen",
            className
          )}
        >
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <div
                  className={cn(
                    "flex w-full items-center gap-2 justify-between",
                    isOpen ? "flex-row" : "flex-col"
                  )}
                >
                  <SidebarMenuButton size="lg" className="mx-auto">
                    <div className="flex justify-center items-center bg-sidebar-primary rounded-lg size-8 aspect-square text-sidebar-primary-foreground">
                      <Image
                        src="/logo-with-bg.png"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="rounded-md"
                      />
                    </div>
                    {!forceClose && isOpen && (
                      <div className="flex-1 grid text-sm text-left leading-tight">
                        <span className="font-semibold truncate">{organizationName}</span>
                        <span className="text-xs truncate">{user.role}</span>
                      </div>
                    )}
                  </SidebarMenuButton>
                  {!forceClose && <SidebarTrigger />}
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {sidebarItems.map((item) => {
                  const ItemIcon = item.icon;
                  const isSubItemActive =
                    item.items?.some((subItem) => pathname === subItem.url) ?? false;
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.isActive ?? pathname.startsWith(item.url) ?? isSubItemActive}
                      className={`group/collapsible ${item.className ?? ""}`}
                    >
                      <SidebarMenuItem>
                        {item.items ? (
                          <>
                            {isOpen ? (
                              <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                  className={cn(
                                    pathname === item.url ? "bg-primary text-primary-foreground" : "",
                                    "hover:bg-primary/90 hover:text-primary-foreground m-auto flex cursor-pointer items-center gap-4 rounded px-5 py-5 text-base"
                                  )}
                                >
                                  <ItemIcon className="size-6" />
                                  <span>{item.title}</span>
                                  <ChevronRight className="ml-auto group-data-[state=open]/collapsible:rotate-90 transition-transform duration-200" />
                                </SidebarMenuButton>
                              </CollapsibleTrigger>
                            ) : (
                              <SidebarMenuButton
                                tooltip={{
                                  children: (
                                    <div className="flex flex-col bg-popover shadow-md border rounded-md w-[160px] overflow-hidden text-popover-foreground">
                                      {item.items.map((subItem) => (
                                        <a
                                          key={subItem.title}
                                          href={subItem.url}
                                          className={cn(
                                            "relative flex select-none items-center px-2.5 py-1.5 text-sm outline-none",
                                            "transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                            pathname === subItem.url &&
                                            "bg-accent text-accent-foreground"
                                          )}
                                        >
                                          <span className="truncate">{subItem.title}</span>
                                        </a>
                                      ))}
                                    </div>
                                  ),
                                  className: "p-0",
                                  side: "right",
                                  sideOffset: 4,
                                  align: "center",
                                }}
                                className={cn(
                                  pathname === item.url ? "bg-primary text-primary-foreground" : "",
                                  isSubItemActive && !isOpen && "bg-accent text-accent-foreground",
                                  "hover:bg-primary/90 hover:text-primary-foreground m-auto flex cursor-pointer items-center gap-4 rounded px-5 py-5 text-base"
                                )}
                              >
                                <ItemIcon className="size-6" />
                              </SidebarMenuButton>
                            )}
                            {isOpen && (
                              <CollapsibleContent>
                                <SidebarMenuSub>
                                  {item.items.map((subItem) => (
                                    <SidebarMenuSubItem key={subItem.title}>
                                      <SidebarMenuSubButton
                                        asChild
                                        className={cn(
                                          pathname === subItem.url
                                            ? "bg-primary text-primary-foreground"
                                            : "",
                                          "hover:bg-primary/90 hover:text-primary-foreground m-auto flex cursor-pointer items-center gap-4 rounded px-5 py-5 text-base",
                                          subItem.className ?? ""
                                        )}
                                      >
                                        <a href={subItem.url}>
                                          <span>{subItem.title}</span>
                                        </a>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            )}
                          </>
                        ) : (
                          <a href={item.url}>
                            <SidebarMenuButton
                              tooltip={isOpen ? "" : item.title}
                              className={cn(
                                pathname === item.url ? "bg-primary text-primary-foreground" : "",
                                "hover:bg-primary/90 hover:text-primary-foreground m-auto flex cursor-pointer items-center gap-4 rounded px-5 py-5 text-base"
                              )}
                            >
                              <ItemIcon className="size-6" />
                              {isOpen && <span>{item.title}</span>}
                            </SidebarMenuButton>
                          </a>
                        )}
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
