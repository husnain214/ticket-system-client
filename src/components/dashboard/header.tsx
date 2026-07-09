import { Plus, Zap } from "lucide-react";
import { useState } from "react";
import { NewTicketModal } from "./new-ticket-modal";
import { useLogout } from "@/api/auth/auth.mutations";
import { useWebSocketContext } from "@/providers/websocket-provider";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import { useCurrentUser } from "@/api/auth/auth.queries";

export function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const { connected } = useWebSocketContext();

  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();

  return (
    <>
      <header className="border-b-2 border-gray-800 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
            <div className="shrink-0 rounded-md border border-indigo-500/30 bg-indigo-500/15 p-1.5 sm:p-2">
              <Zap className="h-5 w-5" />
            </div>

            <h1 className="truncate text-base font-bold sm:text-xl lg:text-2xl">
              Resolution Engine
            </h1>

            <div className="hidden h-5 w-px bg-gray-800 lg:block" />

            <span className="hidden whitespace-nowrap font-mono text-sm uppercase text-gray-600 lg:inline">
              OPS Dashboard
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                  connected ? "bg-success pulse-dot" : "bg-gray-600",
                )}
              />

              <span className="hidden font-mono text-xs text-gray-600 sm:inline">
                {connected ? "live" : "connecting..."}
              </span>
            </div>

            {user?.role === UserRole.ADMIN && (
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-1 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2 py-2 text-indigo-400 transition-colors hover:bg-indigo-500/20 sm:px-3 sm:py-1.5"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden text-xs font-medium sm:inline">
                  New ticket
                </span>
              </button>
            )}

            <button
              disabled={logoutMutation.isPending}
              onClick={() => logoutMutation.mutate()}
              className="whitespace-nowrap font-mono text-xs text-gray-600 transition-colors hover:text-gray-400 disabled:opacity-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <NewTicketModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
