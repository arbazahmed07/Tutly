import { redirect } from "next/navigation";
import { SignIn } from "../_components/Signin";

export default async function SignInPage() {
  return <SignIn />;
}
