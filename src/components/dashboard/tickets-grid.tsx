import { useTickets } from "@/api/tickets/ticket.queries";

import { TicketsEmpty } from "./tickets-empty";
import type { Ticket, TicketFilters } from "@/types";
import { TicketCard } from "./ticket-card";

interface TicketGridProps {
  filters: TicketFilters;
  onTicketClick: (ticketId: string) => void;
}

export function TicketsGrid({ filters, onTicketClick }: TicketGridProps) {
  const { data: tickets } = useTickets(filters.status, filters.category);

  if (tickets.length === 0) {
    return <TicketsEmpty filters={filters} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {tickets.map((ticket: Ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onClick={onTicketClick}
          isNew={false}
        />
      ))}
    </div>
  );
}
