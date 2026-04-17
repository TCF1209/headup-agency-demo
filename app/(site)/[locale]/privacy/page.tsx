import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { FinalCta } from "@/components/sections/final-cta";
import { contact } from "@/lib/constants/contact";

export default function PrivacyPage() {
  const t = useTranslations("Legal.privacy");
  const tNav = useTranslations("Nav");

  return (
    <>
      <section className="pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <FadeIn>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted"
            >
              <Link href="/" className="hover:text-ink">
                {tNav("home")}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-ink">{t("title")}</span>
            </nav>
            <h1 className="mt-8 text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg">
              {t("intro")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
              {t.rich("contact", {
                email: (chunks) => (
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-accent hover:underline"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </FadeIn>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
