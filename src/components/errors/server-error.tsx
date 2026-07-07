import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { AlertTriangle, RefreshCw, LogIn } from "lucide-react";

interface ServerErrorProps {
  error: Error;
  reset?: () => void;
}

export function ServerError({ error, reset }: ServerErrorProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleRetry = async () => {
    await queryClient.invalidateQueries();
    reset?.();
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center px-6 text-center">
      <div className="w-12 h-12 bg-red-500/8 border border-red-500/20 rounded-xl flex items-center justify-center mb-6">
        <AlertTriangle className="w-5 h-5 text-red-400" strokeWidth={1.5} />
      </div>

      <h1 className="text-base font-semibold text-gray-50 mb-2">
        Unable to reach the server
      </h1>
      <p className="text-sm text-gray-500 leading-relaxed max-w-sm mb-8">
        The backend API is not responding. This usually means the server is down
        or your network connection has been interrupted.
      </p>

      <div className="flex items-center gap-3">
        {reset && (
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/25 rounded-lg text-indigo-400 text-xs font-medium hover:bg-indigo-500/15 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Try again
          </button>
        )}
        <button
          onClick={() => router.navigate({ to: "/login" })}
          className="flex items-center gap-2 px-4 py-2 border border-muted rounded-lg text-gray-500 text-xs font-medium hover:text-gray-400 hover:border-gray-600 transition-colors"
        >
          <LogIn className="w-3 h-3" />
          Go to login
        </button>
      </div>

      <div className="mt-8 bg-subtle border border-muted rounded-lg px-4 py-3 text-left font-mono text-xs text-gray-700 space-y-1 w-full max-w-sm">
        <div>
          <span className="text-gray-600">message</span>
          {"    "}
          {error.message}
        </div>
        <div>
          <span className="text-gray-600">timestamp</span>
          {"  "}
          {new Date().toISOString()}
        </div>
      </div>
    </div>
  );
}
