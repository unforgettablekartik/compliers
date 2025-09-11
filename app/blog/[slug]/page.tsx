// app/blog/[slug]/page.tsx
import { getAllPublishedPosts, getPostBySlug } from "@/lib/notion";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPublishedPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post || !post.published || post.status !== "Published") return notFound();

  const renderText = (text: any[]) => text.map(t => t?.plain_text ?? "").join("");
  const renderBlock = (block: any) => {
    const { id, type } = block;
    switch (type) {
      case "heading_1":
        return <h1 key={id}>{renderText(block.heading_1.rich_text)}</h1>;
      case "heading_2":
        return <h2 key={id}>{renderText(block.heading_2.rich_text)}</h2>;
      case "heading_3":
        return <h3 key={id}>{renderText(block.heading_3.rich_text)}</h3>;
      case "paragraph":
        return <p key={id}>{renderText(block.paragraph.rich_text)}</p>;
      default:
        return null;
    }
  };

  return (
    <article>
      <h1>{post.title}</h1>
      {post.publishDate ? <p>Published on {post.publishDate}</p> : null}
      {post.excerpt ? <p><em>{post.excerpt}</em></p> : null}
      {post.blocks?.map(renderBlock)}
      {/* Render tags/categories as needed */}
    </article>
  );
}
