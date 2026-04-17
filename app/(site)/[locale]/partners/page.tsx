import Image from "next/image";
import {
  Coins,
  Megaphone,
  GraduationCap,
  LifeBuoy,
  Tag,
  MapPin,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { PartnerForm } from "@/components/forms/partner-form";
import { FinalCta } from "@/components/sections/final-cta";

const PARTNER_TYPE_KEYS = [
  "pos-hardware",
  "marketing-channel",
  "strategic-referral",
] as const;

const BENEFIT_KEYS = [
  { key: "revenue", Icon: Coins },
  { key: "marketing", Icon: Megaphone },
  { key: "training", Icon: GraduationCap },
  { key: "support", Icon: LifeBuoy },
  { key: "whitelabel", Icon: Tag },
  { key: "territories", Icon: MapPin },
] as const;

function PartnersHero() {
  const t = useTranslations("Partners.hero");
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
            <span className="text-ink">{tNav("partners")}</span>
          </nav>
        </FadeIn>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <FadeIn>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
              {t("intro")}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image
                src="/assets/handshake.jpg"
                alt="Partnership handshake"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function TypesGrid() {
  const t = useTranslations("Partners.types");
  const tItems = useTranslations("Partners.types.items");

  return (
    <section className="border-t border-border bg-surface-alt py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <FadeIn className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {t("label")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
        </FadeIn>
        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {PARTNER_TYPE_KEYS.map((key, i) => (
            <StaggerItem key={key}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6 md:p-8">
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold text-ink md:text-2xl">
                  {tItems(`${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {tItems(`${key}.description`)}
                </p>
                <ul className="mt-2 flex flex-col gap-2 text-sm text-ink-soft">
                  {[1, 2, 3].map((n) => (
                    <li key={n} className="flex items-start gap-2">
                      <span
                        className="mt-1 h-1 w-3 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      <span>{tItems(`${key}.bullet${n}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function BenefitsGrid() {
  const t = useTranslations("Partners.benefits");
  const tItems = useTranslations("Partners.benefits.items");

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <FadeIn className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {t("label")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
        </FadeIn>
        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {BENEFIT_KEYS.map(({ key, Icon }) => (
            <StaggerItem key={key}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-6 md:p-8">
                <Icon className="h-6 w-6 text-accent" aria-hidden />
                <h3 className="text-lg font-semibold text-ink">
                  {tItems(`${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {tItems(`${key}.description`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function FormSection() {
  const t = useTranslations("Partners.form");

  return (
    <section className="border-t border-border bg-surface-alt py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {t("label")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            {t("intro")}
          </p>
        </FadeIn>
        <FadeIn delay={0.1} className="mt-12">
          <PartnerForm />
        </FadeIn>
      </div>
    </section>
  );
}

export default function PartnersPage() {
  return (
    <>
      <PartnersHero />
      <TypesGrid />
      <BenefitsGrid />
      <FormSection />
      <FinalCta />
    </>
  );
}
