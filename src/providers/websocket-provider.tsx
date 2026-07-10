import { createContext, useCallback, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWebSocket } from "@/hooks/useWebSocket";
import { toast } from "sonner";

interface WebSocketMessage {
  ticket_id: string;
  status: string;
  category: string;
  result: string;
  agent_type: string;
}

interface WebSocketContextValue {
  connected: boolean;
}

const WebSocketContext = createContext<WebSocketContextValue>({
  connected: false,
});

export function useWebSocketContext() {
  return useContext(WebSocketContext);
}

export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();

  const handleMessage = useCallback(
    (data: WebSocketMessage) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });

      if (data.status === "resolved") {
        toast.success(`Ticket resolved by ${data.agent_type}`, {
          description: data.result.slice(0, 80) + "...",
          duration: 5000,
        });
      }

      if (data.status === "escalated") {
        toast.warning(`Ticket escalated`, {
          description: data.result.slice(0, 80) + "...",
          duration: 6000,
        });
      }
    },
    [queryClient],
  );

  const { connected } = useWebSocket(handleMessage);

  return (
    <WebSocketContext.Provider value={{ connected }}>
      {children}
    </WebSocketContext.Provider>
  );
}
