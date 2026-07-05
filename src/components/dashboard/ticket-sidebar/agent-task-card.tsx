import { Badge } from "@/components/ui";
import { resolutionSeconds } from "@/lib/utils";
import type { AgentTask } from "@/types";
import { Bot, Timer } from "lucide-react";

export function AgentTaskCard({ task }: { task: AgentTask }) {
  const secs = resolutionSeconds(task);

  return (
    <div className="bg-canvas border border-muted rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-xs font-mono text-indigo-400">
            {task.agent_type}
          </span>
        </div>
        <Badge status={task.status} />
      </div>

      {task.result && (
        <p className="text-sm text-gray-400 leading-relaxed">{task.result}</p>
      )}

      {secs !== null && (
        <div className="flex items-center gap-1.5 mt-3">
          <Timer className="w-3 h-3 text-gray-700" />
          <span className="text-xs font-mono text-gray-700">
            {secs}s resolution time
          </span>
        </div>
      )}
    </div>
  );
}
