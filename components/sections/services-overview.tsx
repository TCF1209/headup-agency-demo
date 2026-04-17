import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";

const services = [
  { key: "grabfood", href: "/services#grabfood" },
  { key: "pos", href: "/services#pos" },
] as const;

export function ServicesOverview() {
  const t = useTranslations("Home.services");

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

        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {services.map((s) => (
            <StaggerItem key={s.key}>
              <Link
                href={s.href}
                className="group flex h-full flex-col gap-5 rounded-2xl border border-border bg-surface p-6 transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-lg md:p-8"
              >
                <h3 className="text-xl font-semibold text-ink md:text-2xl">
                  {t(`${s.key}.title`)}
                </h3>
                <p className="text-base leading-relaxed text-ink-soft">
                  {t(`${s.key}.blurb`)}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-accent">
                  {t(`${s.key}.cta`)}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
