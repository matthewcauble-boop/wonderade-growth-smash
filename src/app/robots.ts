import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/invest", "/share"] }],
    // The Punch List subdomain is covered by the same Search Console domain property, so its sitemap can be listed here.
    sitemap: ["https://www.wonderade.us/sitemap.xml", "https://punchlist.wonderade.us/sitemap.xml"],
  };
}
