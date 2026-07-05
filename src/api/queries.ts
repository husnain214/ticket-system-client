import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { fetchAnalytics, fetchTickets, fetchTicketById } from "./services";

export function useTickets(status: string | null, category: string | null) {
  return useSuspenseQuery({
    queryKey: ["tickets", category, status],
    queryFn: () => fetchTickets(status, category),
  });
}

export function useTicket(ticketId: string) {
  return useSuspenseQuery({
    queryKey: ["tickets", ticketId],
    queryFn: () => fetchTicketById(ticketId),
  });
}

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: () => fetchAnalytics(),
  });
}
