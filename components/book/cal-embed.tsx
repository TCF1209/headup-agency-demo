"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

type Props = {
  calLink: string;
};

export function CalEmbed({ calLink }: Props) {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#D97706",
            "cal-text": "#1A1A1A",
            "cal-text-muted": "#737373",
            "cal-bg": "#FFFFFF",
            "cal-bg-muted": "#F5F5F2",
            "cal-border": "#E5E5E5",
          },
          dark: {
            "cal-brand": "#D97706",
            "cal-text": "#1A1A1A",
            "cal-text-muted": "#737373",
            "cal-bg": "#FFFFFF",
            "cal-bg-muted": "#F5F5F2",
            "cal-border": "#E5E5E5",
          },
        },
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: () => {
          router.push("/book/confirmed");
        },
      });
    })();
  }, [router]);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", minHeight: "700px" }}
      config={{ layout: "month_view" }}
    />
  );
}
