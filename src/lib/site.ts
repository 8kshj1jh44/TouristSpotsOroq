export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function absolute(path = "/"): string {
  return `${SITE_URL.replace(/\/$/, "")}${path}`;
}