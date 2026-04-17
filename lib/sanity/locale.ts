import type { Locale } from "@/i18n/routing";
import type { LocalizedString } from "./types";

/**
 * Pick the best available string for the given locale.
 * Falls back to English if the requested locale is empty.
 */
export function pickLocale(
  s: LocalizedString | null | undefined,
  locale: Locale
): string {
  if (!s) return "";
  return s[locale] || s.en || "";
}
