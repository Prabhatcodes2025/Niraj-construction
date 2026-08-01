import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

const productionUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: "Niraj Shrivastav Construction | Excavation & Earthwork",
  description: "Rock excavation, bulk earthwork, boulder removal and site development for industrial, commercial and infrastructure projects.",
  openGraph: {
    title: "Niraj Shrivastav Construction",
    description: "Engineering strong foundations. Shaping tomorrow.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Niraj Shrivastav Construction", description: "Heavy civil capability for demanding ground conditions." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
