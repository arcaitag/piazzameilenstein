import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActionBar from "@/components/ActionBar";
import RevealObserver from "@/components/RevealObserver";
import { allowIndexing, site } from "@/content/site";
import { brand, homeTitle, openGraphBase } from "@/lib/seo";

// Überschriften: Cormorant Garamond – elegant und auch in grossen Grössen gut lesbar
const cormorant = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2",
      style: "normal",
      weight: "300 700",
    },
    {
      path: "../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-italic.woff2",
      style: "italic",
      weight: "300 700",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Garamond", "Georgia", "serif"],
});

const jost = localFont({
  src: [{ path: "../../node_modules/@fontsource-variable/jost/files/jost-latin-wght-normal.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-jost",
  display: "swap",
  fallback: ["Futura", "Century Gothic", "system-ui", "sans-serif"],
});

// Bestätigungscode der Google Search Console (Methode «HTML-Tag»), als Umgebungsvariable bei Vercel
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: `%s · ${brand}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: { ...openGraphBase, title: homeTitle, description: site.description, url: "/" },
  twitter: { card: "summary_large_image", title: homeTitle, description: site.description },
  robots: allowIndexing
    ? { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
    : { index: false, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
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
