import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { pickLocale } from "@/lib/sanity/locale";
import type { Category } from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  categories: Category[];
  activeSlug?: string;
  locale: Locale;
};

const chipBase =
  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function CategoryFilter({ categories, activeSlug, locale }: Props) {
  const t = useTranslations("Solutions.filter");

  return (
    <nav aria-label={t("label")} className="flex flex-wrap gap-2">
      <Link
        href="/solutions"
        className={cn(
          chipBase,
          !activeSlug
            ? "border-ink bg-ink text-surface"
            : "border-border bg-surface text-ink hover:border-ink"
        )}
      >
        {t("all")}
      </Link>
      {categories.map((c) => {
        const isActive = activeSlug === c.slug.current;
        return (
          <Link
            key={c._id}
            href={{
              pathname: "/solutions",
              query: { category: c.slug.current },
            }}
            className={cn(
              chipBase,
              isActive
                ? "border-ink bg-ink text-surface"
                : "border-border bg-surface text-ink hover:border-ink"
            )}
          >
            {pickLocale(c.name, locale)}
          </Link>
        );
      })}
    </nav>
  );
}
