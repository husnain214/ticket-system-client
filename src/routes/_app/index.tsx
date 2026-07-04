import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import useTickets from "@/api/tickets/useTickets";
import Metrics from "@/components/dashboard/metrics";
import FilterTabs from "@/components/dashboard/filter-tabs";
import TicketCard from "@/components/dashboard/ticket-card";

import type { Ticket, TicketFilters } from "@/types";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
});

function Dashboard() {
  const [activeFilters, setActiveFilters] = useState<TicketFilters>({
    category: null,
    status: null,
  });

  const {
    isPending,
    data: tickets,
    error,
  } = useTickets(activeFilters.status, activeFilters.category);

  return (
    <div className="px-8 pt-8">
      <Metrics />

      <div>
        <FilterTabs
          activeFilter={activeFilters}
          onFilterChange={setActiveFilters}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {isPending && <span>Loading</span>}
          {error && <span>{error.message}</span>}
          {tickets &&
            tickets.map((ticket: Ticket) => (
              <TicketCard
                key={ticket.id}
                onClick={() => {}}
                ticket={ticket}
                isNew={false}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
