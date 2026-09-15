import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const SITE = "https://www.wonderade.us";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
    .filter((p) => p.status === "published")
    .map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/claim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...posts,
  ];
}
