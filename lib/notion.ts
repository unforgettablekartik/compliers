// lib/notion.ts
import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notionSecret = process.env.NOTION_SECRET;
if (!notionSecret) {
  throw new Error("Environment variable NOTION_SECRET is required");
}

const databaseId = process.env.NOTION_DATABASE_ID;
if (!databaseId) {
  throw new Error("Environment variable NOTION_DATABASE_ID is required");
}

export const notion = new Client({ auth: notionSecret });
export { databaseId };

export type BlogPost = {
  id: string;
  title: string;
  url: string;
  slug: string;
  excerpt?: string;
  text?: string;
  published: boolean;
  status?: string;
  publishedAt?: string; // ISO date
  tags: string[];
  categories: string[];
};

function getPlainText(rich: any[]): string {
  return (rich || []).map((r: any) => r?.plain_text ?? "").join("");
}

export function mapPage(p: PageObjectResponse): BlogPost {
  const props: any = p.properties;
  return {
    id: p.id,
    title: props.Title?.title ? getPlainText(props.Title.title) : "",
    url: p.url,
    slug: props.Slug?.rich_text ? getPlainText(props.Slug.rich_text) : "",
    excerpt: props.Excerpt?.rich_text ? getPlainText(props.Excerpt.rich_text) : "",
    text: props.Text?.rich_text ? getPlainText(props.Text.rich_text) : "",
    published: props.Published?.checkbox ?? false,
    status: props.Status?.status?.name,
    publishedAt: props["Publish Date"]?.date?.start ?? undefined,
    tags: (props.Tags?.multi_select || []).map((o: any) => o.name),
    categories: (props.Categories?.multi_select || []).map((o: any) => o.name),
  };
}

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
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
    return (res.results as PageObjectResponse[]).map(mapPage);
  } catch (error) {
    console.error("Error fetching published posts from Notion", {
      databaseId,
      error,
    });
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
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
    return mapPage(res.results[0] as PageObjectResponse);
  } catch (error) {
    console.error("Error fetching post by slug from Notion", {
      databaseId,
      slug,
      error,
    });
    throw error;
  }
}
