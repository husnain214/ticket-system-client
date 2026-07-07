import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicket } from "./tickets.service";

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
}
