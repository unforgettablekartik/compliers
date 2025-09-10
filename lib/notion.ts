// lib/notion.ts
import { Client } from "@notionhq/client";

// NOTION_TOKEN and NOTION_DATABASE_ID should be set in the environment
export const notion = new Client({ auth: process.env.NOTION_TOKEN });
export const databaseId = process.env.NOTION_DATABASE_ID;

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  text?: string;
  published: boolean;
  status?: string;
  publishDate?: string; // ISO date
  tags: string[];
  categories: string[];
  coverImage?: string | null;        // ← NEW
};

function getPlainText(rich: any[]): string {
  return (rich || []).map((r: any) => r?.plain_text ?? "").join("");
}

function firstFileUrl(files: any[] | undefined): string | null {
  if (!files || !files.length) return null;
  const f = files[0];
  if (f.type === "external") return f.external?.url ?? null;
  if (f.type === "file") return f.file?.url ?? null;
  return null;
}

export function mapPage(p: any): BlogPost {
  const props = p.properties || {};
  return {
    id: p.id,
    title: props.Title?.title ? getPlainText(props.Title.title) : "",
    slug: props.Slug?.rich_text ? getPlainText(props.Slug.rich_text) : "",
    excerpt: props.Excerpt?.rich_text ? getPlainText(props.Excerpt.rich_text) : "",
    text: props.Text?.rich_text ? getPlainText(props.Text.rich_text) : "",
    published: props.Published?.checkbox ?? false,
    status: props.Status?.status?.name,
    publishDate: props["Publish Date"]?.date?.start ?? undefined,
    tags: (props.Tags?.multi_select || []).map((o: any) => o.name),
    categories: (props.Categories?.multi_select || []).map((o: any) => o.name),
    coverImage: firstFileUrl(props.Cover?.files),    // ← NEW (expects a Files & media prop named "Cover")
  };
}

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  if (!databaseId || !process.env.NOTION_TOKEN) return [];
  try {
    const res = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          { property: "Published", checkbox: { equals: true } },
          { property: "Status", status: { equals: "Published" } }
        ]
      },
      sorts: [{ property: "Publish Date", direction: "descending" }]
    });
    return res.results.map(mapPage);
  } catch (err) {
    console.warn("Failed to fetch posts from Notion", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!databaseId || !process.env.NOTION_TOKEN) return null;
  try {
    const res = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Slug",
        rich_text: { equals: slug }
      },
      page_size: 1
    });
    if (!res.results.length) return null;
    return mapPage(res.results[0]);
  } catch (err) {
    console.warn("Failed to fetch post from Notion", err);
    return null;
  }
}

/**
 * Fetch all content blocks for a given Notion page (by page/block ID).
 * Paginates through children and returns a flat array of blocks.
 */
export async function getBlocks(pageId: string): Promise<any[]> {
  if (!process.env.NOTION_TOKEN) return [];
  const all: any[] = [];
  let cursor: string | undefined;

  try {
    do {
      const resp: any = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      });
      const items = (resp.results || []).filter((b: any) => !b?.archived);
      all.push(...items);
      cursor = resp.has_more ? resp.next_cursor : undefined;
    } while (cursor);
  } catch (err) {
    console.warn("Failed to fetch blocks from Notion", err);
    return [];
  }

  return all;
}
