// lib/notion.ts
import { Client } from '@notionhq/client';

export const notion = new Client({ auth: process.env.NOTION_SECRET });
export const NOTION_DB = process.env.NOTION_DATABASE_ID as string;

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string | null;
  date?: string | null;
  tags: string[];
  notionUrl: string;
};

function rtToPlain(rt: any[]): string {
  return (rt || []).map((r: any) => r?.plain_text ?? '').join('');
}

function firstFileUrl(files: any[]): string | null {
  if (!files || !files.length) return null;
  const f = files[0];
  if (f.type === 'external') return f.external?.url ?? null;
  if (f.type === 'file') return f.file?.url ?? null;
  return null;
}

export function mapPageToPost(page: any): Post {
  const p = page.properties;
  return {
    id: page.id,
    slug: rtToPlain(p?.Slug?.rich_text ?? []),
    title: rtToPlain(p?.Title?.title ?? []),
    excerpt: rtToPlain(p?.Excerpt?.rich_text ?? []),
    coverImage: firstFileUrl(p?.Cover?.files ?? []),
    date: p?.Date?.date?.start ?? null,
    tags: (p?.Tags?.multi_select ?? []).map((t: any) => t.name),
    notionUrl: page.url,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const resp = await notion.databases.query({
    database_id: NOTION_DB,
    filter: { and: [{ property: 'Published', checkbox: { equals: true } }] },
    sorts: [{ property: 'Date', direction: 'descending' }],
    page_size: 100,
  });
  return (resp.results as any[]).map(mapPageToPost).filter(p => p.slug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const resp = await notion.databases.query({
    database_id: NOTION_DB,
    filter: {
      and: [
        { property: 'Slug', rich_text: { equals: slug } },
        { property: 'Published', checkbox: { equals: true } },
      ],
    },
    page_size: 1,
  });
  const page = resp.results?.[0];
  return page ? mapPageToPost(page) : null;
}

export async function getBlocks(pageId: string) {
  const blocks: any[] = [];
  let cursor: string | undefined;
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
