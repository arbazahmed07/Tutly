import { getServerSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

import ClassSidebar from "../_components/classSidebar";
import Class from "../_components/Class";
import { api } from "@/trpc/server";

export default async function ClassPage({
  params,
}: {
  params: Promise<{ id: string; classId: string }>;
}) {
  const session = await getServerSession();
  if (!session?.user) return redirect("/sign-in");

  const { id, classId } = await params;

  const classes = await api.classes.getClassesByCourseId({ courseId: id });
  const classDetails = await api.classes.getClassDetails({ id: classId });
  const notes = await api.notes.getNote({
    userId: session.user.id,
    objectId: classId,
  });
  const bookmark = await api.bookmarks.getBookmark({
    userId: session.user.id,
    objectId: classId,
  });

  if (!classDetails.data) return null;

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
        <Class
          classes={classes.data ?? []}
          classId={classId}
          courseId={id}
          currentUser={session.user}
          details={classDetails.data}
          isBookmarked={!!bookmark.data}
          initialNote={notes.data}
        />
      </div>
    </div>
  );
} 