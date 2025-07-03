import { Badge } from "@packages/ui/components/ui/badge";
import { Button } from "@packages/ui/components/ui/button";
import { Card, CardContent, CardHeader } from "@packages/ui/components/ui/card";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { AnimatedSlug } from "./_components/animated-slug";

export default async function Home(): Promise<ReactNode> {
  const t = await getTranslations("home");
  const featureKeys = ["custom_urls", "rest_api", "dashboard", "free"] as const;

  return (
    <main className="@container flex flex-col min-h-screen items-center justify-center gap-6">
      <Badge
        variant="outline"
        className="mb-8 rounded-lg border-primary bg-primary/20 px-4 py-2 text-primary"
      >
        {t("hero.badge")}
      </Badge>

      <h1 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
        Steak.sh
      </h1>

      <p className="mx-auto max-w-3xl text-xl text-foreground md:text-2xl">
        {t("hero.subtitle")}
      </p>

      <Card className="min-w-lg gap-3">
        <CardHeader>
          <p className="text-sm text-foreground">{t("hero.example_url")}</p>
        </CardHeader>
        <CardContent className="flex items-center justify-start font-mono">
          <span className="text-primary">https://steak.sh/</span>
          <AnimatedSlug
            texts={["24bc996c", t("hero.example_url_slug")]}
            separator="/"
          />
        </CardContent>
      </Card>

      <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          size="lg"
          disabled
          className="bg-primary/50 px-4 py-2 text-lg cursor-not-allowed"
        >
          {t("hero.cta_main")}
        </Button>
        <Button
          size="lg"
          variant="outline"
          disabled
          className="border-primary/30 px-4 py-2 text-lg text-primary/50 cursor-not-allowed"
        >
          {t("hero.cta_secondary")}
        </Button>
      </div>

      <div className="text-center">
        <p className="mb-6 text-foreground">{t("hero.features_title")}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {featureKeys.map((feature) => (
            <div
              key={feature}
              className="rounded-md border border-primary/30 bg-primary/20 px-4 py-2 text-sm text-primary"
            >
              {t(`features.${feature}`)}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
