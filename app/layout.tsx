import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/nav/SiteNav";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site";
import { about } from "@/content/about";
import { isPlaceholderHref } from "@/lib/placeholders";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    description: about.headline,
    url: siteConfig.url,
    ...(isPlaceholderHref(about.contactEmail) ? {} : { email: about.contactEmail }),
    knowsAbout: about.focus,
    sameAs: about.socials
      .filter((s) => s.href.startsWith("http") && !isPlaceholderHref(s.href))
      .map((s) => s.href),
  };

  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <JsonLd data={personSchema} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
