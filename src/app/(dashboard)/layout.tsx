import HomeLayout from "@/components/layouts/home-layout";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
      <HomeLayout currentUser={currentUser}>
        {children}
      </HomeLayout>
  )
};

