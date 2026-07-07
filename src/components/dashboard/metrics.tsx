import { useAnalytics } from "@/api/tickets/ticket.queries";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "../errors";

export function Metrics() {
  const { data, isPending, error } = useAnalytics();

  if (error) return <ErrorMessage />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 rounded-lg border border-gray-800">
      <MetricCard
        title="Total"
        value={data?.total_tickets ?? 0}
        isPending={isPending}
        isFirst
      />
      <MetricCard
        title="Resolved"
        value={data?.resolved_tickets ?? 0}
        isPending={isPending}
        valueStypes="text-success"
      />
      <MetricCard
        title="Pending"
        value={data?.pending_tickets ?? 0}
        isPending={isPending}
        valueStypes="text-warning"
      />
      <MetricCard
        title="Escalations"
        value={data?.escalations ?? 0}
        isPending={isPending}
        valueStypes="text-info"
      />
      <MetricCard
        title="Resolution Rate"
        value={`${data?.resolution_rate ?? 0}%`}
        isPending={isPending}
        isLast
        className="col-span-2 sm:col-span-1"
      />
    </div>
  );
}

type MetricCardProps = {
  title: string;
  value: string | number;
  isPending: boolean;
  valueStypes?: string;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
};

function MetricCard({
  title,
  value,
  isPending,
  valueStypes,
  isFirst,
  isLast,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-gray-900 px-5 py-3 border-b border-gray-800 sm:border-b-0",
        !isLast && "border-r border-gray-800",
        isLast && "border-r-0",
        isFirst && "rounded-tl-lg sm:rounded-l-lg",
        isLast && "rounded-br-lg sm:rounded-r-lg",
        className,
      )}
    >
      <p className="mb-1.5 font-mono text-sm uppercase tracking-widest text-gray-600">
        {title}
      </p>

      <span className={cn("font-mono text-2xl font-semibold", valueStypes)}>
        {isPending ? "-" : value}
      </span>
    </div>
  );
}
