import Head from 'next/head';
import Link from 'next/link';
import { getPosts, NotionPost } from '../../lib/notion';

interface Props {
  posts: NotionPost[];
}

export default function BlogIndex({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Blog | The Compliers</title>
        <meta name="description" content="Latest insights from The Compliers." />
      </Head>

      <nav id="navbar">
        <div className="container">
          <div className="logo"><a href="/">The Compliers</a></div>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/#services">Our Expertise</a></li>
            <li><a href="/blog">Blogs</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main className="articles-page">
        <div className="container">
          <h1>Blog</h1>
          {posts.length === 0 && <p>No posts found.</p>}
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer>
        <div className="container footer-content">
          <ul className="footer-nav">
            <li><a href="/">Home</a></li>
            <li><a href="/#services">Our Expertise</a></li>
            <li><a href="/#contact">Contact</a></li>
            <li><a href="/terms">Terms of Use</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export async function getServerSideProps() {
  const posts = await getPosts();
  return { props: { posts } };
}
