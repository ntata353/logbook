import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface Post {
  slug: string;
  date: string;        // ISO string: "2025-03-07"
  formattedDate: string; // "March 7, 2025"
  tags: string[];
  contentHtml: string;
}

const postsDirectory = path.join(process.cwd(), "posts");

function toIsoDate(raw: unknown): string {
  if (raw instanceof Date) {
    return raw.toISOString().split("T")[0];
  }
  if (typeof raw === "string") return raw.trim();
  return "";
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md"));

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      const processed = await remark().use(html).process(content);

      const date = toIsoDate(data.date);

      return {
        slug,
        date,
        formattedDate: formatDate(date),
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        contentHtml: processed.toString(),
      };
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllTags(posts: Post[]): string[] {
  const seen = new Set<string>();
  posts.forEach((post) => post.tags.forEach((t) => seen.add(t)));
  return Array.from(seen).sort();
}
