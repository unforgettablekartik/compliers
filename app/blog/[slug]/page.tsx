// app/blog/[slug]/page.tsx
import { getAllPublishedPosts, getPostBySlug } from "@/lib/notion";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
      throw new Error("Missing Notion environment variables");
    }
    const posts = await getAllPublishedPosts();
    return posts.map(p => ({ slug: p.slug }));
  } catch (err) {
    console.error("Failed to generate static params for blog posts", err);
    return [];
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
      throw new Error("Missing Notion environment variables");
    }

    const post = await getPostBySlug(params.slug);

    if (!post || !post.published || post.status !== "Published") {
      throw new Error("Post not found or unpublished");
    }

    return (
      <article>
        <h1>{post.title}</h1>
        {post.publishDate ? <p>Published on {post.publishDate}</p> : null}
        {post.excerpt ? (
          <p>
            <em>{post.excerpt}</em>
          </p>
        ) : null}
        {/* If you plan to store full content in "Text" as markdown or HTML, render it here */}
        {post.text ? <div>{post.text}</div> : null}
        {/* Render tags/categories as needed */}
      </article>
    );
  } catch (err) {
    console.error("Failed to load blog post", err);
    return (
      <article>
        <p>Blog posts are unavailable. Check Notion configuration.</p>
      </article>
    );
  }
}
