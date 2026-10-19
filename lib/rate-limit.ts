/**
 * Fixed-window, in-memory rate limiter. On serverless hosts each instance keeps
 * its own window, so this is a speed bump against bursts rather than a hard
 * global limit; swap the store for Redis/KV if the form ever sees real abuse.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function check(key: string, now = Date.now()): { ok: boolean; retryAfterMs: number } {
    if (hits.size > 10_000) {
      for (const [k, entry] of hits) if (entry.resetAt <= now) hits.delete(k);
    }

    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { ok: true, retryAfterMs: 0 };
    }

    entry.count += 1;
    if (entry.count > limit) return { ok: false, retryAfterMs: entry.resetAt - now };
    return { ok: true, retryAfterMs: 0 };
  };
}
