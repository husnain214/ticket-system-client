import { useTickets } from "@/api/tickets/tickets.queries";
import type { Ticket, TicketFilters } from "@/types";
import TicketCard from "./ticket-card";

interface TicketGridProps {
  filters: TicketFilters;
}

export function TicketGrid({ filters }: TicketGridProps) {
  const { data: tickets } = useTickets(filters.status, filters.category);

  if (tickets.length === 0) {
    return "No tickets available";
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {tickets.map((ticket: Ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onClick={() => {}}
          isNew={false}
        />
      ))}
    </div>
  );
}
