import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import Provider from "@/providers/Provider";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { GoogleAnalytics } from "@next/third-parties/google";
import FaviconSwitcher from "@/providers/FaviconSwitcher";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "",
//   description:
//     "Empowering students with state-of-the-art tools and resources for academic success. Our platform integrates innovative learning methods, collaboration opportunities, and growth-focused features. Transform your educational journey with personalized support, interactive content, and a vibrant community. Discover the future of education, tailored for you.",
//   icons: {
//     icon: "/images/logo2.png",
//   },
// };

const APP_NAME = "LMS Tutly";
const APP_DEFAULT_TITLE = "LMS Tutly";
const APP_TITLE_TEMPLATE = "%s - Tutly ";
const APP_DESCRIPTION =
  "Empowering students with state-of-the-art tools and resources for academic success. Our platform integrates innovative learning methods, collaboration opportunities, and growth-focused features. Transform your educational journey with personalized support, interactive content, and a vibrant community. Discover the future of education, tailored for you.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  icons: {
    icon: "/images/logo2.png",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider
      refetchInterval={5 * 60} // 5 minutes
      session={session}
    >
      <FaviconSwitcher />
      <html lang="en" className="bg-background text-foreground">
        <body className={inter.className}>
          <Provider>{children}</Provider>
        </body>
        <GoogleAnalytics gaId="G-M4JY8QWX09" />
      </html>
    </SessionProvider>
  );
}
