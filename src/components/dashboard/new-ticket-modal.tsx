import type { CreateTicketType } from "@/lib/zod/tickets.schemas";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import { createTicketSchema } from "@/lib/zod/tickets.schemas";
import { TicketCategory, TicketPriority } from "@/types/enums";
import { Input } from "@/components/ui/input";
import { useCreateTicket } from "@/api/tickets/tickets.mutations";

interface NewTicketModalProps {
  open: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { label: "Billing", value: TicketCategory.BILLING },
  { label: "Technical", value: TicketCategory.TECHNICAL },
  { label: "General", value: TicketCategory.GENERAL },
];

const PRIORITIES = [
  { label: "Low", value: TicketPriority.LOW },
  { label: "Medium", value: TicketPriority.MEDIUM },
  { label: "High", value: TicketPriority.HIGH },
  { label: "Critical", value: TicketPriority.CRITICAL },
];

export function NewTicketModal({ open, onClose }: NewTicketModalProps) {
  const { mutate: createTicket, isPending, error } = useCreateTicket();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTicketType>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      category: TicketCategory.BILLING,
      priority: TicketPriority.MEDIUM,
    },
  });

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const onSubmit = (data: CreateTicketType) => {
    createTicket(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const labelClasses =
    "block text-xs font-mono text-gray-600 uppercase tracking-widest mb-1.5";
  const selectClasses = `
    w-full bg-canvas border border-muted rounded-lg px-3 py-2.5 text-sm text-gray-200
    outline-none focus:border-indigo-500/50 transition-colors appearance-none cursor-pointer
  `;
  const errorClasses = "text-xs font-mono text-red-400 mt-1";

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-md bg-subtle border border-muted rounded-xl shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-muted">
          <div>
            <h2 className="text-sm font-semibold text-gray-50">New ticket</h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Submit a ticket to the resolution engine
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-gray-600 hover:text-gray-400 hover:bg-canvas transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 py-5 flex flex-col gap-4"
        >
          {/* title */}
          <div>
            <Input
              label="Title"
              placeholder="Brief description of the issue"
              error={errors.title?.message}
              {...register("title")}
            />
          </div>

          {/* description */}
          <div>
            <label className={labelClasses}>Description</label>
            <textarea
              placeholder="Provide full details about the issue..."
              rows={4}
              className={`
                w-full bg-canvas border rounded-lg px-3 py-2.5 text-sm text-gray-200
                placeholder-gray-700 outline-none transition-colors resize-none
                ${
                  errors.description
                    ? "border-red-500/40 focus:border-red-500/60"
                    : "border-muted focus:border-indigo-500/50"
                }
              `}
              {...register("description")}
            />
            {errors.description && (
              <p className={errorClasses}>{errors.description.message}</p>
            )}
          </div>

          {/* category + priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClasses}>Category</label>
              <select className={selectClasses} {...register("category")}>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className={errorClasses}>{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className={labelClasses}>Priority</label>
              <select className={selectClasses} {...register("priority")}>
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              {errors.priority && (
                <p className={errorClasses}>{errors.priority.message}</p>
              )}
            </div>
          </div>

          {/* server error */}
          {error && <p className={errorClasses}>{error.message}</p>}

          {/* actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm text-gray-500 border border-muted rounded-lg hover:text-gray-300 hover:border-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isPending ? "Submitting..." : "Submit ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
