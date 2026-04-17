"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { contact } from "@/lib/constants/contact";
import { WhatsAppIcon } from "./social-icons";
import { cn } from "@/lib/utils";

const PATHS_WITH_STICKY_BAR = ["/", "/services", "/solutions"];

function shouldShowOn(pathname: string): boolean {
  if (PATHS_WITH_STICKY_BAR.includes(pathname)) return true;
  if (pathname.startsWith("/solutions/")) return true;
  return false;
}

export function StickyMobileCta() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const eligible = shouldShowOn(pathname);

  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    if (!eligible) return;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 160) {
        setVisible(false);
      } else if (y < lastY.current) {
        setVisible(true);
      } else if (y > lastY.current + 4) {
        setVisible(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [eligible]);

  if (!eligible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className={cn(
            "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 px-4 py-3 backdrop-blur",
            "lg:hidden"
          )}
        >
          <div className="mx-auto flex max-w-md items-center gap-3">
            <Link
              href="/book"
              className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-surface transition-colors hover:bg-accent-hover active:scale-[0.98]"
            >
              {t("bookConsultation")}
            </Link>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-ink transition-colors hover:bg-surface-alt"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
