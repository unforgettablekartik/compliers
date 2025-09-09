// app/blog/page.tsx
import { getAllPublishedPosts } from "@/lib/notion";

export const revalidate = 3600; // ISR every hour

export default async function BlogIndex() {
  const posts = await getAllPublishedPosts();
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
}
