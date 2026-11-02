import type { MetadataRoute } from "next";
import { allowIndexing, site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    // Vorschau: nicht indexieren, bis Domain und Angaben final sind (ALLOW_INDEXING=true setzen)
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
