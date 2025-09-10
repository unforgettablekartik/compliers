// lib/notion.ts
import { Client } from "@notionhq/client";

export const notion = new Client({ auth: process.env.NOTION_TOKEN });
export const databaseId = process.env.NOTION_DATABASE_ID!;

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  text?: string;
  content?: string;
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
    text: props.Text?.rich_text ? getPlainText(props.Text.rich_text) : "",
    published: props.Published?.checkbox ?? false,
    status: props.Status?.status?.name,
    publishDate: props["Publish Date"]?.date?.start ?? undefined,
    tags: (props.Tags?.multi_select || []).map((o: any) => o.name),
    categories: (props.Categories?.multi_select || []).map((o: any) => o.name),
  };
}

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
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
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Slug",
      rich_text: { equals: slug }
    },
    page_size: 1
  });
  if (!res.results.length) return null;
  const page = res.results[0];

  // Retrieve block children to build full page content
  let blocks: any[] = [];
  let cursor: string | undefined = undefined;
  do {
    const blockRes: any = await notion.blocks.children.list({
      block_id: page.id,
      start_cursor: cursor,
    });
    blocks = blocks.concat(blockRes.results);
    cursor = blockRes.has_more ? blockRes.next_cursor : undefined;
  } while (cursor);

  const content = blocksToHtml(blocks);

  return { ...mapPage(page), content };
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
