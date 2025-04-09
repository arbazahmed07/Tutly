import { Download, LockIcon, LogOut, UserIcon } from "lucide-react";
// import {  Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import type { SessionUser } from "@/lib/auth/session";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface UserMenuProps {
  user: SessionUser;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center bg-muted hover:bg-muted/80 px-2 py-1 rounded-xl w-16 cursor-pointer">
            <Avatar className="rounded-full w-7 h-7 cursor-pointer">
              <AvatarImage
                src={user.image ?? "/placeholder.jpg"}
                alt={user.name ?? user.username}
              />
              <AvatarFallback className="rounded-full">
                {user.name
                  ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                  : user.username}
              </AvatarFallback>
            </Avatar>
            <div
              className="ml-1 transition-transform duration-200"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <FaCaretDown className="w-4 h-4" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-background shadow-lg border border-border rounded-lg w-56"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-sm text-left">
              <Avatar className="rounded-full w-7 h-7">
                <AvatarImage src={user.image ?? "/placeholder.jpg"} alt={user.name} />
                <AvatarFallback className="rounded-full">
                  {user.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 grid text-sm text-left leading-tight">
                <span className="font-semibold truncate">{user.name}</span>
                <span className="text-muted-foreground text-xs truncate">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <a href="/profile">
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <UserIcon className="w-5 h-5" />
                Profile
              </DropdownMenuItem>
            </a>
            <a href={`/change-password`}>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <LockIcon className="w-5 h-5" />
                Manage Password
              </DropdownMenuItem>
            </a>
            {/* {user.role === "STUDENT" && (
              <a href="/certificate">
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <GrCertificate className="w-5 h-5" />
                  Certificate
                </DropdownMenuItem>
              </a>
            )} */}

            {/* <a href="/sessions">
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
              >
                <Settings className="w-5 h-5" />
                Security Settings
              </DropdownMenuItem>
            </a> */}
            {/* <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Bell className="w-5 h-5" />
              Notifications
            </DropdownMenuItem> */}
            {/* {!isStandalone && deferredPrompt && (
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleInstallClick}
              >
                <Download className="w-5 h-5" />
                Install App
              </DropdownMenuItem>
            )} */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <a href="/api/auth/signout">
            <DropdownMenuItem className="flex items-center gap-2 text-red-600 cursor-pointer">
              <LogOut className="w-5 h-5" />
              Log out
            </DropdownMenuItem>
          </a>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <AlertDialog open={showOpenInAppDialog} onOpenChange={setShowOpenInAppDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Open in App</AlertDialogTitle>
            <AlertDialogDescription>
              The app has been installed successfully. Would you like to open it now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay on Web</AlertDialogCancel>
            <AlertDialogAction onClick={handleOpenInApp}>Open App</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </div>
  );
}
