import { useTicket } from "@/api/tickets/tickets.queries";
import { PriorityLabel } from "@/components/ui";

export function TicketSidebarTitle({ ticketId }: { ticketId: string }) {
  const { data: ticket } = useTicket(ticketId);

  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
          {ticket.category}
        </span>
        <PriorityLabel priority={ticket.priority} />
      </div>
      <p className="text-sm font-semibold text-gray-50 truncate">
        {ticket.title}
      </p>
    </div>
  );
}
