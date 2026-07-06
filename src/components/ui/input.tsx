import { type ComponentProps } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

export function Input({
  label,
  error,
  icon: Icon,
  className,
  ref,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-mono uppercase tracking-widest text-gray-600">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-700" />
        )}

        <input
          ref={ref}
          className={cn(
            "w-full rounded-lg border bg-canvas py-2.5 text-sm text-gray-200 outline-none transition-colors placeholder:text-gray-700",
            Icon ? "pl-9 pr-3" : "px-3",
            error
              ? "border-red-500/40 focus:border-red-500/60"
              : "border-muted focus:border-indigo-500/50",
            className,
          )}
          {...props}
        />
      </div>

      {error && <p className="text-xs font-mono text-red-400">{error}</p>}
    </div>
  );
}
