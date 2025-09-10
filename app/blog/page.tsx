// app/blog/page.tsx
import { getAllPublishedPosts, isNotionConfigured } from "@/lib/notion";

export const revalidate = 3600; // ISR every hour

export default async function BlogIndex() {
  if (!isNotionConfigured) {
    return (
      <main>
        <h1>Blog</h1>
        <p>Blog posts are unavailable. Check Notion configuration.</p>
      </main>
    );
  }

  const posts = await getAllPublishedPosts();
  if (!posts.length) {
    return (
      <main>
        <h1>Blog</h1>
        <p>No posts found.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map((p) => (
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
}
