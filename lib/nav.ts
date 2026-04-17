export type NavItem = {
  key: "home" | "services" | "solutions" | "careers" | "partners" | "blog";
  href: string;
};

export const navItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "solutions", href: "/solutions" },
  { key: "careers", href: "/careers" },
  { key: "partners", href: "/partners" },
  { key: "blog", href: "/blog" },
];

export const localeLabels = {
  en: "EN",
  zh: "中文",
  ms: "BM",
} as const;
