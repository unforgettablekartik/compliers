import Head from 'next/head';
import { getPostBySlug } from '../../lib/notion';
import type { GetServerSidePropsContext } from 'next';

interface Props {
  title: string;
  blocks: any[];
}

export default function BlogPost({ title, blocks }: Props) {
  return (
    <>
      <Head>
        <title>{title} | The Compliers</title>
        <meta name="description" content={title} />
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
          <h1>{title}</h1>
          {blocks.map((block) => {
            const key = block.id;
            switch (block.type) {
              case 'paragraph':
                return (
                  <p key={key}>
                    {block.paragraph.rich_text.map((t: any) => t.plain_text).join('')}
                  </p>
                );
              case 'heading_1':
                return (
                  <h2 key={key}>
                    {block.heading_1.rich_text.map((t: any) => t.plain_text).join('')}
                  </h2>
                );
              case 'heading_2':
                return (
                  <h3 key={key}>
                    {block.heading_2.rich_text.map((t: any) => t.plain_text).join('')}
                  </h3>
                );
              case 'bulleted_list_item':
                return (
                  <li key={key}>
                    {block.bulleted_list_item.rich_text
                      .map((t: any) => t.plain_text)
                      .join('')}
                  </li>
                );
              default:
                return null;
            }
          })}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.params?.slug as string;
  const data = await getPostBySlug(slug);
  if (!data) {
    return { notFound: true };
  }
  const title =
    data.page.properties?.Name?.title?.[0]?.plain_text || 'Blog Post';
  return { props: { title, blocks: data.blocks } };
}
