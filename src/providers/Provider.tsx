"use client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast"

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}
