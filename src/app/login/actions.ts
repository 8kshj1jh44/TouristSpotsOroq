"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginLimiter, getClientIp } from "@/lib/rate-limit";
import { ADMIN_EMAIL } from "@/lib/supabase/auth";

export type LoginState = {
  error?: string;
  retryAfterMs?: number;
  fieldErrors?: { email?: string; password?: string };
};

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const ip = await getClientIp();
  const rate = loginLimiter.check(ip);
  if (!rate.allowed) {
    return {
      error: "Too many attempts. Please try again later.",
      retryAfterMs: rate.retryAfterMs,
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      error: "Please enter your email and password.",
      fieldErrors: {
        email: email ? undefined : "Required",
        password: password ? undefined : "Required",
      },
    };
  }

  if (email !== ADMIN_EMAIL) {
    loginLimiter.check(ip);
    return { error: "Invalid credentials." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    loginLimiter.check(ip);
    return { error: "Invalid credentials." };
  }

  loginLimiter.reset(ip);
  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}