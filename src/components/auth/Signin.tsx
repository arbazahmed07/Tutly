import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "astro/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/hooks/use-router";

import { ModeToggle } from "../ModeToggle";

const signInSchema = z.object({
  email: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
});

type SignInInput = z.infer<typeof signInSchema>;

export function SignIn() {
  const router = useRouter();
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInInput) => {
    try {
      const response = await fetch("/api/auth/signin/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Authentication failed");
        return;
      }

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.message || "An error occurred during sign in");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-background">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Card className="mx-auto w-full sm:w-[400px] rounded-xl backdrop-blur-md bg-white/50 dark:bg-gray-900/50 shadow-2xl border-2 border-white/30 dark:border-gray-700/50">
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Sign in
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">Username or Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-primary/90 hover:bg-primary transition-colors"
              >
                Sign in
              </Button>
            </form>
          </Form>
          <div className="mt-6 flex flex-col gap-3">
            <a href="/api/auth/signin/google">
              <Button
                variant="outline"
                className="w-full backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 border-white/30 dark:border-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-800/30"
              >
                Sign in with Google
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
