import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActionBar from "@/components/ActionBar";
import RevealObserver from "@/components/RevealObserver";
import { allowIndexing, site } from "@/content/site";

const bodoni = localFont({
  src: [
    { path: "../../node_modules/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-standard-normal.woff2", style: "normal", weight: "400 900" },
    { path: "../../node_modules/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-standard-italic.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--font-bodoni",
  display: "swap",
  fallback: ["Didot", "Georgia", "serif"],
});

const jost = localFont({
  src: [{ path: "../../node_modules/@fontsource-variable/jost/files/jost-latin-wght-normal.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-jost",
  display: "swap",
  fallback: ["Futura", "Century Gothic", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Ristorante, Pizzeria & Bisteccheria in ${site.city}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: site.name,
    title: `${site.name} · Ristorante, Pizzeria & Bisteccheria`,
    description: site.description,
  },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={`${bodoni.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="has-actionbar">
        <a href="#inhalt" className="skip-link">
          Zum Inhalt springen
        </a>
        <Header />
        <main id="inhalt" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ActionBar />
        <RevealObserver />
      </body>
    </html>
  );
}
