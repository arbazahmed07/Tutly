import "@/styles/globals.css";
import HomeLayout from "@/components/layouts/home-layout";
import getCurrentUser from "@/actions/getCurrentUser";
import CrispChatIntegration from "@/components/crisp";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <HomeLayout currentUser={currentUser}>
      {children}
      <CrispChatIntegration />
    </HomeLayout>
  );
}
