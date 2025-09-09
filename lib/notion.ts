 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/lib/notion.ts b/lib/notion.ts
index c92c9bb2a2f64cef9d3c62820e4c20160ce27c22..5f4c18fcd75e95456efb5a703a8554e545380455 100644
--- a/lib/notion.ts
+++ b/lib/notion.ts
@@ -1,28 +1,29 @@
 // lib/notion.ts
 import { Client } from "@notionhq/client";
 
+// NOTION_TOKEN and NOTION_DATABASE_ID should be set in the environment
 export const notion = new Client({ auth: process.env.NOTION_TOKEN });
 export const databaseId = process.env.NOTION_DATABASE_ID!;
 
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
 
 export function mapPage(p: any): BlogPost {
   const props = p.properties;
   return {
     id: p.id,
     title: props.Title?.title ? getPlainText(props.Title.title) : "",
 
EOF
)
