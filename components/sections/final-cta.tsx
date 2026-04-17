import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  const t = useTranslations("Home.finalCta");

  return (
    <section className="bg-ink py-24 text-surface md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {t("heading")}
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/book">{t("bookCta")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-surface/20 text-surface hover:bg-surface/10"
              >
                <Link href="/book">{t("inquireCta")}</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
