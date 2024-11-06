import { User } from "@prisma/client";

import { DynamicBreadcrumbs } from "@/components/DynamicBreadcrumbs";
import { SidebarComponent } from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export interface SidebarProps {
  children: React.ReactNode;
  pathname: string;
  user: User;
}

export function Sidebar({ children, pathname, user }: SidebarProps) {
  return (
    <SidebarProvider>
      <SidebarComponent user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumbs pathname={pathname} />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
