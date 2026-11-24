import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { Konami } from "@/components/site/konami";
import { Nav } from "@/components/site/nav";
import { FACTS } from "@/lib/facts";
import { SITE } from "@/lib/site";
import "./globals.css";
import "@/styles/base.css";
import "@/styles/ui.css";
import "@/styles/site.css";
import "@/styles/landing.css";
import "@/styles/pages.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: { default: "fn/7: the market built for agents", template: "%s · fn/7" },
  description: FACTS.definition,
  applicationName: FACTS.name,
  openGraph: { title: "fn/7: the market built for agents", description: FACTS.definition, url: SITE.origin, siteName: FACTS.name, type: "website" },
  twitter: { card: "summary_large_image", title: "fn/7: the market built for agents", description: FACTS.definition },
};

export const viewport: Viewport = { themeColor: "#03040b", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <body>
        {/* Entrance styles apply only when scripts run, so the page reads fully without them. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Konami />
      </body>
    </html>
  );
}
