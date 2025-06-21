import { Badge } from "@packages/ui/components/ui/badge";
import { Button } from "@packages/ui/components/ui/button";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { AnimatedSlug } from "./components/animated-slug";

export default async function Home(): Promise<ReactNode> {
  const t = await getTranslations("home");
  const featureKeys = ["custom_urls", "rest_api", "dashboard", "free"] as const;

  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-background to-red-900/5 -z-10" />

      <div className="container flex flex-col items-center justify-center gap-6 text-center">
        <Badge
          variant="outline"
          className="mb-8 rounded-lg border-red-500 bg-red-500/20 px-4 py-2 text-red-500"
        >
          {t("hero.badge")}
        </Badge>

        <h1 className="bg-gradient-to-r from-red-500 to-red-900 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
          Steak.sh
        </h1>

        <p className="mx-auto h-12 max-w-3xl text-xl text-muted-foreground md:text-2xl">
          {t("hero.subtitle")}
        </p>

        <div className="mx-auto mb-8 min-w-lg rounded-lg border border-border/50 bg-muted/50 p-4">
          <p className="mb-2 text-sm text-muted-foreground">
            {t("hero.example_url")}
          </p>
          <div className="flex items-center justify-start font-mono">
            <span className="text-red-500">https://steak.sh/</span>
            <AnimatedSlug
              texts={["24bc996c", t("hero.example_url_slug")]}
              separator="/"
            />
          </div>
        </div>

        <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            disabled
            className="bg-red-600/50 px-4 py-2 text-lg cursor-not-allowed"
          >
            {t("hero.cta_main")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            disabled
            className="border-red-600/30 px-4 py-2 text-lg text-red-500/50 cursor-not-allowed"
          >
            {t("hero.cta_secondary")}
          </Button>
        </div>

        <div className="text-center">
          <p className="mb-6 text-muted-foreground">
            {t("hero.features_title")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {featureKeys.map((feature) => (
              <div
                key={feature}
                className="rounded-md border border-red-600/30 bg-red-600/20 px-4 py-2 text-sm text-red-500"
              >
                {t(`features.${feature}`)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
