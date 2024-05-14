"use client";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast"
import PlayGroundProvider from "./PlayGroundProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
        <PlayGroundProvider>
          <Toaster />
          {children}
        </PlayGroundProvider>
    </ThemeProvider>
  );
}
