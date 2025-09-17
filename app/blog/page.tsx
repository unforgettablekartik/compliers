// app/blog/page.tsx
import { getAllPublishedPosts } from "@/lib/notion";
import BlogList from './BlogList';
import styles from './blog.module.css';

export const revalidate = 3600; // ISR every hour

export default async function BlogIndex() {
  const posts = await getAllPublishedPosts();
  return (
    <>
      <nav id="navbar">
        <div className="container">
          <div className="logo">
            <a href="/">The Compliers</a>
          </div>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/#services">Our Expertise</a></li>
            <li><a href="/blog">Blogs</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
      <main className={styles.pageMain}>
        <BlogList posts={posts} />
      </main>
    </>
  );
}
