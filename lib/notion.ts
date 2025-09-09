const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_SECRET = process.env.NOTION_SECRET;
const NOTION_VERSION = '2022-06-28';

export async function getPosts() {
  const res = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_SECRET}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION
    },
    body: JSON.stringify({})
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error(`Notion getPosts failed with status ${res.status}` + (text ? `: ${text}` : ''));
    return [];
  }

  return res.json();
}

export async function getPostBySlug(slug: string) {
  const res = await fetch(`https://api.notion.com/v1/pages/${slug}`, {
    headers: {
      'Authorization': `Bearer ${NOTION_SECRET}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION
    }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error(`Notion getPostBySlug failed with status ${res.status}` + (text ? `: ${text}` : ''));
    return [];
  }

  return res.json();
}
