import { getServerSessionOrRedirect } from "@tutly/auth";
import ReactPlayground from "./ReactPlayground";

export default async function ReactPlaygroundPage() {
  const session = await getServerSessionOrRedirect();
  const currentUser = session?.user;

  return <ReactPlayground currentUser={currentUser} />;
} 