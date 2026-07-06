import { config } from "@/lib/config";
import type { LoginFormtype, SignupFormtype } from "@/lib/schemas";

async function signup(formData: SignupFormtype) {
  const res = await fetch(`${config.apiUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const body = await res.json();
    const REGISTER_ERRORS: Record<string, string> = {
      REGISTER_USER_ALREADY_EXISTS:
        "An account with this email already exists.",
      REGISTER_INVALID_PASSWORD: "Password does not meet requirements.",
    };
    throw new Error(REGISTER_ERRORS[body?.detail] ?? "Registration failed.");
  }

  return res.json();
}

async function login({ email, password }: LoginFormtype) {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await fetch(`${config.apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!res.ok) {
    const body = await res.json();
    const AUTH_ERRORS: Record<string, string> = {
      LOGIN_BAD_CREDENTIALS: "Invalid email or password.",
      LOGIN_USER_NOT_VERIFIED: "Please verify your email before signing in.",
      LOGIN_USER_NOT_ACTIVE: "This account has been deactivated.",
    };
    throw new Error(AUTH_ERRORS[body?.detail] ?? "Login failed.");
  }

  return res.json();
}

async function logout(token: string) {
  await fetch(`${config.apiUrl}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function forgotPassword(email: string) {
  const res = await fetch(`${config.apiUrl}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: JSON.stringify({ email }),
  });

  return res.ok;
}

export async function resetPassword(token: string, newPassword: string) {
  const res = await fetch(`${config.apiUrl}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: JSON.stringify({ token, password: newPassword }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const RESET_ERRORS: Record<string, string> = {
      RESET_PASSWORD_BAD_TOKEN: "This reset link is invalid or has expired.",
      RESET_PASSWORD_INVALID_PASSWORD: "Password does not meet requirements.",
    };
    throw new Error(RESET_ERRORS[body?.detail] ?? "Password reset failed.");
  }

  return res.ok;
}

export async function requestVerification(email: string) {
  const res = await fetch(`${config.apiUrl}/auth/request-verify-token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: JSON.stringify({ email }),
  });

  return res.ok;
}

export async function verifyEmail(token: string) {
  const res = await fetch(`${config.apiUrl}/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const VERIFY_ERRORS: Record<string, string> = {
      VERIFY_USER_BAD_TOKEN:
        "This verification link is invalid or has expired.",
      VERIFY_USER_ALREADY_VERIFIED: "This account is already verified.",
    };
    throw new Error(VERIFY_ERRORS[body?.detail] ?? "Verification failed.");
  }

  return res.ok;
}

export async function getCurrentUser(token: string) {
  const res = await fetch(`${config.apiUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    window.location.href = "/login";
    throw new Error("Session expired. Please sign in again.");
  }

  return res.json();
}

export { signup, login, logout };
