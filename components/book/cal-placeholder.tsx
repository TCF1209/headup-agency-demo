import { CalendarClock, Mail, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { contact } from "@/lib/constants/contact";

export function CalPlaceholder() {
  const t = useTranslations("Book.placeholder");

  return (
    <div className="flex flex-col gap-6 p-8 md:p-10">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
        <CalendarClock className="h-7 w-7" aria-hidden />
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {t("label")}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {t("title")}
        </h2>
        <p className="text-base leading-relaxed text-ink-soft">{t("body")}</p>
      </div>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-surface transition-colors hover:bg-accent-hover active:scale-[0.98]"
        >
          <Mail className="h-4 w-4" aria-hidden />
          {t("emailCta")}
        </a>
        <a
          href={contact.whatsappUrl}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-5 text-sm font-medium text-ink transition-colors hover:bg-surface-alt active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          {t("whatsappCta")}
        </a>
      </div>
    </div>
  );
}
