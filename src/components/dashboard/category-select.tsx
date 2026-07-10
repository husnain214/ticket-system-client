import { TicketCategory } from "@/types";
import type { TicketFilters } from "@/types";
import { ChevronDown } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

const CATEGORIES = [
  { label: "All Categories", value: null },
  { label: "Billing", value: TicketCategory.BILLING },
  { label: "Technical", value: TicketCategory.TECHNICAL },
  { label: "General", value: TicketCategory.GENERAL },
];

interface CategorySelectProps {
  activeFilter: TicketFilters;
  onFilterChange: Dispatch<SetStateAction<TicketFilters>>;
}

export function CategorySelect({
  activeFilter,
  onFilterChange,
}: CategorySelectProps) {
  return (
    <div className="relative">
      <select
        value={activeFilter.category ?? ""}
        name="category-filter"
        id="category-filter"
        onChange={(e) =>
          onFilterChange((prev) => ({
            ...prev,
            category: e.target.value as TicketCategory,
          }))
        }
        className="appearance-none bg-subtle border border-muted rounded-md pl-3 pr-8 py-1.5 text-xs font-mono text-gray-400 cursor-pointer hover:border-gray-600 hover:text-gray-300 focus:outline-none focus:border-indigo-500/50 transition-colors"
      >
        {CATEGORIES.map((c) => (
          <option value={c.value ?? ""} key={c.value}>
            {c.value ?? ""}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-1/2 w-3 h-3 text-gray-600 pointer-events-none" />
    </div>
  );
}
