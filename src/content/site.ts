/**
 * Zentrale Angaben zum Restaurant.
 * Alles, was mit `null` markiert ist, liegt noch nicht vor und wird auf der Website
 * nicht erfunden. Sobald die Angaben bestätigt sind, hier eintragen – die Seiten
 * (Kontakt, Footer, Impressum, Datenschutz, strukturierte Daten) übernehmen sie automatisch.
 */

export type HoursRow = { days: string; time: string; note?: string };

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
  address: { street: string; zip: string; city: string; mapsUrl?: string } | null;
  phone: { display: string; href: string } | null;
  email: string | null;
  hours: HoursRow[] | null;
  kitchenHours: HoursRow[] | null;
  travel: { car?: string; publicTransport?: string; parking?: string } | null;
  operator: Operator | null;
  emailService: { name: string; location: string } | null;
};

export const site: Site = {
  name: "Piazza Meilenstein",
  tagline: "Ristorante · Pizzeria · Bisteccheria",
  description:
    "Hausgemachte Pizza und Pasta, Steaks vom Grill und eine grosse Weinkarte – im Restaurant Piazza Meilenstein in Langenthal.",
  city: "Langenthal",
  // Eigene Domain über NEXT_PUBLIC_SITE_URL, sonst automatisch die Produktionsadresse von Vercel
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),

  // Noch offen – bitte bestätigen bzw. ergänzen:
  address: null,
  phone: null,
  email: null,
  hours: null,
  kitchenHours: null,
  travel: null,
  operator: null,
  emailService: null,
};

export const allowIndexing = process.env.ALLOW_INDEXING === "true";

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
