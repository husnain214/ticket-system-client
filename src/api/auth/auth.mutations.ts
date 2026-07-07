import { useMutation } from "@tanstack/react-query";
import {
  getCurrentUser,
  login,
  requestVerification,
  signup,
} from "./auth.service";
import type { LoginFormtype } from "@/lib/schemas";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function signupMutation() {
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

export function loginMutation() {
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
