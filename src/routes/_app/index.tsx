import { Suspense, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import type { TicketFilters } from "@/types";
import {
  Filters,
  Metrics,
  TicketsGrid,
  TicketsGridSkeleton,
  TicketSidebar,
} from "@/components/dashboard";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
});

function Dashboard() {
  const [activeFilters, setActiveFilters] = useState<TicketFilters>({
    category: null,
    status: null,
  });
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  return (
    <div className="px-4 sm:px-8 py-6 sm:py-8">
      <Metrics />
      <Filters activeFilter={activeFilters} onFilterChange={setActiveFilters} />
      <Suspense fallback={<TicketsGridSkeleton />}>
        <TicketsGrid
          filters={activeFilters}
          onTicketClick={setSelectedTicketId}
        />
      </Suspense>

      <TicketSidebar
        ticketId={selectedTicketId}
        onClose={() => setSelectedTicketId(null)}
      />
    </div>
  );
}
