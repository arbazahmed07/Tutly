import { api } from "@/trpc/react";
import ProfilePage from "./_components/ProfilePage";
import type { User, Profile } from "@prisma/client";

export default function Profile() {
  const { data: userProfile, isLoading } = api.users.getUserProfile.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>User not found</div>;
  }

  return <ProfilePage userProfile={userProfile} />;
} 