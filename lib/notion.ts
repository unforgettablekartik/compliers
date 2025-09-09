import { Client } from '@notionhq/client';

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID as string;
const NOTION_SECRET = process.env.NOTION_SECRET;

const notion = new Client({ auth: NOTION_SECRET });

export async function getPosts() {
  try {
    return await notion.databases.query({ database_id: NOTION_DATABASE_ID });
  } catch (error) {
    console.error('Notion API request failed', error);
    throw error;
  }
}

