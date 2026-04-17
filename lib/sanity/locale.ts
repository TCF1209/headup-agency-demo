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

type LocalizedBlocks<T> = {
  en: T[];
  zh?: T[];
  ms?: T[];
};

/**
 * Portable-text variant: picks the locale's block array, falling back
 * to English if the target array is missing or empty.
 */
export function pickLocaleBlocks<T>(
  s: LocalizedBlocks<T> | null | undefined,
  locale: Locale
): T[] {
  if (!s) return [];
  const current = s[locale];
  if (current && current.length > 0) return current;
  return s.en ?? [];
}
