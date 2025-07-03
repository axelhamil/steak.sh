import "@packages/ui/globals.css";
import { Toaster } from "@packages/ui/index";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { getLocale } from "next-intl/server";
import type { ReactElement, ReactNode } from "react";
import Providers from "../common/providers";
import "./global.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): Promise<ReactElement> {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <Providers>
          {children}
          <Toaster richColors position="top-right" closeButton />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Steak.sh - The meatiest URL shortener",
    template: "%s | Steak.sh",
  },
  description:
    "Shorten your URLs with style. Steak.sh is a simple, fast, and customizable URL shortener with analytics, QR codes, and a powerful REST API.",
  keywords: [
    "URL Shortener",
    "Link Shortener",
    "Custom URLs",
    "Analytics",
    "QR Codes",
    "REST API",
    "Steak.sh",
  ],
  authors: [{ name: "AxelHamil" }],
  creator: "AxelHamil",
  publisher: "AxelHamil",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://steak.sh"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://steak.sh",
    title: "Steak.sh - The meatiest URL shortener",
    description:
      "Shorten your URLs with style. Steak.sh is a simple, fast, and customizable URL shortener with analytics, QR codes, and a powerful REST API.",
    siteName: "Steak.sh",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Steak.sh Application Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steak.sh - The meatiest URL shortener",
    description:
      "Shorten your URLs with style. Steak.sh is a simple, fast, and customizable URL shortener with analytics, QR codes, and a powerful REST API.",
    images: ["/og-image.jpg"],
    creator: "@axelhamil",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
  },
};
