import { Badge } from "@/components/ui/badge";
import { PriorityLabel } from "@/components/ui/priority-label";
import { cn, timeAgo } from "@/lib/utils";
import type { Ticket } from "@/types";

interface TicketCardProps {
  ticket: Ticket;
  onClick: (id: string) => void;
  isNew?: boolean;
}

export function TicketCard({
  ticket,
  onClick,
  isNew = false,
}: TicketCardProps) {
  return (
    <div
      onClick={() => onClick(ticket.id)}
      className={cn(
        "group relative bg-subtle border border-gray-800 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-indigo-500/40",
        {
          "slide-in border-indigo-500/30": isNew,
        },
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
          {ticket.category}
        </span>
        <PriorityLabel priority={ticket.priority} />
      </div>

      <p className="text-sm font-medium text-gray-400 leading-snug mb-3 group-hover:text-gray-50 transition-colors line-clamp-2">
        {ticket.title}
      </p>

      <div className="flex items-center justify-between">
        <Badge status={ticket.status} />
        <span className="text-xs font-mono text-gray-700">
          {timeAgo(ticket.created_at)}
        </span>
      </div>
    </div>
  );
}
