import { Suspense, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import Metrics from "@/components/dashboard/metrics";
import FilterTabs from "@/components/dashboard/filter-tabs";

import type { TicketFilters } from "@/types";
import { TicketGridSkeleton } from "@/components/dashboard/tickets-grid-skeleton";
import { TicketGrid } from "@/components/dashboard/tickets-grid";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
});

function Dashboard() {
  const [activeFilters, setActiveFilters] = useState<TicketFilters>({
    category: null,
    status: null,
  });

  return (
    <div className="px-8 pt-8">
      <Metrics />
      <FilterTabs
        activeFilter={activeFilters}
        onFilterChange={setActiveFilters}
      />
      <Suspense fallback={<TicketGridSkeleton />}>
        <TicketGrid filters={activeFilters} />
      </Suspense>
    </div>
  );
}
