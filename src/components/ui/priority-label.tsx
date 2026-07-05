import { cn } from "@/lib/utils";
import type { TicketPriority } from "@/types";

const variants = {
  low: "text-gray-500",
  medium: "text-blue-400",
  high: "text-amber-400",
  critical: "text-red-500",
};

interface PriorityLabel {
  priority: TicketPriority;
}

export function PriorityLabel({ priority }: PriorityLabel) {
  return (
    <span
      className={cn(
        "text-xs font-mono font-medium uppercase tracking-wider",
        variants[priority],
      )}
    >
      {priority}
    </span>
  );
}
