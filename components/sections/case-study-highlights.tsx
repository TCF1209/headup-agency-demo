import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { urlFor } from "@/lib/sanity/image";
import { pickLocale } from "@/lib/sanity/locale";
import type { HomeCaseStudy } from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  caseStudies: HomeCaseStudy[];
  locale: Locale;
};

export function CaseStudyHighlights({ caseStudies, locale }: Props) {
  const t = useTranslations("Home.cases");

  if (caseStudies.length === 0) return null;

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {t("label")}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
                {t("heading")}
              </h2>
            </div>
            <Link
              href="/solutions"
              className="hidden items-center gap-2 text-sm font-medium text-accent hover:underline md:inline-flex"
            >
              {t("viewAll")}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {caseStudies.map((cs) => {
            const title = pickLocale(cs.title, locale);
            const category = cs.category
              ? pickLocale(cs.category.name, locale)
              : null;
            const metricLabel = cs.keyMetric
              ? pickLocale(cs.keyMetric.label, locale)
              : null;
            return (
              <StaggerItem key={cs._id}>
                <Link
                  href={`/solutions/${cs.slug.current}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-alt">
                    <Image
                      src={urlFor(cs.coverImage).width(800).height(1000).url()}
                      alt={title || cs.client}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-5">
                    {category && (
                      <p className="font-mono text-xs uppercase tracking-widest text-muted">
                        {category}
                      </p>
                    )}
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-ink md:text-xl">
                      {title}
                    </h3>
                    {cs.keyMetric && (
                      <p className="mt-2 text-sm text-ink-soft">
                        <span className="font-mono tabular-nums text-accent">
                          {cs.keyMetric.value}
                        </span>
                        {metricLabel ? ` · ${metricLabel}` : ""}
                      </p>
                    )}
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn className="mt-12 md:hidden">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            {t("viewAll")}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
