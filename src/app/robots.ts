import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/invest", "/share"] }],
    sitemap: "https://www.wonderade.us/sitemap.xml",
  };
}
