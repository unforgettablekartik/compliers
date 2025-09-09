// lib/notion.ts
// Notion CMS helpers for Blog (Pages or App Router compatible)

import { Client } from "@notionhq/client";

// ── Environment variables (configure in Vercel → Project → Settings → Environment Variables)
const NOTION_TOKEN = process.env.NOTION_TOKEN;
export const NOTION_DB = process.env.NOTION_DATABASE_ID as string;

// Fail fast (helps during local dev / misconfig)
if (!NOTION_TOKEN) {
  // Don't throw at import time in serverless edge; prefer a clear console error.
  console.warn(
    "[notion] Missing NOTION_TOKEN. Set it in your environment (Vercel/Local)."
  );
}
if (!NOTION_DB) {
  console.warn(
    "[notion] Missing NOTION_DATABASE_ID. Set it in your environment (Vercel/Local)."
  );
}

export const notion = new Client({ auth: NOTION_TOKEN });

// ── Types
export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string | null;
  date?: string | null;
  category?: string | null;     // Notion "Category" (Select)
  tags: string[];               // Notion "Tags" (Multi-select)
  notionUrl: string;
};

// ── Helpers
function rtToPlain(rt: any[] | undefined): string {
  return (rt ?? []).map((r: any) => r?.plain_text ?? "").join("");
}
function firstFileUrl(files: any[] | undefined): string | null {
  if (!files || files.length === 0) return null;
  const f = files[0];
  if (f?.type === "external") return f.external?.url ?? null;
  if (f?.type === "file") return f.file?.url ?? null;
  return null;
}
function cleanSlug(input: string): string {
  return (input || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-");
}

// ── Page → Post mapping
export function mapPageToPost(page: any): Post {
  const p = page.properties ?? {};

  const title = rtToPlain(p?.Title?.title);
  const rawSlug = rtToPlain(p?.Slug?.rich_text);
  const slug = cleanSlug(rawSlug);

  const post: Post = {
    id: page.id,
    slug,
    title,
    excerpt: rtToPlain(p?.Excerpt?.rich_text) || undefined,
    coverImage: firstFileUrl(p?.Cover?.files),
    date: p?.Date?.date?.start ?? null,
    category: p?.Category?.select?.name ?? null,  // expects a Select property named "Category"
    tags: (p?.Tags?.multi_select ?? []).map((t: any) => t?.name).filter(Boolean),
    notionUrl: page.url,
  };

  return post;
}

// ── Queries

/**
 * List posts with optional filters.
 * Requires Notion DB to have:
 *  - Published (Checkbox)
 *  - Date (Date)
 *  - Category (Select) [optional but recommended]
 *  - Tags (Multi-select) [optional but recommended]
 */
export async function getAllPosts(params?: {
  category?: string;
  tag?: string;
  limit?: number;
}): Promise<Post[]> {
  const filters: any[] = [{ property: "Published", checkbox: { equals: true } }];

  if (params?.category) {
    filters.push({ property: "Category", select: { equals: params.category } });
  }
  if (params?.tag) {
    // matches if the tag exists in the multi-select
    filters.push({ property: "Tags", multi_select: { contains: params.tag } });
  }

  const resp = await notion.databases.query({
    database_id: NOTION_DB,
    filter: { and: filters },
    sorts: [{ property: "Date", direction: "descending" }],
    page_size: params?.limit ?? 100,
  });

  return (resp.results as any[])
    .map(mapPageToPost)
    .filter((p) => p.slug && p.title);
}

/**
 * Fetch a single post by its slug.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const target = cleanSlug(slug);
  const resp = await notion.databases.query({
    database_id: NOTION_DB,
    filter: {
      and: [
        { property: "Slug", rich_text: { equals: target } },
        { property: "Published", checkbox: { equals: true } },
      ],
    },
    page_size: 1,
  });

  const page = resp.results?.[0];
  return page ? mapPageToPost(page) : null;
}

/**
 * Fetch Notion blocks (content) for a page.
 */
export async function getBlocks(pageId: string) {
  const blocks: any[] = [];
  let cursor: string | undefined = undefined;

  do {
    const resp: any = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
    });
    blocks.push(...(resp.results || []));
    cursor = resp.has_more ? resp.next_cursor : undefined;
  } while (cursor);

  return blocks;
}

/**
 * Collect distinct Categories and Tags from (published) posts.
 * Use this for sidebars / filters.
 */
export async function getAllCategoriesAndTags() {
  const posts = await getAllPosts({ limit: 200 }); // bump if needed
  const categories = new Set<string>();
  const tags = new Set<string>();

  for (const p of posts) {
    if (p.category) categories.add(p.category);
    (p.tags || []).forEach((t) => tags.add(t));
  }

  return {
    categories: Array.from(categories).sort((a, b) => a.localeCompare(b)),
    tags: Array.from(tags).sort((a, b) => a.localeCompare(b)),
  };
}
