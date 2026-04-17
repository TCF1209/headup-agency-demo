"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function NewsletterForm() {
  const t = useTranslations("Footer.newsletter");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("submitted");
      }}
      className="flex flex-col gap-3"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        {t("placeholder")}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder={t("placeholder")}
        disabled={status === "submitted"}
        className="h-12 rounded-lg border border-surface/20 bg-transparent px-4 text-base text-surface placeholder:text-surface/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
      <button
        type="submit"
        disabled={status === "submitted"}
        className={cn(
          "h-12 rounded-lg bg-accent px-5 text-sm font-medium text-surface transition-colors",
          "hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
          "disabled:opacity-60"
        )}
      >
        {status === "submitted" ? t("submitted") : t("submit")}
      </button>
    </form>
  );
}
