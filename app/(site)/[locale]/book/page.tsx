import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { CalEmbed } from "@/components/book/cal-embed";
import { MockBooking } from "@/components/book/mock-booking";

const PLACEHOLDER_CAL_LINK = "headupagency/consultation";
const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? PLACEHOLDER_CAL_LINK;
const isCalConfigured = Boolean(
  process.env.NEXT_PUBLIC_CAL_LINK &&
    process.env.NEXT_PUBLIC_CAL_LINK !== PLACEHOLDER_CAL_LINK
);

function BreadcrumbRow() {
  const tNav = useTranslations("Nav");
  const t = useTranslations("Book");
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted"
    >
      <Link href="/" className="hover:text-ink">
        {tNav("home")}
      </Link>
      <span aria-hidden>/</span>
      <span className="text-ink">{t("breadcrumb")}</span>
    </nav>
  );
}

export default function BookPage() {
  const t = useTranslations("Book");
  const takeaways = [
    t("takeaways.item1"),
    t("takeaways.item2"),
    t("takeaways.item3"),
  ];

  return (
    <section className="pb-24 pt-12 md:pb-32 md:pt-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <FadeIn>
          <BreadcrumbRow />
        </FadeIn>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <FadeIn className="flex flex-col gap-10">
            <div>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
                {t("title")}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">
                {t("intro")}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {t("takeaways.label")}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {takeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-ink-soft">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <figure className="flex flex-col gap-5">
              <blockquote className="text-lg font-medium leading-snug text-ink md:text-xl">
                &ldquo;{t("testimonial.quote")}&rdquo;
              </blockquote>
              <figcaption className="text-sm">
                <span className="font-semibold text-ink">
                  {t("testimonial.author")}
                </span>
                <span className="text-muted"> · {t("testimonial.business")}</span>
              </figcaption>
            </figure>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-alt">
              <Image
                src="/assets/consultation-2.jpg"
                alt="Head Up Agency consultation"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              {isCalConfigured ? (
                <CalEmbed calLink={calLink} />
              ) : (
                <MockBooking />
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
