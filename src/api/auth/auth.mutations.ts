import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  login,
  logout,
  requestVerification,
  signup,
} from "./auth.service";
import type { LoginFormtype } from "@/lib/zod/auth.schemas";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Check your inbox!");
      navigate({ to: "/login" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData: LoginFormtype) => {
      const { access_token } = await login(formData);

      localStorage.setItem("access_token", access_token);
      const user = await getCurrentUser();

      return { user };
    },
    onSuccess: async ({ user }) => {
      if (!user.is_verified) {
        toast.warning("Please verify your account before loggin in!");
        localStorage.removeItem("access_token");

        return;
      }

      toast.success("Logged in successfully!");
      navigate({ to: "/" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useRequestVerify() {
  return useMutation({
    mutationFn: requestVerification,
    onSuccess: () => {
      toast.success("A new verification email has been sent.");
    },
    onError: () => {
      toast.error("Couldn't resend the email. Please try again.");
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("You have been logged out");
      localStorage.removeItem("access_token");
      navigate({ to: "/login" });
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("Please try again");
    },
  });
}
