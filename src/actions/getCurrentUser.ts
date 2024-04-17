import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { db } from "@/lib/db";

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return null;

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      throw new Error("Not signed in");
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
}
