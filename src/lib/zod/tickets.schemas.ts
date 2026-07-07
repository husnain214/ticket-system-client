import * as z from "zod";

import { TicketCategory, TicketPriority } from "@/types/enums";

export const createTicketSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be under 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be under 1000 characters"),
  category: z.enum(TicketCategory, {
    message: "Please select a category",
  }),

  priority: z.enum(TicketPriority, {
    message: "Please select a priority",
  }),
});

export type CreateTicketType = z.infer<typeof createTicketSchema>;
