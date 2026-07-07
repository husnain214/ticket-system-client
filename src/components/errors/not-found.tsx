import { useRouter } from "@tanstack/react-router";
import { FileQuestion, ArrowLeft } from "lucide-react";

export function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="w-12 h-12 bg-subtle border border-muted rounded-xl flex items-center justify-center mb-6">
        <FileQuestion className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
      </div>

      <h1 className="text-base font-semibold text-gray-50 mb-2">
        Page not found
      </h1>
      <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-8">
        The page you are looking for does not exist or has been moved.
      </p>

      <button
        onClick={() => router.navigate({ to: "/" })}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/25 rounded-lg text-indigo-400 text-xs font-medium hover:bg-indigo-500/15 transition-colors"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to dashboard
      </button>

      <p className="mt-8 font-mono text-xs text-gray-700">
        404 · page not found
      </p>
    </div>
  );
}
