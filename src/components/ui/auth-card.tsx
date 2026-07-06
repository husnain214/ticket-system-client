import { Zap } from "lucide-react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-indigo-500/15 border border-indigo-500/30 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-indigo-400" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-50 leading-none">
              Resolution Engine
            </p>
            <p className="text-xs font-mono text-gray-600 mt-0.5">
              ops dashboard
            </p>
          </div>
        </div>

        <div className="bg-subtle border border-muted rounded-xl p-6">
          <h1 className="text-base font-semibold text-gray-50 mb-1">{title}</h1>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
