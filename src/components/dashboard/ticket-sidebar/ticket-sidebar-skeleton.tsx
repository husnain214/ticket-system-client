export function TicketSidebarSkeleton() {
  return (
    <div className="px-6 py-5 flex flex-col gap-6 animate-pulse">
      <div className="h-3 w-24 bg-gray-800 rounded" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-800 rounded" />
        <div className="h-3 w-3/4 bg-gray-800 rounded" />
      </div>
      <div className="h-24 bg-gray-800 rounded-lg" />
      <div className="h-32 bg-gray-800 rounded-lg" />
    </div>
  );
}
