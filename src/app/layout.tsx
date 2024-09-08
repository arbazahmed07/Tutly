import "@/styles/globals.css";
import type { Metadata } from "next";
import Provider from "@/providers/Provider";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { GoogleAnalytics } from '@next/third-parties/google'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tutly",
  description: "Empowering students with state-of-the-art tools and resources for academic success. Our platform integrates innovative learning methods, collaboration opportunities, and growth-focused features. Transform your educational journey with personalized support, interactive content, and a vibrant community. Discover the future of education, tailored for you.",
  icons: {
    icon: "/images/logo2.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider
      refetchInterval={5 * 60}// 5 minutes
      session={session}>
      <html lang="en" className="bg-background text-foreground">
        <body className={inter.className}>
          <Provider>{children}</Provider>
        </body>
        <GoogleAnalytics gaId="G-M4JY8QWX09" />
      </html>
    </SessionProvider>
  );
}
