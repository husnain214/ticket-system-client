import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Lock, Mail, ShieldCheck } from "lucide-react";
import { AuthCard, Button, Input } from "@/components/ui";
import { signup } from "@/api/auth.service";
import { signupFormSchema, type SignupFormtype } from "@/lib/schemas";

export const Route = createFileRoute("/_auth/signup")({
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const form = useForm<SignupFormtype>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Check your inbox!");
      navigate({ to: "/login" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: SignupFormtype) {
    mutation.mutate(values);
  }

  return (
    <AuthCard
      title="Create account"
      subtitle="Sign up to access the ticket resolution operations dashboard."
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
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              icon={ShieldCheck}
              error={fieldState.error?.message}
            />
          )}
        />

        <Button type="submit" loading={mutation.isPending} className="mt-1">
          Create account
        </Button>

        <p className="text-center text-xs text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
