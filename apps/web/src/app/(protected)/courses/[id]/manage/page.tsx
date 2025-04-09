import { notFound } from "next/navigation";
import { db } from "@tutly/db";
import UsersTable from "./_components/UsersTable";
import { getServerSessionOrRedirect } from "@/lib/auth/session";

export default async function ManageCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSessionOrRedirect();

  if (!session?.user || session.user.role !== "INSTRUCTOR") {
    return notFound();
  }

  const { id } = await params;

  const allUsers = await db.user.findMany({
    where: {
      organizationId: session.user.organizationId,
    },
    include: {
      enrolledUsers: {
        where: {
          courseId: id,
        },
      },
    },
  });

  return (
    <div className="w-full px-4">
      <UsersTable users={allUsers} courseId={id} />
    </div>
  );
}