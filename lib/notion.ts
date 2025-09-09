export interface NotionPost {
  id: string;
  title: string;
  slug: string;
  date?: string;
}

const NOTION_SECRET = process.env.NOTION_SECRET;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

const headers: Record<string, string> = {
  Authorization: `Bearer ${NOTION_SECRET}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
};

export async function getPosts(): Promise<NotionPost[]> {
  if (!NOTION_SECRET || !NOTION_DATABASE_ID) return [];

  const res = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
    method: 'POST',
    headers,
  });

  if (!res.ok) return [];
  const data = await res.json();
  return (data.results || []).map((page: any) => ({
    id: page.id,
    title: page.properties?.Name?.title?.[0]?.plain_text || 'Untitled',
    slug: page.properties?.Slug?.rich_text?.[0]?.plain_text || page.id,
    date: page.properties?.Date?.date?.start,
  }));
}

export async function getPostBySlug(slug: string): Promise<{ page: any; blocks: any[] } | null> {
  if (!NOTION_SECRET || !NOTION_DATABASE_ID) return null;

  const res = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      filter: {
        property: 'Slug',
        rich_text: { equals: slug },
      },
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const page = data.results?.[0];
  if (!page) return null;

  const blocksRes = await fetch(`https://api.notion.com/v1/blocks/${page.id}/children?page_size=100`, {
    headers,
  });
  if (!blocksRes.ok) return null;
  const blocksData = await blocksRes.json();
  return { page, blocks: blocksData.results || [] };
}
