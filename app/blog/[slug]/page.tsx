// app/blog/[slug]/page.tsx
import { getAllPublishedPosts, getPostBySlug, isNotionConfigured } from "@/lib/notion";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  if (!isNotionConfigured) {
    return (
      <main>
        <h1>Blog</h1>
        <p>Blog posts are unavailable. Check Notion configuration.</p>
      </main>
    );
  }

  const post = await getPostBySlug(params.slug);
  if (!post || !post.published || post.status !== "Published") return notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      {post.publishDate ? <p>Published on {post.publishDate}</p> : null}
      {post.excerpt ? (
        <p>
          <em>{post.excerpt}</em>
        </p>
      ) : null}
      {post.text ? <div>{post.text}</div> : null}
    </article>
  );
}
