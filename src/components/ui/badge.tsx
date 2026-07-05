import { cn } from "@/lib/utils";
import type { AgentTaskStatus, TicketStatus } from "@/types";

const variants: Record<string, string> = {
  // TicketStatus
  pending: "bg-info/10    text-info    border-info/20",
  processing: "bg-active/10  text-active  border-active/20",
  resolved: "bg-success/10 text-success border-success/20",
  escalated: "bg-warning/10 text-warning border-warning/20",
  closed: "bg-gray-500/10 text-gray-400 border-gray-500/20",

  // AgentTaskStatus
  completed: "bg-success/10 text-success border-success/20",
  failed: "bg-red-500/10  text-red-400  border-red-500/20",
};

interface BadgeProps {
  status: TicketStatus | AgentTaskStatus;
}

export function Badge({ status }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded border text-xs font-mono font-medium capitalize",
        variants[status] ?? variants.pending,
      )}
    >
      {status}
    </span>
  );
}
