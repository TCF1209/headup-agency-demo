"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UnderlineLink } from "@/components/motion/underline-link";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 w-full transition-colors duration-300",
          scrolled
            ? "border-b border-border bg-bg/95 backdrop-blur"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6 lg:px-8">
          <Link href="/" aria-label="Head Up Agency home" className="shrink-0">
            <Image
              src="/assets/logo.png"
              alt="Head Up Agency"
              width={64}
              height={64}
              priority
              className="h-12 w-12 rounded-md md:h-14 md:w-14"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <UnderlineLink
                key={item.key}
                href={item.href}
                className="text-sm font-medium"
              >
                {t(item.key)}
              </UnderlineLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
            <Button asChild size="default" className="hidden lg:inline-flex">
              <Link href="/book">{t("bookConsultation")}</Link>
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t("menuLabel")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
