import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ServerError } from "@/components/errors/server-error";
import { Header } from "@/components/dashboard";
import AuthProvider from "@/providers/auth-provider";
import WebSocketProvider from "@/providers/websocket-provider";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
  errorComponent: ({ error, reset }) => (
    <ServerError error={error} reset={reset} />
  ),
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
