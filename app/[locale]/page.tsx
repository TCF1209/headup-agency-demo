import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-start justify-center px-6 py-24 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        {t("label")}
      </p>
      <h1 className="mt-6 text-5xl font-semibold tracking-tight text-ink md:text-6xl lg:text-7xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
        {t("description")}
      </p>
    </main>
  );
}
