"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@aerovy/ui";

export default function LocalizedError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    // Sentry hooks in P1-T12. For now, surface in the dev console.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-danger text-sm font-medium tracking-wide uppercase">Error</p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="text-muted">{t("description")}</p>
      <Button onClick={() => reset()} className="mt-2">
        {t("cta")}
      </Button>
    </div>
  );
}
