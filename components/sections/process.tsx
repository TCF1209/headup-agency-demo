import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";

const steps = ["discover", "strategize", "execute", "optimize"] as const;

export function Process() {
  const t = useTranslations("Home.process");

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

        <StaggerContainer className="mt-14 grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {steps.map((step, i) => (
            <StaggerItem key={step}>
              <div className="flex flex-col gap-4">
                <span className="font-mono text-4xl font-semibold tabular-nums text-accent md:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold text-ink">
                  {t(`steps.${step}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {t(`steps.${step}.description`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
