import { TicketStatus, type TicketFilters } from "@/types";
import type { Dispatch, SetStateAction } from "react";

const TICKET_STATUS_FILTERS = [
  {
    label: "All",
    value: null,
  },
  {
    label: "Pending",
    value: TicketStatus.PENDING,
  },
  {
    label: "Processing",
    value: TicketStatus.PROCESSING,
  },
  {
    label: "Resolved",
    value: TicketStatus.RESOLVED,
  },
  {
    label: "Escalated",
    value: TicketStatus.ESCALATED,
  },
] as const;

interface FilterTabsProps {
  activeFilter: TicketFilters;
  onFilterChange: Dispatch<SetStateAction<TicketFilters>>;
}

export default function FilterTabs({
  activeFilter,
  onFilterChange,
}: FilterTabsProps) {
  return (
    <div className="flex items-center gap-1 my-4">
      {TICKET_STATUS_FILTERS.map((status) => (
        <button
          key={status.value}
          onClick={() =>
            onFilterChange((prev) => ({ ...prev, status: status.value }))
          }
          className={`
            px-3 py-1.5 rounded-md text-sm cursor-pointer font-mono capitalize transition-colors border
            ${
              activeFilter.status === status.value
                ? "bg-indigo-500/12 text-indigo-400 border-indigo-500/25"
                : "text-gray-500 border-transparent hover:border-muted hover:text-gray-400"
            }
          `}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
}
