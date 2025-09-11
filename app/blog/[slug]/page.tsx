// app/blog/[slug]/page.tsx
import { getAllPublishedPosts, getPostBySlug } from "@/lib/notion";
import { notFound } from "next/navigation";
import NotionRenderer from "@/components/NotionRenderer";
import styles from "../blog.module.css";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPublishedPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post || !post.published || post.status !== "Published") return notFound();

  return (
    <div className={styles.container}>
      <article className={styles.content}>
        <h1>{post.title}</h1>
        {post.publishDate ? <p className={styles.meta}>Published on {post.publishDate}</p> : null}
        {post.excerpt ? <p className={styles.excerpt}><em>{post.excerpt}</em></p> : null}
        {post.content && <NotionRenderer blocks={post.content} />}
        {/* Render tags/categories as needed */}
      </article>
    </div>
  );
}
