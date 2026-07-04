import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchTickets } from "./tickets.service";

export function useTickets(status: string | null, category: string | null) {
  return useSuspenseQuery({
    queryKey: ["tickets", category, status],
    queryFn: () => fetchTickets(status, category),
  });
}
