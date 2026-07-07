import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { ServerError } from "@/components/errors/server-error";
import { Header } from "@/components/dashboard";
import { useCurrentUser } from "@/api/auth/auth.queries";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { toast } from "sonner";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
  errorComponent: ({ error, reset }) => (
    <ServerError error={error} reset={reset} />
  ),
});

function AppLayout() {
  const { isPending, fetchStatus, isError, error } = useCurrentUser();

  if (isPending && fetchStatus !== "idle") {
    return <DashboardSkeleton />;
  }

  if (isError) {
    localStorage.removeItem("access_token");
    toast.error(error.message);

    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
