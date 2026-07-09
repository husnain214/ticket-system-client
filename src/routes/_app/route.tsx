import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { ServerError } from "@/components/errors/server-error";
import { Header } from "@/components/dashboard";
import AuthProvider from "@/providers/auth-provider";
import WebSocketProvider from "@/providers/websocket-provider";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
  errorComponent: ({ error, reset }) => (
    <ServerError error={error} reset={reset} />
  ),
  beforeLoad: () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
});

function AppLayout() {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <div className="min-h-screen">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
      </WebSocketProvider>
    </AuthProvider>
  );
}
