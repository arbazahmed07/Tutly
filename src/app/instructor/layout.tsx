import "@/styles/globals.css";
import HomeLayout from "@/components/layouts/home-layout";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "INSTRUCTOR") {
    return null;
  }
  return <HomeLayout currentUser={currentUser}>{children}</HomeLayout>;
}
