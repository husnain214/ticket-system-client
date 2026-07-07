export function DashboardSkeleton() {
  return (
    <div className="px-4 sm:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-5 border-b border-muted mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`py-3 px-5 bg-subtle animate-pulse ${i < 4 ? "border-r border-muted" : ""}`}
          >
            <div className="h-2 w-14 bg-gray-800 rounded mb-3" />
            <div className="h-5 w-8 bg-gray-800 rounded" />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 my-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-7 bg-gray-800 rounded-md animate-pulse"
            style={{ width: `${[48, 64, 80, 72, 72][i]}px` }}
          />
        ))}
        <div className="ml-auto h-4 w-16 bg-gray-800 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <TicketCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function TicketCardSkeleton() {
  return (
    <div className="bg-subtle border border-muted rounded-lg p-4 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-2.5 w-14 bg-gray-800 rounded" />
        <div className="h-2.5 w-10 bg-gray-800 rounded" />
      </div>

      <div className="space-y-2 mb-3">
        <div className="h-3 w-full bg-gray-800 rounded" />
        <div className="h-3 w-3/4 bg-gray-800 rounded" />
      </div>

      <div className="flex items-center justify-between">
        <div className="h-5 w-16 bg-gray-800 rounded" />
        <div className="h-2.5 w-10 bg-gray-800 rounded" />
      </div>
    </div>
  );
}
