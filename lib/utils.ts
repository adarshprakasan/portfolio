/** Minimal class joiner (the shadcn `cn`, without the extra dependencies). */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
