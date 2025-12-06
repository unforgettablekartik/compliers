// app/blog/page.tsx
import { getAllPublishedPosts } from "@/lib/notion";
import BlogList from './BlogList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Insights & Resources | The Compliers Blog',
  description: 'Expert insights on contracts, trademarks, compliance, and legal matters for businesses, creators, and agencies. Stay informed with practical legal guidance.',
};

export const revalidate = 3600; // ISR every hour

export default async function BlogIndex() {
  const posts = await getAllPublishedPosts();
  return (
    <section className="blogPage">
      <div className="container">
  <h1 className="blogPageTitle">Our Blogs</h1>
        <BlogList posts={posts} />
      </div>
    </section>
  );
}
