import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Mail, Lock } from "lucide-react";
import { AuthCard, Button, Input } from "@/components/ui";
import { loginFormSchema, type LoginFormtype } from "@/lib/schemas";
import { getCurrentUser, login } from "@/api/auth.service";
import { useAuthStore } from "@/stores/auth";

export const Route = createFileRoute("/_auth/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const form = useForm<LoginFormtype>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const authStore = useAuthStore();

  const mutation = useMutation({
    mutationFn: async (formData: LoginFormtype) => {
      const { access_token } = await login(formData);
      const user = await getCurrentUser(access_token);

      return { access_token, user };
    },
    onSuccess: async ({ access_token, user }) => {
      if (!user.is_verified) {
        toast.warning("Please verify your account before loggin in!");
        return;
      }

      authStore.setToken(access_token);
      authStore.setUser(user);

      toast.success("Logged in successfully!");
      navigate({ to: "/" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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

        <div className="flex justify-end">
          <Link
            to="/"
            className="text-xs font-mono text-gray-600 hover:text-indigo-400 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

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
