import { useTicket } from "@/api/ticket.queries";
import { Badge } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import type { AgentTask } from "@/types";
import { CalendarDays } from "lucide-react";
import { AgentTaskCard } from "./agent-task-card";
import { EscalationCard } from "./escalation-card";
import { EventTimeline } from "./event-timeline";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}

export function TicketSidebarContent({ ticketId }: { ticketId: string }) {
  const { data: ticket } = useTicket(ticketId);

  return (
    <div className="px-6 py-5 flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge status={ticket.status} />
        <div className="flex items-center gap-1.5">
          <CalendarDays className="w-3 h-3 text-gray-700" />
          <span className="text-xs font-mono text-gray-700">
            {formatDate(ticket.created_at)}
          </span>
        </div>
        {ticket.resolved_at && (
          <span className="text-xs font-mono text-gray-700">
            → resolved {formatDate(ticket.resolved_at)}
          </span>
        )}
      </div>

      <div>
        <SectionLabel>Description</SectionLabel>
        <p className="text-sm text-gray-400 leading-relaxed">
          {ticket.description}
        </p>
      </div>

      {ticket.agent_tasks?.length > 0 && (
        <div>
          <SectionLabel>Agent resolution</SectionLabel>
          <div className="flex flex-col gap-3">
            {ticket.agent_tasks.map((task: AgentTask) => (
              <AgentTaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {ticket.escalation && (
        <div>
          <SectionLabel>Escalation</SectionLabel>
          <EscalationCard escalation={ticket.escalation} />
        </div>
      )}

      {ticket.events?.length > 0 && (
        <div>
          <SectionLabel>Timeline</SectionLabel>
          <EventTimeline events={ticket.events} />
        </div>
      )}
    </div>
  );
}
