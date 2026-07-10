import type { TicketEvent } from "@/types";

import { cn, formatDate } from "@/lib/utils";
import { EventType } from "@/types";
import { Clock } from "lucide-react";

const EVENT_DOT: Record<EventType, string> = {
  [EventType.CREATED]: "bg-blue-500",
  [EventType.ROUTED]: "bg-violet-500",
  [EventType.AGENT_STARTED]: "bg-indigo-500",
  [EventType.AGENT_RESOLVED]: "bg-success",
  [EventType.ESCALATED]: "bg-warning",
  [EventType.ASSIGNED]: "bg-cyan-500",
  [EventType.CLOSED]: "bg-gray-600",
};

export function EventTimeline({ events }: { events: TicketEvent[] }) {
  return (
    <div className="relative">
      <div className="absolute left-1.75 top-0 bottom-0 w-px bg-muted" />
      <div className="flex flex-col gap-5">
        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-4 pl-6 relative">
            <div
              className={cn(
                "absolute left-0 top-1 w-3.5 h-3.5 rounded-full shrink-0 border-2 border-subtle",
                EVENT_DOT[event.event_type],
              )}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono text-gray-400 capitalize">
                {event.event_type.replace(/_/g, " ")}
              </p>
              {event.message && (
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  {event.message}
                </p>
              )}
              <div className="flex items-center gap-1.5 mt-1">
                <Clock className="w-2.5 h-2.5 text-gray-700" />
                <span className="text-xs font-mono text-gray-700">
                  {formatDate(event.created_at)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
