import { redirect } from "next/navigation";
import { createClient } from "./server";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function isAdmin(): Promise<boolean> {
  if (!ADMIN_EMAIL) return false;
  const user = await getCurrentUser();
  return Boolean(user && user.email === ADMIN_EMAIL);
}

/**
 * Guards an admin page. Redirects to /login when unauthenticated and returns
 * the user, or throws a 403-style result via redirect when authenticated but
 * not the admin. Throws a redirect to / when not allowed.
 */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.email !== ADMIN_EMAIL) redirect("/");
  return user;
}