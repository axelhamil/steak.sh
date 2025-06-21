import { ThemeProvider } from "@packages/ui/index";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
