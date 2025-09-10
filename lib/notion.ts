// lib/notion.ts
const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

function headers() {
  return {
    Authorization: `Bearer ${process.env.NOTION_TOKEN ?? ""}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  } as Record<string, string>;
}

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  text?: string;
  content?: string;
  published: boolean;
  status?: string;
  publishDate?: string;
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

async function notionFetch(endpoint: string, init: RequestInit): Promise<any> {
  if (!process.env.NOTION_TOKEN) {
    return { results: [] };
  }
  const res = await fetch(`${NOTION_API_BASE}/${endpoint}`, {
    ...init,
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error(`Notion API error: ${res.status}`);
  }
  return res.json();
}

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!databaseId) return [];
    const res = await notionFetch(`databases/${databaseId}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: {
          and: [
            { property: "Published", checkbox: { equals: true } },
            { property: "Status", status: { equals: "Published" } },
          ],
        },
        sorts: [{ property: "Publish Date", direction: "descending" }],
      }),
    });
    return res.results.map(mapPage);
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!databaseId) return null;
    const res = await notionFetch(`databases/${databaseId}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: { property: "Slug", rich_text: { equals: slug } },
        page_size: 1,
      }),
    });
    if (!res.results.length) return null;
    const page = res.results[0];

    let blocks: any[] = [];
    let cursor: string | undefined;
    do {
      const blockRes = await notionFetch(
        `blocks/${page.id}/children${cursor ? `?start_cursor=${cursor}` : ""}`,
        { method: "GET" }
      );
      blocks = blocks.concat(blockRes.results);
      cursor = blockRes.has_more ? blockRes.next_cursor : undefined;
    } while (cursor);

    const content = blocksToHtml(blocks);
    return { ...mapPage(page), content };
  } catch (e) {
    console.error(e);
    return null;
  }
}

function blocksToHtml(blocks: any[]): string {
  return blocks
    .map((block: any) => {
      const text = getPlainText(block[block.type]?.rich_text || []);
      switch (block.type) {
        case "paragraph":
          return `<p>${text}</p>`;
        case "heading_1":
          return `<h1>${text}</h1>`;
        case "heading_2":
          return `<h2>${text}</h2>`;
        case "heading_3":
          return `<h3>${text}</h3>`;
        default:
          return text ? `<div>${text}</div>` : "";
      }
    })
    .join("\n");
}

export { mapPage };
