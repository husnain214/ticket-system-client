import { Zap } from "lucide-react";

export function Header() {
  return (
    <header className="border-b-2 border-gray-800 py-3 px-4 sm:py-4 sm:px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="flex gap-2 sm:gap-4 items-center min-w-0">
            <div className="w-fit p-1.5 sm:p-2 rounded-md border bg-indigo-500/15 border-indigo-500/30 shrink-0">
              <Zap size="18" className="sm:hidden" />
              <Zap size="20" className="hidden sm:block" />
            </div>

            <h1 className="font-bold text-lg sm:text-2xl truncate">
              Resolution Engine
            </h1>
          </div>

          <div className="hidden sm:block w-px h-5 bg-gray-800" />

          <span className="hidden sm:inline uppercase text-sm font-mono text-gray-600">
            OPS Dashboard
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="animate-pulse bg-success size-2 rounded-full" />
          <span className="text-xs sm:text-sm font-mono text-gray-600 uppercase">
            live
          </span>
        </div>
      </div>
    </header>
  );
}
