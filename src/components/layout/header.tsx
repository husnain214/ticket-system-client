import { Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b-2 border-gray-800 py-4 px-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-fit p-2 rounded-md border bg-indigo-500/15 border-indigo-500/30">
              <Zap size="20" />
            </div>

            <h1 className="font-bold text-2xl">Resolution Engine</h1>
          </div>

          <div className="w-px h-5 bg-gray-800" />

          <span className="uppercase text-sm font-mono text-gray-600">
            OPS Dashboard
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="animate-pulse bg-success size-2 rounded-full" />
          <span className="text-sm font-mono text-gray-600 uppercase">
            live
          </span>
        </div>
      </div>
    </header>
  );
}
