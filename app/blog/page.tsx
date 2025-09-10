// app/blog/page.tsx
import { getAllPublishedPosts } from "@/lib/notion";

export const revalidate = 3600; // ISR every hour

export default async function BlogIndex() {
  try {
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
      throw new Error("Missing Notion environment variables");
    }

    const posts = await getAllPublishedPosts();

    if (!posts.length) {
      throw new Error("No posts returned from Notion");
    }

    return (
      <main>
        <h1>Blog</h1>
        <ul>
          {posts.map(p => (
            <li key={p.id}>
              <a href={`/blog/${p.slug}`}>
                <h2>{p.title}</h2>
                <p>{p.excerpt}</p>
                <small>{p.publishDate}</small>
              </a>
            </li>
          ))}
        </ul>
      </main>
    );
  } catch (err) {
    console.error("Failed to load blog posts", err);
    return (
      <main>
        <h1>Blog</h1>
        <p>Blog posts are unavailable. Check Notion configuration.</p>
      </main>
    );
  }
}
