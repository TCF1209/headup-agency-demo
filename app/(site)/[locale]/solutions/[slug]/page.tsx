import Image from "next/image";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { CaseStudyCard } from "@/components/case-study/case-study-card";
import { AnimatedStat } from "@/components/case-study/animated-stat";
import { VideoEmbed } from "@/components/case-study/video-embed";
import { FinalCta } from "@/components/sections/final-cta";
import { Button } from "@/components/ui/button";
import { sanityClient } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { pickLocale, pickLocaleBlocks } from "@/lib/sanity/locale";
import {
  allCaseStudySlugsQuery,
  caseStudyBySlugQuery,
  relatedCaseStudiesQuery,
} from "@/lib/sanity/queries";
import type {
  CaseStudyCardData,
  CaseStudyDetail,
  Stat,
} from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(
    allCaseStudySlugsQuery
  );
  return slugs.map(({ slug }) => ({ slug }));
}

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export default async function CaseStudyDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  const [caseStudy, related] = await Promise.all([
    sanityClient.fetch<CaseStudyDetail | null>(caseStudyBySlugQuery, { slug }),
    sanityClient.fetch<CaseStudyCardData[]>(relatedCaseStudiesQuery, { slug }),
  ]);

  if (!caseStudy) notFound();

  return (
    <>
      <Hero caseStudy={caseStudy} locale={locale} />
      <QuickStatsBar stats={caseStudy.quickStats} locale={locale} />
      <Sections caseStudy={caseStudy} locale={locale} />
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <MetricsBlock metrics={caseStudy.metrics} locale={locale} />
      )}
      {caseStudy.videoUrl && (
        <VideoSection url={caseStudy.videoUrl} locale={locale} title={pickLocale(caseStudy.title, locale)} />
      )}
      {caseStudy.testimonial && (
        <TestimonialBlock testimonial={caseStudy.testimonial} locale={locale} />
      )}
      {related.length > 0 && (
        <RelatedBlock related={related} locale={locale} />
      )}
      <FinalCta />
    </>
  );
}

function Hero({
  caseStudy,
  locale,
}: {
  caseStudy: CaseStudyDetail;
  locale: Locale;
}) {
  const t = useTranslations("Solutions.detail");
  const title = pickLocale(caseStudy.title, locale);
  const category = caseStudy.category
    ? pickLocale(caseStudy.category.name, locale)
    : null;

  return (
    <section className="pt-8 pb-12 md:pt-12 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <FadeIn>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t("backToAll")}
          </Link>
          <div className="mt-8 flex flex-col gap-4">
            {category && (
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                {category}
              </p>
            )}
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="text-lg text-muted md:text-xl">{caseStudy.client}</p>
          </div>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-surface-alt md:mt-14">
            <Image
              src={urlFor(caseStudy.coverImage).width(1600).height(900).url()}
              alt={title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function QuickStatsBar({ stats, locale }: { stats: Stat[]; locale: Locale }) {
  if (!stats || stats.length === 0) return null;
  return (
    <section className="border-y border-border bg-surface-alt py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <dl className="grid gap-8 md:grid-cols-3">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-2">
              <dd className="font-mono text-4xl font-semibold tabular-nums text-ink md:text-5xl">
                <AnimatedStat value={s.value} />
              </dd>
              <dt className="text-sm text-muted">
                {pickLocale(s.label, locale)}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Sections({
  caseStudy,
  locale,
}: {
  caseStudy: CaseStudyDetail;
  locale: Locale;
}) {
  const t = useTranslations("Solutions.detail");

  const blocks = [
    {
      label: t("challengeLabel"),
      heading: t("challengeHeading"),
      value: caseStudy.problem,
    },
    {
      label: t("approachLabel"),
      heading: t("approachHeading"),
      value: caseStudy.solution,
    },
    {
      label: t("outcomeLabel"),
      heading: t("outcomeHeading"),
      value: caseStudy.results,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto flex max-w-4xl flex-col gap-16 px-4 md:px-6 md:gap-20 lg:px-8">
        {blocks.map((b) => (
          <FadeIn key={b.label}>
            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {b.label}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {b.heading}
              </h2>
              <div className="prose-case-study mt-2 text-base leading-relaxed text-ink-soft md:text-lg">
                <PortableText value={pickLocaleBlocks(b.value, locale)} />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function MetricsBlock({
  metrics,
  locale,
}: {
  metrics: Stat[];
  locale: Locale;
}) {
  return (
    <section className="border-t border-border bg-surface-alt py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <StaggerContainer className="grid gap-6 md:grid-cols-2">
          {metrics.map((m, i) => (
            <StaggerItem key={i}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <p className="font-mono text-3xl font-semibold tabular-nums text-accent md:text-4xl">
                  <AnimatedStat value={m.value} />
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  {pickLocale(m.label, locale)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function VideoSection({
  url,
  locale,
  title,
}: {
  url: string;
  locale: Locale;
  title: string;
}) {
  const t = useTranslations("Solutions.detail");
  void locale;
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {t("videoLabel")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {t("videoHeading")}
          </h2>
          <div className="mt-8">
            <VideoEmbed url={url} title={title} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function TestimonialBlock({
  testimonial,
  locale,
}: {
  testimonial: NonNullable<CaseStudyDetail["testimonial"]>;
  locale: Locale;
}) {
  const t = useTranslations("Solutions.detail");
  const quote = pickLocale(testimonial.quote, locale);
  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {t("testimonialLabel")}
          </p>
          <blockquote className="mt-6 text-2xl font-medium leading-snug text-ink md:text-3xl lg:text-4xl">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft font-mono text-base font-semibold text-accent">
              {testimonial.authorName.slice(0, 1)}
            </div>
            <div>
              <p className="text-base font-semibold text-ink">
                {testimonial.authorName}
              </p>
              {testimonial.businessName && (
                <p className="text-sm text-muted">{testimonial.businessName}</p>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function RelatedBlock({
  related,
  locale,
}: {
  related: CaseStudyCardData[];
  locale: Locale;
}) {
  const t = useTranslations("Solutions.detail");
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <FadeIn className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {t("relatedLabel")}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {t("relatedHeading")}
            </h2>
          </div>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            {t("backToAll")}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </FadeIn>
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {related.map((cs) => (
            <StaggerItem key={cs._id}>
              <CaseStudyCard caseStudy={cs} locale={locale} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <Link href="/book">{t("detailCta")}</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
