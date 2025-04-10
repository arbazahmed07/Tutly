import { redirect } from "next/navigation";
import { getServerSession } from "@tutly/auth";
import { db } from "@tutly/db";
import Bookmarks from "./_components/Bookmarks";

export default async function BookmarksPage() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const bookmarks = await db.bookMarks.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="container mx-auto py-6">
      <Bookmarks bookmarks={bookmarks} />
    </div>
  );
} 