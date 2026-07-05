export function TicketsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-subtle border border-muted rounded-lg p-4 animate-pulse"
        >
          <div className="flex justify-between mb-3">
            <div className="h-2.5 w-16 bg-gray-800 rounded" />
            <div className="h-2.5 w-10 bg-gray-800 rounded" />
          </div>
          <div className="h-3 w-full bg-gray-800 rounded mb-2" />
          <div className="h-3 w-3/4 bg-gray-800 rounded mb-4" />
          <div className="flex justify-between">
            <div className="h-5 w-16 bg-gray-800 rounded" />
            <div className="h-2.5 w-12 bg-gray-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
