import { Navigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCurrentUser } from "@/api/auth/auth.queries";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending, fetchStatus, isError, error } = useCurrentUser();

  if (isPending && fetchStatus !== "idle") {
    return <DashboardSkeleton />;
  }

  if (isError) {
    localStorage.removeItem("access_token");
    toast.error(error.message);

    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
