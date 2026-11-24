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
import "@/styles/story.css";
import "@/styles/catalog.css";
import "@/styles/install.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: { default: "fn/7: the market built for agents", template: "%s · fn/7" },
  description: FACTS.definition,
  applicationName: FACTS.name,
  alternates: { canonical: "/" },
  openGraph: { title: "fn/7: the market built for agents", description: FACTS.definition, url: SITE.origin, siteName: FACTS.name, type: "website" },
  twitter: { card: "summary", title: "fn/7: the market built for agents", description: FACTS.definition },
};

/**
 * Entrance styles hide content until it scrolls into view, so they must only
 * apply when scripts really run. If the app has not started within three
 * seconds (a slow or failed bundle), the class comes off and everything shows.
 */
const REVEAL_GUARD = "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__fn7ready)document.documentElement.classList.remove('js')},3000)";

export const viewport: Viewport = { themeColor: "#03040b", colorScheme: "dark", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${newsreader.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        {/* Entrance styles apply only when scripts run, so the page reads fully without them. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_GUARD }} />
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
