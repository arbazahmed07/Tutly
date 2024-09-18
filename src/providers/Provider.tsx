"use client";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Toaster />
      {children}
    </ThemeProvider>
  );
}
