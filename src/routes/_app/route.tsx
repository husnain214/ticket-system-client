import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ServerError } from "@/components/errors/server-error";
import { Header } from "@/components/dashboard";

export const Route = createFileRoute("/_app")({
  component: () => (
    <div className="min-h-screen bg-main">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <ServerError error={error} reset={reset} />
  ),
});
