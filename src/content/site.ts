/**
 * Zentrale Angaben zum Restaurant.
 * Alles, was mit `null` markiert ist, liegt noch nicht vor und wird auf der Website
 * nicht erfunden. Sobald die Angaben bestätigt sind, hier eintragen – die Seiten
 * (Kontakt, Footer, Impressum, Datenschutz, strukturierte Daten) übernehmen sie automatisch.
 */

import { hoursRows, type HoursRow, type OpeningHours } from "@/lib/hours";

export type { HoursRow };

/** Hauptadresse der Website – Grundlage für Canonical-Links, Sitemap und strukturierte Daten */
const PRODUCTION_URL = "https://www.piazza-meilenstein.ch";

/** Öffnungszeiten laut Google-Unternehmensprofil (Stand November 2026) */
const openingHours: OpeningHours[] = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "06:30", closes: "23:30" },
  { days: ["Saturday", "Sunday"], opens: "07:00", closes: "23:30" },
];

const mapsQuery = encodeURIComponent("Piazza Meilenstein, Lotzwilstrasse 66, 4900 Langenthal");

export type Operator = {
  company: string;
  street: string;
  zip: string;
  city: string;
  uid?: string;
  representative?: string;
  email?: string;
  phone?: string;
};

type Site = {
  name: string;
  tagline: string;
  description: string;
  city: string;
  url: string;
  address: {
    street: string;
    zip: string;
    city: string;
    /** Kantonskürzel für strukturierte Daten */
    region: string;
    /** Gebäude bzw. Zentrum, in dem das Restaurant liegt */
    place?: string;
    mapsUrl?: string;
    directionsUrl?: string;
  } | null;
  /** display: Schreibweise auf der Website, intl: internationales Format für Google */
  phone: { display: string; href: string; intl: string } | null;
  email: string | null;
  openingHours: OpeningHours[] | null;
  hours: HoursRow[] | null;
  kitchenHours: HoursRow[] | null;
  /** Preisspanne pro Person (nur in den strukturierten Daten) */
  priceRange: string | null;
  travel: { car?: string; publicTransport?: string; parking?: string } | null;
  operator: Operator | null;
  emailService: { name: string; location: string } | null;
};

export const site: Site = {
  name: "Piazza Meilenstein",
  tagline: "Ristorante · Pizzeria · Bisteccheria",
  description:
    "Italienisches Restaurant im Meilenstein Langenthal: hausgemachte Pizza und Pasta, Dry Aged Beef vom Grill und eine grosse Weinkarte. Tisch online reservieren.",
  city: "Langenthal",
  // Feste Hauptadresse (www) – bei einem Domainwechsel hier und in next.config.ts anpassen
  url: PRODUCTION_URL,

  address: {
    street: "Lotzwilstrasse 66",
    zip: "4900",
    city: "Langenthal",
    region: "BE",
    place: "Meilenstein Langenthal",
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  },
  phone: { display: "062 919 18 10", href: "tel:+41629191810", intl: "+41 62 919 18 10" },
  openingHours,
  hours: hoursRows(openingHours),
  priceRange: "CHF 10–60",

  // Noch offen – bitte bestätigen bzw. ergänzen:
  email: null,
  kitchenHours: null,
  travel: null,
  operator: null,
  emailService: null,
};

/**
 * Google darf die Website indexieren – nur auf der Produktionsumgebung von Vercel.
 * Vorschau-Deployments und lokale Builds bleiben gesperrt (noindex, robots.txt).
 */
export const allowIndexing = process.env.VERCEL_ENV === "production";

/** Online-Reservation über Lunchgate (Reservationssystem foratable) */
export const reservation = {
  provider: "Lunchgate",
  url: "https://guest.foratable.com/restaurants/019eac0da77573209d605652dc1a7cc5",
  embedUrl: "https://guest.foratable.com/restaurants/019eac0da77573209d605652dc1a7cc5?embed=inline",
  scriptSrc: "https://static.foratable.com/iframeContainers.js",
};

export const mainNav = [
  { href: "/kulinarik", label: "Kulinarik" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/anlaesse", label: "Anlässe" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const footerNav = [
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/reservation", label: "Tisch reservieren" },
  { href: "/kulinarik", label: "Kulinarik" },
  { href: "/restaurant", label: "Restaurant & Erlebnisse" },
  { href: "/anlaesse", label: "Feiern & Firmenanlässe" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/faq", label: "Häufige Fragen" },
  { href: "/kontakt", label: "Kontakt & Anreise" },
] as const;

export const menuPdf = {
  href: "/downloads/speisekarte-piazza-meilenstein.pdf",
  label: "Speisekarte als PDF",
  size: "0.8 MB",
};
