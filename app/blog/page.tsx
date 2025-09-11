// app/blog/page.tsx
import Link from "next/link";
import { getAllPublishedPosts } from "@/lib/notion";
import BlogList from "./BlogList";
import Footer from "@/components/Footer";
import styles from "./blog.module.css";

export const revalidate = 3600; // ISR every hour

export default async function BlogIndex() {
  const posts = await getAllPublishedPosts();
  return (
    <>
      <nav id="navbar">
        <div className="container">
          <div className="logo">
            <Link href="/">The Compliers</Link>
          </div>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#services">Our Expertise</Link></li>
            <li><Link href="/blog">Blogs</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
        </div>
      </nav>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Blogs</h1>
      </header>
      <main>
        <BlogList posts={posts} />
      </main>
      <Footer />
    </>
  );
}
