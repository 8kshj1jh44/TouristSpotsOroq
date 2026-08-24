/**
 * Minimal in-memory fixed-window rate limiter, keyed by IP.
 * State resets on process restart (acceptable for this scope).
 */

type Entry = {
  count: number;
  windowStart: number;
  lockedUntil: number;
};

const store = new Map<string, Entry>();

type RateLimitOptions = {
  /** Max allowed attempts within the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
  /** Lockout duration in ms once the limit is hit. */
  lockMs: number;
};

function prune(now: number, windowMs: number) {
  for (const [key, entry] of store) {
    if (now > entry.windowStart + windowMs && now > entry.lockedUntil) {
      store.delete(key);
    }
  }
}

export class RateLimiter {
  private limit: number;
  private windowMs: number;
  private lockMs: number;

  constructor(options: RateLimitOptions) {
    this.limit = options.limit;
    this.windowMs = options.windowMs;
    this.lockMs = options.lockMs;
  }

  /**
   * Records an attempt for the key and returns whether it is currently allowed.
   * Throws/returns a structured result so the caller can shape the response.
   */
  check(key: string): { allowed: boolean; retryAfterMs: number } {
    const now = Date.now();
    prune(now, this.windowMs);

    const entry = store.get(key);

    if (entry && entry.lockedUntil > now) {
      return { allowed: false, retryAfterMs: entry.lockedUntil - now };
    }

    if (!entry || now > entry.windowStart + this.windowMs) {
      store.set(key, { count: 1, windowStart: now, lockedUntil: 0 });
      return { allowed: true, retryAfterMs: 0 };
    }

    entry.count += 1;
    if (entry.count > this.limit) {
      entry.lockedUntil = now + this.lockMs;
      return { allowed: false, retryAfterMs: entry.lockedUntil - now };
    }

    return { allowed: true, retryAfterMs: 0 };
  }

  reset(key: string) {
    store.delete(key);
  }
}

/** Shared limiter for admin login: 5 failed attempts per 10 minutes, 10 min lockout. */
export const loginLimiter = new RateLimiter({
  limit: 5,
  windowMs: 10 * 60 * 1000,
  lockMs: 10 * 60 * 1000,
});

export async function getClientIp(): Promise<string> {
  const { headers } = await import("next/headers");
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    h.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}