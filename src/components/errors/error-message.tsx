import { AlertCircle } from "lucide-react";

export function ErrorMessage() {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400"
    >
      <AlertCircle className="h-5 w-5 shrink-0" />

      <div>
        <p className="font-medium">Something went wrong</p>
        <p className="text-sm text-red-400/80">Please try again later.</p>
      </div>
    </div>
  );
}
