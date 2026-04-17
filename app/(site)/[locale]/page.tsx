import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Process } from "@/components/sections/process";
import { CaseStudyHighlights } from "@/components/sections/case-study-highlights";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCta } from "@/components/sections/final-cta";
import { sanityClient } from "@/lib/sanity/client";
import {
  featuredCaseStudiesQuery,
  homeTestimonialsQuery,
} from "@/lib/sanity/queries";
import type { HomeCaseStudy, HomeTestimonial } from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const [caseStudies, testimonials] = await Promise.all([
    sanityClient.fetch<HomeCaseStudy[]>(featuredCaseStudiesQuery),
    sanityClient.fetch<HomeTestimonial[]>(homeTestimonialsQuery),
  ]);

  return (
    <>
      <Hero />
      <ServicesOverview />
      <Process />
      <CaseStudyHighlights caseStudies={caseStudies} locale={locale} />
      <Testimonials items={testimonials} locale={locale} />
      <FinalCta />
    </>
  );
}
