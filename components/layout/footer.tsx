import Image from "next/image";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { contact } from "@/lib/constants/contact";
import { NewsletterForm } from "./newsletter-form";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
} from "./social-icons";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-ink text-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
          <div className="flex flex-col gap-4">
            <Image
              src="/assets/logo.png"
              alt="Head Up Agency"
              width={140}
              height={36}
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="max-w-sm text-sm leading-relaxed text-surface/70">
              {t("tagline")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-surface/50">
              {t("services.heading")}
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-surface/80 hover:text-surface"
                >
                  {t("services.grabfood")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-surface/80 hover:text-surface"
                >
                  {t("services.pos")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-surface/50">
              {t("company.heading")}
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link
                  href="/solutions"
                  className="text-surface/80 hover:text-surface"
                >
                  {tNav("solutions")}
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-surface/80 hover:text-surface"
                >
                  {tNav("careers")}
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-surface/80 hover:text-surface"
                >
                  {tNav("partners")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-surface/80 hover:text-surface"
                >
                  {tNav("blog")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-surface/50">
              {t("contact.heading")}
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-surface/80 hover:text-surface"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 text-surface/80 hover:text-surface"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {t("contact.whatsapp")}
                </a>
              </li>
              <li className="text-surface/60">
                {t("contact.addressPlaceholder")}
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-surface/50">
              {t("newsletter.heading")}
            </p>
            <p className="text-sm text-surface/70">{t("newsletter.copy")}</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-surface/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-surface/60">
            {t("copyright", { year })}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-surface/60 hover:text-surface"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-sm text-surface/60 hover:text-surface"
            >
              {t("terms")}
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/headupagency"
                aria-label="Instagram"
                target="_blank"
                rel="noopener"
                className="text-surface/60 hover:text-surface"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/headupagency"
                aria-label="Facebook"
                target="_blank"
                rel="noopener"
                className="text-surface/60 hover:text-surface"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/headupagency"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener"
                className="text-surface/60 hover:text-surface"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
