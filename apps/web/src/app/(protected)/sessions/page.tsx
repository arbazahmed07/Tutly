import { redirect } from "next/navigation";

import { db } from "@tutly/db";
import Sessions from "./_components/Sessions";
import { getServerSession } from "@/lib/auth/session";

export default async function SessionsPage() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const sessions = await db.session.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const accounts = await db.account.findMany({
    where: { userId: session.user.id },
  });

  return (
    <div className="w-full max-w-[600px] mx-auto p-6">
      <Sessions
        sessions={sessions}
        accounts={accounts}
        currentSessionId={session.session?.id}
      />
    </div>
  );
} 