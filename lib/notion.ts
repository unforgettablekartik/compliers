export interface Post {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
}

export async function getPosts(): Promise<Post[]> {
  const { NOTION_SECRET, NOTION_DATABASE_ID } = process.env;
  if (!NOTION_SECRET || !NOTION_DATABASE_ID) {
    console.error('NOTION_SECRET and NOTION_DATABASE_ID must be set');
    return [];
  }

  const res = await fetch(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_SECRET}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({}),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error('Failed to query Notion database', res.status, text);
    throw new Error(`Notion query failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.results.map((page: any) => ({
    id: page.id,
    title: page.properties?.Name?.title?.[0]?.plain_text ?? 'Untitled',
    url: page.url,
    publishedAt: page.created_time,
  }));
}
