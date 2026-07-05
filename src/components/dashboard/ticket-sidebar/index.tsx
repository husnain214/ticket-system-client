import { Suspense } from "react";
import { Sidebar } from "../../ui/sidebar";
import { TicketSidebarContent } from "./ticket-sidebar-content";
import { TicketSidebarSkeleton } from "./ticket-sidebar-skeleton";
import { TicketSidebarTitle } from "./ticket-sidebar-title";

interface TicketSidebarProps {
  ticketId: string | null;
  onClose: () => void;
}

export function TicketSidebar({ ticketId, onClose }: TicketSidebarProps) {
  return (
    <Sidebar
      open={!!ticketId}
      onClose={onClose}
      title={
        ticketId ? (
          <Suspense
            fallback={
              <div className="h-8 w-48 bg-gray-800 rounded animate-pulse" />
            }
          >
            <TicketSidebarTitle ticketId={ticketId} />
          </Suspense>
        ) : null
      }
    >
      {ticketId && (
        <Suspense fallback={<TicketSidebarSkeleton />}>
          <TicketSidebarContent ticketId={ticketId} />
        </Suspense>
      )}
    </Sidebar>
  );
}
