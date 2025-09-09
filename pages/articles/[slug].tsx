import { getPublishedPosts, getPostBySlug } from '../../lib/notion';
import { NotionRenderer } from 'react-notion-x';

export async function getStaticPaths() {
  const posts = await getPublishedPosts(process.env.NOTION_DATABASE_ID as string);
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const posts = await getPublishedPosts(process.env.NOTION_DATABASE_ID as string);
  const page = posts.find((post) => post.slug === params.slug);
  const notionPage = page ? await getPostBySlug(page.id) : null;
  return { props: { notionPage }, revalidate: 60 };
}

export default function Article({ notionPage }: { notionPage: any }) {
  return (
    <main className="legal-page">
      <div className="container">
        <NotionRenderer recordMap={notionPage} fullPage={false} />
      </div>
    </main>
  );
}
