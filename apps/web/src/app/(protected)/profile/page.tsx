import { api } from "@/trpc/server";
import ProfilePage from "./_components/ProfilePage";
import type { Profile } from "@prisma/client";

export default async function Profile() {
  const userProfile = await api.users.getUserProfile();

  if (!userProfile) {
    return <div>User not found</div>;
  }

  return <ProfilePage userProfile={userProfile} />;
} 