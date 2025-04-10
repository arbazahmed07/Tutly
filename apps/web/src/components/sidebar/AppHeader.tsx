"use client";

import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import type { SessionUser } from "@tutly/auth";

import { ModeToggle } from "../ModeToggle";
import { DynamicBreadcrumbs } from "./DynamicBreadcrumbs";
import { UserMenu } from "./UserMenu";
import Notifications from "../Notifications";
import { usePathname } from "next/navigation";

interface AppHeaderProps {
  user: SessionUser;
  crumbReplacement?: Record<string, string>;
}

export function AppHeader({ user, crumbReplacement = {} }: AppHeaderProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  return (
    <header className="top-0 z-50 sticky flex items-center gap-1 sm:gap-2 bg-background px-2 sm:px-4 border-b h-16 shrink-0 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-1 sm:gap-2">
          {isMobile && <Separator orientation="vertical" className="ml-3 sm:ml-5 h-4" />}
          <DynamicBreadcrumbs pathname={pathname} crumbReplacement={crumbReplacement} />
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <span className="max-sm:hidden font-medium text-md">{user.role}</span>
          <ModeToggle />
          <Notifications user={user} />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}
