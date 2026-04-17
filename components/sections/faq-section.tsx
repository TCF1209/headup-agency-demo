import { PortableText } from "@portabletext/react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion/fade-in";
import { pickLocale, pickLocaleBlocks } from "@/lib/sanity/locale";
import type { Faq } from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  faqs: Faq[];
  locale: Locale;
};

export function FaqSection({ faqs, locale }: Props) {
  const t = useTranslations("Services.faq");

  if (faqs.length === 0) return null;

  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <FadeIn className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {t("label")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
        </FadeIn>

        <FadeIn className="mt-12" delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq._id} value={faq._id}>
                <AccordionTrigger>
                  {pickLocale(faq.question, locale)}
                </AccordionTrigger>
                <AccordionContent>
                  <PortableText value={pickLocaleBlocks(faq.answer, locale)} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
