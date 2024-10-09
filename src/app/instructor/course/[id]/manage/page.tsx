import { getAllUsers } from "@/actions/users";
import React from "react";
import UserTable from "./_components/UsersTable";
import getCurrentUser from "@/actions/getCurrentUser";

const page = async ({ params }: { params: { id: string } }) => {
  const allUsers = await getAllUsers(params.id);
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "INSTRUCTOR") {
    return (
      <div className="mt-8 text-center text-3xl font-semibold">
        Unauthorized
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <UserTable users={allUsers || []} params={params} />
    </div>
  );
};

export default page;
