import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/speisekarte",
    "/reservation",
    "/kulinarik",
    "/restaurant",
    "/anlaesse",
    "/ueber-uns",
    "/kontakt",
    "/faq",
    "/impressum",
    "/datenschutz",
  ];
  return pages.map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: p === "/speisekarte" ? "monthly" : "yearly",
    priority: p === "" ? 1 : p === "/speisekarte" || p === "/reservation" ? 0.9 : 0.6,
  }));
}
