import type { MetadataRoute } from "next";
import { allowIndexing, site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    // Vorschau-Deployments und lokale Builds nicht indexieren (siehe allowIndexing in site.ts)
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
