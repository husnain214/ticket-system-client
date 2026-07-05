import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ServerError } from "@/components/errors/server-error";

import "@/styles/globals.css";
import { NotFound } from "@/components/errors/not-found";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ({ error, reset }) => (
    <ServerError error={error} reset={reset} />
  ),
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: "TanStack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}
