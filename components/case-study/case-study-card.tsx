import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/lib/sanity/image";
import { pickLocale } from "@/lib/sanity/locale";
import type { CaseStudyCardData } from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  caseStudy: CaseStudyCardData;
  locale: Locale;
  priority?: boolean;
};

export function CaseStudyCard({ caseStudy, locale, priority = false }: Props) {
  const title = pickLocale(caseStudy.title, locale);
  const category = caseStudy.category
    ? pickLocale(caseStudy.category.name, locale)
    : null;
  const metricLabel = caseStudy.keyMetric
    ? pickLocale(caseStudy.keyMetric.label, locale)
    : null;

  return (
    <Link
      href={`/solutions/${caseStudy.slug.current}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-alt">
        <Image
          src={urlFor(caseStudy.coverImage).width(800).height(1000).url()}
          alt={title || caseStudy.client}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex flex-col gap-2">
        {category && (
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {category}
          </p>
        )}
        <h3 className="text-lg font-semibold leading-snug text-ink md:text-xl">
          {title}
        </h3>
        {caseStudy.keyMetric && (
          <p className="text-sm text-ink-soft">
            <span className="font-mono tabular-nums text-accent">
              {caseStudy.keyMetric.value}
            </span>
            {metricLabel ? ` · ${metricLabel}` : ""}
          </p>
        )}
      </div>
    </Link>
  );
}
