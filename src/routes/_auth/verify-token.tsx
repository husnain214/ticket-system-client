import type { VerificationFormtype } from "@/lib/zod/auth.schemas";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCard, Button, Input } from "@/components/ui";
import { verificationFormSchema } from "@/lib/zod/auth.schemas";
import { Mail } from "lucide-react";
import { useVerifyToken } from "@/api/auth/auth.queries";
import { useRequestVerify } from "@/api/auth/auth.mutations";

const searchSchema = z.object({
  token: z.string().catch(""),
});

export const Route = createFileRoute("/_auth/verify-token")({
  validateSearch: searchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();

  const { isSuccess, isError, error, fetchStatus, isPending } =
    useVerifyToken(token);

  const isLoading = !!token && isPending && fetchStatus !== "idle";

  if (isLoading) {
    return (
      <div className="min-h-screen  flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
          <p className="text-sm text-gray-500">Verifying your account...</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    toast.success("Your account has been verified. Please log in.");
    navigate({ to: "/login", replace: true });
  }

  if (isError) {
    toast.error(error.message);

    return <VerifyEmailForm />;
  }

  return null;
}

function VerifyEmailForm() {
  const mutation = useRequestVerify();

  const form = useForm<VerificationFormtype>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: VerificationFormtype) {
    mutation.mutate(values.email);
  }

  return (
    <AuthCard
      title="Verify Email"
      subtitle="Enter your email to receive a new link"
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

        <Button type="submit" loading={mutation.isPending}>
          Send Email
        </Button>
      </form>
    </AuthCard>
  );
}
