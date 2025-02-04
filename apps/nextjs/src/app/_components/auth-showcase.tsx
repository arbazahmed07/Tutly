import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth, getSession } from "@tutly/auth";
import { Button } from "@tutly/ui/button";

export async function AuthShowcase() {
  const session = await getSession();
  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {session.user.name}</span>
      </p>

      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await auth.api.signOut({
              headers: headers(),
            });
            redirect("/");
          }}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
