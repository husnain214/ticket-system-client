import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, verifyToken } from "./auth.service";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: () => getCurrentUser(),
    retry: false,
  });
}

export function useVerifyToken(token: string | null) {
  return useQuery({
    queryFn: () => verifyToken(token),
    queryKey: ["verify-token"],
    enabled: !!token,
    retry: false,
  });
}
