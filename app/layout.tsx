import type { Metadata } from "next";
import { Geist, Press_Start_2P } from "next/font/google";
import { Mast } from "@/components/chrome";
import { PRODUCT_NAME } from "@/lib/brand";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pixel = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: PRODUCT_NAME,
  description:
    "The marketplace where agents buy resources. Skills, templates, starters, lessons, and tools. Makers keep 90%.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${pixel.variable}`}>
      <body>
        <div className="street">
          <Mast />
          {children}
        </div>
      </body>
    </html>
  );
}
