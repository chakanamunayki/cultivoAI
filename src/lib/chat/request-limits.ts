/**
 * Limits for the public chat endpoint, so it cannot be used as a free model
 * proxy: capped message and history size, and a per-visitor request rate.
 *
 * The rate limit is kept in memory, so on serverless hosting it is per
 * instance and resets on cold start. It stops a simple loop from one address;
 * it is not a hard guarantee. A shared store would be needed for that.
 */

export const MAX_MESSAGE_CHARS = 2000;
export const MAX_HISTORY_MESSAGES = 24;
export const MAX_HISTORY_MESSAGE_CHARS = 4000;

export interface ChatTurn {
  role: "user" | "model";
  text: string;
}

/** Keeps the most recent well-formed turns, each trimmed to a sane length. */
export function sanitizeHistory(history: unknown): ChatTurn[] {
  if (!Array.isArray(history)) return [];
  const turns: ChatTurn[] = [];
  for (const item of history) {
    if (!item || typeof item !== "object") continue;
    const { role, text } = item as { role?: unknown; text?: unknown };
    if ((role !== "user" && role !== "model") || typeof text !== "string") continue;
    const trimmed = text.trim();
    if (!trimmed) continue;
    turns.push({ role, text: trimmed.slice(0, MAX_HISTORY_MESSAGE_CHARS) });
  }
  return turns.slice(-MAX_HISTORY_MESSAGES);
}

export interface RateLimiter {
  /** True if this caller may make a request now. */
  allow(callerId: string, now?: number): boolean;
}

export function createRateLimiter(maxRequests: number, windowMs: number): RateLimiter {
  const hits = new Map<string, number[]>();
  return {
    allow(callerId, now = Date.now()) {
      const recent = (hits.get(callerId) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= maxRequests) {
        hits.set(callerId, recent);
        return false;
      }
      recent.push(now);
      hits.set(callerId, recent);
      // Drop idle callers so the map cannot grow without bound.
      if (hits.size > 5000) {
        for (const [id, times] of hits) {
          if (times.every((t) => now - t >= windowMs)) hits.delete(id);
        }
      }
      return true;
    },
  };
}
