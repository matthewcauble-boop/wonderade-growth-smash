import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  date: string; // ISO yyyy-mm-dd
  status: "draft" | "review" | "published";
  cta: string;
  html: string;
  faq: { question: string; answer: string }[];
  wordCount: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

// Drafts show on local + Vercel preview deployments, never on production.
function showDrafts(): boolean {
  return process.env.VERCEL_ENV !== "production";
}

function stripLeadingH1(md: string): string {
  // The page renders the title from frontmatter; drop a duplicate H1 in the body.
  return md.replace(/^\s*#\s+[^\n]+\n/, "");
}

// Pull "**Question?**\nAnswer" pairs out of the "## FAQ" section for FAQPage JSON-LD.
function extractFaq(md: string): { question: string; answer: string }[] {
  const m = md.match(/\n##\s*FAQ\s*\n([\s\S]*?)(?:\n---|\n##\s|$)/i);
  if (!m) return [];
  const out: { question: string; answer: string }[] = [];
  const re = /\*\*([^*]+?)\*\*\s*\n([^\n]+(?:\n(?!\*\*|\n)[^\n]+)*)/g;
  let q: RegExpExecArray | null;
  while ((q = re.exec(m[1]))) {
    out.push({ question: q[1].trim(), answer: q[2].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim() });
  }
  return out;
}

function load(file: string): Post {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const body = stripLeadingH1(content);
  return {
    slug: data.slug ?? file.replace(/\.mdx?$/, ""),
    title: data.title,
    description: data.description,
    keywords: data.keywords ?? [],
    date: typeof data.date === "string" ? data.date : new Date(data.date).toISOString().slice(0, 10),
    status: data.status ?? "draft",
    cta: data.cta ?? "https://wonderade.us/claim",
    html: marked.parse(body, { gfm: true }) as string,
    faq: extractFaq(body),
    wordCount: body.split(/\s+/).filter(Boolean).length,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(load)
    .filter((p) => p.status === "published" || showDrafts())
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
