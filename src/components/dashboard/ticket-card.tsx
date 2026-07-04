import { Badge } from "@/components/ui/badge";
import { PriorityLabel } from "@/components/ui/priority-label";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function TicketCard({ ticket, onClick, isNew }) {
  return (
    <div
      onClick={() => onClick(ticket.id)}
      className={`
        group relative bg-subtle border border-gray-800 rounded-lg p-4
        cursor-pointer transition-all duration-200
        hover:border-indigo-500/40
        ${isNew ? "slide-in border-indigo-500/30" : ""}
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
          {ticket.category}
        </span>
        <PriorityLabel priority={ticket.priority} />
      </div>

      <p
        className="
        text-sm font-medium text-gray-400 leading-snug mb-3
        group-hover:text-gray-50 transition-colors line-clamp-2
      "
      >
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
