// app/blog/page.tsx
import { getAllPublishedPosts } from "@/lib/notion";
import BlogList from './BlogList';

export const revalidate = 3600; // ISR every hour

export default async function BlogIndex() {
  const posts = await getAllPublishedPosts();
  return (
    <section className="blogPage">
      <div className="container">
        <h1 className="blogPageTitle">Blog</h1>
        <BlogList posts={posts} />
      </div>
    </section>
  );
}
