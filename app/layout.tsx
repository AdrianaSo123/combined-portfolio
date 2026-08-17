import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/nav/SiteNav";
import { Footer } from "@/components/layout/Footer";

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

const SITE_NAME = "Adriana So";
const SITE_DESC =
  "Product experience designer working across product, AI, and human-computer interaction. Designer and builder.";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Product · AI · HCI`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESC,
  openGraph: {
    title: `${SITE_NAME} — Product · AI · HCI`,
    description: SITE_DESC,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Product · AI · HCI`,
    description: SITE_DESC,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
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
