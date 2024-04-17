import getCurrentUser from "@/actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <pre
      className="p-4 w-[700px] mx-auto"
    >
      {JSON.stringify(currentUser, null, 2)}
    </pre>
  );
}
