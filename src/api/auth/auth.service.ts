import axios from "axios";
import { api } from "@/lib/axios";
import type { LoginFormtype, SignupFormtype } from "@/lib/schemas";

async function signup(formData: SignupFormtype) {
  try {
    const { data } = await api.post("/auth/register", formData);
    return data;
  } catch (error: unknown) {
    const REGISTER_ERRORS: Record<string, string> = {
      REGISTER_USER_ALREADY_EXISTS:
        "An account with this email already exists.",
      REGISTER_INVALID_PASSWORD: "Password does not meet requirements.",
    };

    if (axios.isAxiosError(error)) {
      const detail = error.response?.data?.detail as string | undefined;
      throw new Error(REGISTER_ERRORS[detail ?? ""] ?? "Registration failed.");
    }

    throw new Error("Registration failed.");
  }
}

async function login({ email, password }: LoginFormtype) {
  try {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const { data } = await api.post("/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return data;
  } catch (error: unknown) {
    const AUTH_ERRORS: Record<string, string> = {
      LOGIN_BAD_CREDENTIALS: "Invalid email or password.",
      LOGIN_USER_NOT_VERIFIED: "Please verify your email before signing in.",
      LOGIN_USER_NOT_ACTIVE: "This account has been deactivated.",
    };

    if (axios.isAxiosError(error)) {
      const detail = error.response?.data?.detail as string | undefined;
      throw new Error(AUTH_ERRORS[detail ?? ""] ?? "Login failed.");
    }

    throw new Error("Login failed.");
  }
}

async function logout() {
  await api.post("/auth/logout");
}

async function requestVerification(email: string) {
  try {
    const response = await api.post("/auth/request-verify-token", { email });
    return response.data;
  } catch {
    throw new Error("Something went wrong!");
  }
}

async function verifyToken(token: string | null) {
  if (!token) {
    throw new Error("This verification link is invalid or has expired.");
  }

  try {
    const response = await api.post("/auth/verify", { token });
    return response.data;
  } catch (error: unknown) {
    const VERIFY_ERRORS: Record<string, string> = {
      VERIFY_USER_BAD_TOKEN:
        "This verification link is invalid or has expired.",
      VERIFY_USER_ALREADY_VERIFIED: "This account is already verified.",
    };

    if (axios.isAxiosError(error)) {
      const detail = error.response?.data?.detail as string | undefined;
      throw new Error(VERIFY_ERRORS[detail ?? ""] ?? "Verification failed.");
    }

    throw new Error("Verification failed.");
  }
}

async function getCurrentUser() {
  try {
    const { data } = await api.get("/users/me");
    return data;
  } catch {
    const token = localStorage.getItem("access_token");

    if (token) {
      throw new Error("Session expired. Please sign in again.");
    } else {
      throw new Error("You are not logged in");
    }
  }
}

export {
  signup,
  login,
  logout,
  getCurrentUser,
  verifyToken,
  requestVerification,
};
