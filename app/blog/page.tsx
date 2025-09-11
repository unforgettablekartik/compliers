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
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>The Compliers</Link>
        <h1 className={styles.pageTitle}>Blogs</h1>
      </header>
      <main>
        <BlogList posts={posts} />
      </main>
      <Footer />
    </>
  );
}
