import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { db } from "@/server/db";
import ChangePassword from "@/app/(protected)/profile/_components/ChangePassword";

export default async function ChangePasswordPage() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const userWithPassword = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      password: true,
    },
  });

  const isPasswordExists = userWithPassword?.password !== null;

  return (
    <div>
      <ChangePassword isPasswordExists={isPasswordExists} email={session.user.email ?? ""} />
    </div>
  );
} 