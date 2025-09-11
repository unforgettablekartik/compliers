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
  content?: any[];
  published: boolean;
  status?: string;
  publishDate?: string; // ISO date
  tags: string[];
  categories: string[];
};

function getPlainText(rich: any[]): string {
  return (rich || []).map((r: any) => r?.plain_text ?? "").join("");
}

export function mapPage(p: any): BlogPost {
  const props = p.properties;
  return {
    id: p.id,
    title: props.Title?.title ? getPlainText(props.Title.title) : "",
    slug: props.Slug?.rich_text ? getPlainText(props.Slug.rich_text) : "",
    excerpt: props.Excerpt?.rich_text ? getPlainText(props.Excerpt.rich_text) : "",
    published: props.Published?.checkbox ?? false,
    status: props.Status?.status?.name,
    publishDate: props["Publish Date"]?.date?.start ?? undefined,
    tags: (props.Tags?.multi_select || []).map((o: any) => o.name),
    categories: (props.Categories?.multi_select || []).map((o: any) => o.name),
  };
}

async function getPageContent(pageId: string): Promise<any[]> {
  try {
    const blocks: any[] = [];
    let cursor: string | undefined = undefined;
    do {
      const res: any = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      });
      for (const block of res.results) {
        if (block.has_children) {
          block.children = await getPageContent(block.id);
        }
        blocks.push(block);
      }
      cursor = res.has_more ? res.next_cursor : undefined;
    } while (cursor);
    return blocks;
  } catch (err) {
    console.warn("Failed to fetch page content from Notion", err);
    return [];
  }
}

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  if (!databaseId || !process.env.NOTION_TOKEN) return [];
  try {
    const res = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: { equals: true }
      },
      sorts: [{ property: "Publish Date", direction: "descending" }]
    });
    const posts = res.results.map(mapPage);
    const withContent = await Promise.all(
      posts.map(async p => ({ ...p, content: await getPageContent(p.id) }))
    );
    return withContent.filter(p => !p.status || p.status === "Published");
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
    const base = mapPage(res.results[0]);
    const content = await getPageContent(base.id);
    return { ...base, content };
  } catch (err) {
    console.warn("Failed to fetch post from Notion", err);
    return null;
  }
}
