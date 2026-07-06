import { type ComponentProps } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "ghost";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-400",
    ghost:
      "bg-transparent border border-muted text-gray-400 hover:text-gray-300 hover:border-gray-600",
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className,
      )}
      {...props}
    >
      {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
      {children}
    </button>
  );
}
