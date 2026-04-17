import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { ValuesGrid } from "@/components/careers/values-grid";
import { TeamCollage } from "@/components/careers/team-collage";
import { JobCard } from "@/components/careers/job-card";
import { FinalCta } from "@/components/sections/final-cta";
import { sanityClient } from "@/lib/sanity/client";
import { activeJobsQuery } from "@/lib/sanity/queries";
import type { Job } from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

function CareersHero() {
  const t = useTranslations("Careers.hero");
  const tNav = useTranslations("Nav");

  return (
    <section className="pb-16 pt-12 md:pt-16 lg:pb-24">
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
            <span className="text-ink">{tNav("careers")}</span>
          </nav>
        </FadeIn>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <FadeIn>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
              {t("intro")}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <TeamCollage />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function OpenPositions({ jobs, locale }: { jobs: Job[]; locale: Locale }) {
  const t = useTranslations("Careers.positions");

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {t("label")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
        </FadeIn>
        {jobs.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-border bg-surface p-8 text-base text-ink-soft">
            {t("empty")}
          </p>
        ) : (
          <StaggerContainer className="mt-12 flex flex-col gap-4 md:mt-14">
            {jobs.map((job) => (
              <StaggerItem key={job._id}>
                <JobCard job={job} locale={locale} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const jobs = await sanityClient.fetch<Job[]>(activeJobsQuery);

  return (
    <>
      <CareersHero />
      <ValuesGrid />
      <OpenPositions jobs={jobs} locale={locale} />
      <FinalCta />
    </>
  );
}
