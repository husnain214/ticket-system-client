import type { Escalation } from "@/types";
import { AlertTriangle } from "lucide-react";

export function EscalationCard({ escalation }: { escalation: Escalation }) {
  return (
    <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-3.5 h-3.5 text-warning" />
        <span className="text-xs font-mono text-warning uppercase tracking-wider">
          Escalated
        </span>
      </div>
      {escalation.reason && (
        <p className="text-sm text-gray-400 leading-relaxed mb-2">
          {escalation.reason}
        </p>
      )}
      {escalation.escalated_by_agent && (
        <p className="text-xs font-mono text-gray-700">
          by {escalation.escalated_by_agent}
        </p>
      )}
    </div>
  );
}
