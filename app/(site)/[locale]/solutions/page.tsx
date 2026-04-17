import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { CaseStudyCard } from "@/components/case-study/case-study-card";
import { CategoryFilter } from "@/components/case-study/category-filter";
import { FinalCta } from "@/components/sections/final-cta";
import { Link } from "@/i18n/navigation";
import { sanityClient } from "@/lib/sanity/client";
import {
  allCategoriesQuery,
  caseStudiesByCategoryQuery,
} from "@/lib/sanity/queries";
import type {
  CaseStudyCardData,
  Category,
} from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

function SolutionsHeader() {
  const t = useTranslations("Solutions.header");
  const tNav = useTranslations("Nav");

  return (
    <section className="pb-10 pt-12 md:pb-14 md:pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <FadeIn>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted"
          >
            <Link href="/" className="hover:text-ink">
              {tNav("home")}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink">{tNav("solutions")}</span>
          </nav>
          <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            {t("intro")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

export default async function SolutionsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;

  const [caseStudies, categories] = await Promise.all([
    sanityClient.fetch<CaseStudyCardData[]>(caseStudiesByCategoryQuery, {
      category: category ?? null,
    }),
    sanityClient.fetch<Category[]>(allCategoriesQuery),
  ]);

  return (
    <>
      <SolutionsHeader />
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <FadeIn>
            <CategoryFilter
              categories={categories}
              activeSlug={category}
              locale={locale}
            />
          </FadeIn>
        </div>
      </section>
      <section className="pb-24 pt-4 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          {caseStudies.length === 0 ? (
            <EmptyState />
          ) : (
            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {caseStudies.map((cs, i) => (
                <StaggerItem key={cs._id}>
                  <CaseStudyCard
                    caseStudy={cs}
                    locale={locale}
                    priority={i < 3}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
      <FinalCta />
    </>
  );
}

function EmptyState() {
  const t = useTranslations("Solutions.filter");
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-base text-muted">{t("empty")}</p>
      <Link
        href="/solutions"
        className="mt-4 text-sm font-medium text-accent hover:underline"
      >
        {t("all")}
      </Link>
    </div>
  );
}
