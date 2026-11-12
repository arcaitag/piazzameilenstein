import type { Metadata } from "next";
import { site } from "@/content/site";

/** Markenname mit Ort – so erscheint die Website in Suchergebnissen und beim Teilen */
export const brand = `${site.name} ${site.city}`;

export const homeTitle = `${brand} · Ristorante, Pizzeria & Bisteccheria`;

export const openGraphBase = {
  type: "website",
  locale: "de_CH",
  siteName: site.name,
} as const;

/** Vorschaubild beim Teilen (Datei src/app/opengraph-image.jpg) */
const shareImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Piazza Meilenstein – Gastraum mit Weinklimaschränken, hängendem Grün und gedeckten Tischen",
};

/**
 * Titel, Beschreibung, Canonical-Link und Vorschau (Open Graph) für eine Unterseite.
 * Der Seitentitel wird über das Template im Layout zu «Titel · Piazza Meilenstein Langenthal».
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} · ${brand}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...openGraphBase, title: fullTitle, description, url: path, images: [shareImage] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [shareImage] },
  };
}
