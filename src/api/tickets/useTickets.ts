import { useQuery } from "@tanstack/react-query";
import { fetchTickets } from "./service";

export default function useTickets(
  category: string | null,
  status: string | null,
) {
  const { isPending, error, data } = useQuery({
    queryKey: ["tickets", category, status],
    queryFn: () => fetchTickets(category, status),
  });

  return { isPending, error, data };
}
