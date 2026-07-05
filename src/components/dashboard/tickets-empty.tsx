import { Inbox } from "lucide-react";
import type { TicketFilters } from "@/types";

interface TicketsEmptyProps {
  filters: TicketFilters;
}

export function TicketsEmpty({ filters }: TicketsEmptyProps) {
  const isFiltered = filters.status !== null || filters.category !== null;

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-10 h-10 bg-subtle border border-muted rounded-lg flex items-center justify-center mb-4">
        <Inbox className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
      </div>

      <p className="text-sm font-medium text-gray-500 mb-1">
        {isFiltered ? "No tickets match your filters" : "No tickets yet"}
      </p>
      <p className="text-xs text-gray-700 font-mono">
        {isFiltered
          ? "Try adjusting the status or category filter"
          : "Tickets will appear here once submitted"}
      </p>
    </div>
  );
}
