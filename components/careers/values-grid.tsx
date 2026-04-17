import { Rocket, Heart, GraduationCap, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";

const values = [
  { key: "impact", Icon: Rocket },
  { key: "client", Icon: Heart },
  { key: "learning", Icon: GraduationCap },
  { key: "team", Icon: Users },
] as const;

export function ValuesGrid() {
  const t = useTranslations("Careers.values");

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

        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {values.map(({ key, Icon }) => (
            <StaggerItem key={key}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6 md:p-8">
                <Icon className="h-6 w-6 text-accent" aria-hidden />
                <h3 className="text-lg font-semibold text-ink">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
