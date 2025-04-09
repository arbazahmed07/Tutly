import { getServerSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

import ClassSidebar from "./_components/classSidebar";
import { api } from "@/trpc/server";

export default async function ClassesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession();
  if (!session?.user) return redirect("/sign-in");

  const { id } = await params;
  const classes = await api.classes.getClassesByCourseId({ courseId: id });

  return (
    <div className="flex items-start w-full">
      <ClassSidebar
        courseId={id}
        classes={classes.data ?? []}
        title="Assignments"
        currentUser={session.user}
        isCourseAdmin={session.user.role === "INSTRUCTOR"}
      />
      <div className="w-full m-3">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Select a class to view details</p>
        </div>
      </div>
    </div>
  );
} 