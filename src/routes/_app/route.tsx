import Header from "#/components/layout/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: () => (
    <div className="min-h-screen bg-main">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  ),
});
