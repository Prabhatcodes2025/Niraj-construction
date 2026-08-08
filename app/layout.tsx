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
  title: "Futuregenic Enterprises | Construction & Infrastructure Company",
  description: "Futuregenic Enterprises Private Limited provides building construction, water treatment plant, sewage treatment plant, earthwork and rock breaking services.",
  keywords: ["Construction Company", "Building Construction", "Water Treatment Plant", "Sewage Treatment Plant", "Earthwork Contractor", "Rock Breaking Services", "Civil Construction", "Infrastructure Development"],
  openGraph: {
    title: "Futuregenic Enterprises Private Limited",
    description: "Construction. Infrastructure. Engineering.",
    type: "website",
    siteName: "Futuregenic Enterprises Private Limited",
  },
  twitter: { card: "summary", title: "Futuregenic Enterprises Private Limited", description: "Construction. Infrastructure. Engineering." },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Futuregenic Enterprises Private Limited",
  description: "Construction and infrastructure company serving building, water treatment, sewage treatment, earthwork and rock breaking requirements.",
  foundingDate: "2026-02-25",
  address: {
    "@type": "PostalAddress",
    streetAddress: "101 Pratap Nagar, Mayur Vihar, Phase-1",
    addressLocality: "East Delhi",
    postalCode: "110091",
    addressRegion: "Delhi",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${mono.variable}`}>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
