import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

export default function BookingConfirmedPage() {
  const t = useTranslations("Book.confirmed");

  return (
    <section className="flex min-h-[70vh] items-center py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-4 text-center md:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
            <CheckCircle2 className="h-8 w-8" aria-hidden />
          </div>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
            {t("label")}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">
            {t("body")}
          </p>
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/">{t("cta")}</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
