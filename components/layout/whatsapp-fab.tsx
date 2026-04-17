"use client";

import { motion } from "framer-motion";
import { usePathname } from "@/i18n/navigation";
import { contact } from "@/lib/constants/contact";
import { WhatsAppIcon } from "./social-icons";
import { cn } from "@/lib/utils";

const PATHS_WITH_STICKY_BAR = ["/", "/services", "/solutions"];

function hasStickyBar(pathname: string): boolean {
  if (PATHS_WITH_STICKY_BAR.includes(pathname)) return true;
  if (pathname.startsWith("/solutions/")) return true;
  return false;
}

export function WhatsAppFab() {
  const pathname = usePathname();
  const hiddenOnMobile = hasStickyBar(pathname);

  return (
    <motion.a
      href={contact.whatsappUrl}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.06, 1] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatDelay: 2.8,
        ease: "easeInOut",
      }}
      className={cn(
        "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-surface shadow-lg transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        hiddenOnMobile && "hidden lg:flex",
        "lg:bottom-8 lg:right-8"
      )}
    >
      <WhatsAppIcon className="h-6 w-6" />
    </motion.a>
  );
}
