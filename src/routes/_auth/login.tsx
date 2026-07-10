import type { LoginFormtype } from "@/lib/zod/auth.schemas";

import { createFileRoute, Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Mail, Lock } from "lucide-react";
import { AuthCard, Button, Input } from "@/components/ui";
import { loginFormSchema } from "@/lib/zod/auth.schemas";
import { useLogin } from "@/api/auth/auth.mutations";

export const Route = createFileRoute("/_auth/login")({
  component: Login,
});

function Login() {
  const form = useForm<LoginFormtype>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useLogin();

  function onSubmit(values: LoginFormtype) {
    mutation.mutate(values);
  }

  return (
    <AuthCard
      title="Sign in"
      subtitle="Access the operations dashboard to monitor AI-resolved tickets."
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Email"
              name="email"
              type="text"
              placeholder="admin@company.com"
              icon={Mail}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Password"
              name="password"
              type="password"
              placeholder="Min. 8 characters"
              icon={Lock}
              error={fieldState.error?.message}
            />
          )}
        />

        <Button type="submit" loading={mutation.isPending}>
          Sign in
        </Button>

        <p className="text-center text-xs text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
