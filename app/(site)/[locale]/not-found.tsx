import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export default function LocaleNotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="flex min-h-[70vh] items-center py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-4 text-center md:px-6 lg:px-8">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {t("label")}
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight text-ink md:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">
            {t("body")}
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/">{t("backHome")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/solutions">{t("browseCases")}</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
