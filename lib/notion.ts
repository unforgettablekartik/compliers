// lib/notion.ts

const notionToken = process.env.NOTION_SECRET || process.env.NOTION_TOKEN;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

export const isNotionConfigured = Boolean(notionToken && notionDatabaseId);

const NOTION_API_URL = "https://api.notion.com/v1";

async function notionFetch<T>(endpoint: string, body: any): Promise<T> {
  if (!isNotionConfigured) {
    throw new Error("Notion environment variables are not configured");
  }
  const res = await fetch(`${NOTION_API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notionToken}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Notion API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

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
};

function getPlainText(rich: any[]): string {
  return (rich || []).map((r: any) => r?.plain_text ?? "").join("");
}

function mapPage(p: any): BlogPost {
  const props = p.properties;
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
  };
}

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  if (!isNotionConfigured) {
    console.warn("Notion environment variables are missing");
    return [];
  }
  try {
    const data = await notionFetch<{ results: any[] }>(`/databases/${notionDatabaseId}/query`, {
      filter: {
        and: [
          { property: "Published", checkbox: { equals: true } },
          { property: "Status", status: { equals: "Published" } },
        ],
      },
      sorts: [{ property: "Publish Date", direction: "descending" }],
    });
    return data.results.map(mapPage);
  } catch (err) {
    console.error("Failed to fetch posts from Notion", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isNotionConfigured) {
    console.warn("Notion environment variables are missing");
    return null;
  }
  try {
    const data = await notionFetch<{ results: any[] }>(`/databases/${notionDatabaseId}/query`, {
      filter: {
        property: "Slug",
        rich_text: { equals: slug },
      },
      page_size: 1,
    });
    if (!data.results.length) return null;
    return mapPage(data.results[0]);
  } catch (err) {
    console.error("Failed to fetch post from Notion", err);
    return null;
  }
}
