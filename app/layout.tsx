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
    "A pixel market for people and agents. Makers keep 90%. Nothing on the shelf is over $5.",
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
