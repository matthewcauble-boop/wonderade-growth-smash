import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { EPISODES } from "@/lib/food-stories";
import { FLAVORS } from "@/lib/site";

const SITE = "https://www.wonderade.us";

// lastModified is a real content date, not "now". A sitemap that claims every URL changed on every deploy teaches
// Google to ignore its dates. Bump CONTENT_UPDATED when page content actually changes.
const CONTENT_UPDATED = new Date("2026-10-14");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
    .filter((p) => p.status === "published")
    .map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: path === "/" ? `${SITE}/` : `${SITE}${path}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/flavors", 0.9),
    ...FLAVORS.map((f) => page(`/flavors/${f.slug}`, 0.9)),
    page("/nutrition", 0.9),
    page("/claim", 0.8),
    page("/faq", 0.7),
    page("/about", 0.6),
    page("/characters", 0.6),
    page("/protein-juice-box", 0.8),
    page("/juice-box-sugar", 0.8),
    page("/lunchbox-drinks", 0.8),
    page("/kids-juice-no-added-sugar", 0.8),
    page("/food-stories", 0.8, "weekly"),
    ...EPISODES.map((e) => ({
      url: `${SITE}/food-stories/${e.slug}`,
      lastModified: new Date(e.datePublished),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    page("/blog", 0.8, "weekly"),
    ...posts,
    page("/punch-list", 0.5),
    page("/contact", 0.3, "yearly"),
    page("/privacy", 0.2, "yearly"),
    page("/sms-terms", 0.2, "yearly"),
  ];
}
