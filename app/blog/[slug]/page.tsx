import { notFound } from 'next/navigation';
import { getAllPosts, getBlocks, getPostBySlug } from '@/lib/notion';

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — The Compliers Blog`,
    description: post.excerpt ?? undefined,
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
  };
}

function RichText({ text }: { text: any[] }) {
  return (
    <span>
      {text?.map((t: any, i: number) => {
        let c = <>{t?.plain_text ?? ''}</>;
        const a = t?.annotations ?? {};
        if (a.code) c = <code className="rounded bg-neutral-100 px-1 py-0.5">{c}</code>;
        if (a.bold) c = <strong>{c}</strong>;
        if (a.italic) c = <em>{c}</em>;
        if (a.underline) c = <u>{c}</u>;
        if (a.strikethrough) c = <s>{c}</s>;
        if (t.href) c = <a className="underline" href={t.href} target="_blank" rel="noreferrer">{c}</a>;
        return <span key={i}>{c}</span>;
      })}
    </span>
  );
}

function Block({ block }: { block: any }) {
  const { type } = block;
  const b = block[type];
  switch (type) {
    case 'paragraph':
      return <p className="my-4 text-[1.05rem] leading-7"><RichText text={b.rich_text} /></p>;
    case 'heading_1':
      return <h1 className="mt-8 mb-3 text-3xl font-semibold"><RichText text={b.rich_text} /></h1>;
    case 'heading_2':
      return <h2 className="mt-8 mb-3 text-2xl font-semibold"><RichText text={b.rich_text} /></h2>;
    case 'heading_3':
      return <h3 className="mt-6 mb-2 text-xl font-semibold"><RichText text={b.rich_text} /></h3>;
    case 'bulleted_list_item':
      return <li className="list-disc ml-6 my-1"><RichText text={b.rich_text} /></li>;
    case 'numbered_list_item':
      return <li className="list-decimal ml-6 my-1"><RichText text={b.rich_text} /></li>;
    case 'quote':
      return <blockquote className="border-l-4 pl-4 italic my-4 text-neutral-700"><RichText text={b.rich_text} /></blockquote>;
    case 'code':
      return (
        <pre className="my-4 overflow-x-auto rounded-xl border bg-neutral-50 p-4 text-sm">
          <code>{b.rich_text?.map((t: any) => t.plain_text).join('')}</code>
        </pre>
      );
    case 'image': {
      const src = b?.type === 'external' ? b.external?.url : b.file?.url;
      const cap = b?.caption?.[0]?.plain_text;
      return (
        <figure className="my-6">
          <img src={src} alt={cap || 'image'} className="rounded-xl border" />
          {cap && <figcaption className="text-sm text-neutral-500 mt-2">{cap}</figcaption>}
        </figure>
      );
    }
    default:
      return null;
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();
  const blocks = await getBlocks(post.id);

  // group lists into <ul>/<ol>
  const grouped: any[] = [];
  let buffer: any[] = [];
  let current: 'ul' | 'ol' | null = null;
  const flush = () => {
    if (current === 'ul') grouped.push(<ul className="my-3">{buffer.map((b, i) => <Block key={i} block={b} />)}</ul>);
    else if (current === 'ol') grouped.push(<ol className="my-3">{buffer.map((b, i) => <Block key={i} block={b} />)}</ol>);
    buffer = []; current = null;
  };
  blocks.forEach(blk => {
    if (blk.type === 'bulleted_list_item') { if (current && current !== 'ul') flush(); current = 'ul'; buffer.push(blk); return; }
    if (blk.type === 'numbered_list_item') { if (current && current !== 'ol') flush(); current = 'ol'; buffer.push(blk); return; }
    if (current) flush();
    grouped.push(blk);
  });
  if (current) flush();

  return (
    <article className="prose prose-neutral max-w-none">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">{post.title}</h1>
        <div className="text-sm text-neutral-500 mt-2">
          {post.date && <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>}
          {post.tags?.length ? <span> • {post.tags.join(', ')}</span> : null}
        </div>
        {post.coverImage && <img src={post.coverImage} alt="cover" className="mt-6 rounded-2xl border" />}
      </header>
      <section>
        {grouped.map((b: any, idx: number) =>
          typeof b === 'object' && 'type' in b ? <Block key={idx} block={b} /> : <div key={idx}>{b}</div>
        )}
      </section>
    </article>
  );
}
