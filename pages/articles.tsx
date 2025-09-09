import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { getPosts, type BlogPost } from '../lib/notion';

type ArticlesProps = {
  posts: BlogPost[];
};

export default function Articles({ posts }: ArticlesProps) {
  return (
    <>
      <Head>
        <title>Learning Center | The Compliers</title>
        <meta
          name="description"
          content="Explore resources across key topics to stay informed and compliant."
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-GmSWFp6J6IWgpr9RwQbZHhSBWfHnVeymm7oWf22C6T6QS0+hZqmYAjwoM+I3/Z+9k7EIDs4FAOMeG2E6O7G4Pg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      {/* Site Navigation */}
      <nav id="navbar">
        <div className="container">
          <div className="logo"><a href="/">The Compliers</a></div>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/#services">Our Expertise</a></li>
            <li><a href="/articles">Blogs</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <main className="articles-page">
        <div className="container">
          <h1>Learning Center</h1>
          <p className="articles-intro">
            Explore resources across key topics to stay informed and compliant.
          </p>
            <div className="articles-grid">
              {posts.map((post) => (
                <div className="article-card" key={post.id}>
                  <h2>{post.title}</h2>
                  {post.excerpt && <p>{post.excerpt}</p>}
                  <a href={`/blog/${post.slug}`}>Read more</a>
                </div>
              ))}
            </div>
        </div>
      </main>

      {/* Footer */}
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

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  const posts = await getPosts();
  return {
    props: { posts },
    revalidate: 60,
  };
};
