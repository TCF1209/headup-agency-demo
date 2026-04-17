import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/fade-in";
import { ServiceBlock } from "@/components/sections/service-block";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { Link } from "@/i18n/navigation";
import { sanityClient } from "@/lib/sanity/client";
import { faqsQuery } from "@/lib/sanity/queries";
import type { Faq } from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

const GRAB_SUB_KEYS = ["setup", "ads", "campaigns", "analytics"] as const;
const POS_SUB_KEYS = ["setup", "menu", "integration", "support"] as const;

function ServicesHeader() {
  const t = useTranslations("Services.header");
  const tNav = useTranslations("Nav");

  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24">
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
            <span className="text-ink">{tNav("services")}</span>
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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const faqs = await sanityClient.fetch<Faq[]>(faqsQuery);

  return (
    <>
      <ServicesHeader />
      <ServiceBlock
        id="grabfood"
        namespace="grabfood"
        subKeys={GRAB_SUB_KEYS}
        image={{
          src: "/assets/consultation-2.jpg",
          alt: "Menu photography shoot for delivery platform",
        }}
        logos={[
          { src: "/assets/grabfood.png", alt: "GrabFood" },
          { src: "/assets/foodpanda.jpg", alt: "Foodpanda" },
        ]}
      />
      <ServiceBlock
        id="pos"
        namespace="pos"
        subKeys={POS_SUB_KEYS}
        image={{
          src: "/assets/pos-v2.jpg",
          alt: "POS terminal at an F&B outlet",
        }}
        flipped
      />
      <FaqSection faqs={faqs} locale={locale} />
      <FinalCta />
    </>
  );
}
