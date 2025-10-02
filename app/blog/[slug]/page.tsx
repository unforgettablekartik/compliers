// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllPublishedPosts,
  getPostBySlug,
  getBlocks, // ensure this exists in lib/notion.ts
} from "@/lib/notion";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPublishedPosts();
  return posts
    .filter((p: any) => p.slug)
    .map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post || !post.published || post.status !== "Published") return {};
  return {
    title: `${post.title} — The Compliers Blog`,
    description: post.excerpt || undefined,
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
  };
}

/* ---------- Rich Text ---------- */
function RichText({ text }: { text: any[] }) {
  return (
    <>
      {text?.map((t: any, i: number) => {
        let node: any = t?.plain_text ?? "";
        const a = t?.annotations ?? {};
        if (a.code) node = <code className="rounded bg-neutral-100 px-1 py-0.5">{node}</code>;
        if (a.bold) node = <strong>{node}</strong>;
        if (a.italic) node = <em>{node}</em>;
        if (a.underline) node = <u>{node}</u>;
        if (a.strikethrough) node = <s>{node}</s>;
        if (t.href) {
          node = (
            <a className="underline" href={t.href} target="_blank" rel="noreferrer">
              {node}
            </a>
          );
        }
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

/* ---------- Block Renderer (common Notion blocks) ---------- */
function Block({ block }: { block: any }) {
  const type = block.type;
  const b = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p className="my-4 text-[1.05rem] leading-7">
          <RichText text={b.rich_text} />
        </p>
      );

    case "heading_1":
      return (
        <h1 className="mt-8 mb-3 text-3xl font-semibold">
          <RichText text={b.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="mt-8 mb-3 text-2xl font-semibold">
          <RichText text={b.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="mt-6 mb-2 text-xl font-semibold">
          <RichText text={b.rich_text} />
        </h3>
      );

    case "bulleted_list_item":
      return (
        <li className="list-disc ml-6 my-1">
          <RichText text={b.rich_text} />
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="list-decimal ml-6 my-1">
          <RichText text={b.rich_text} />
        </li>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 pl-4 italic my-4 text-neutral-700">
          <RichText text={b.rich_text} />
        </blockquote>
      );

    case "code":
      return (
        <pre className="my-4 overflow-x-auto rounded-xl border bg-neutral-50 p-4 text-sm">
          <code>{b.rich_text?.map((t: any) => t.plain_text).join("")}</code>
        </pre>
      );

    case "image": {
      const src = b?.type === "external" ? b.external?.url : b.file?.url;
      const cap = b?.caption?.[0]?.plain_text;
      return (
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={cap || "image"} className="rounded-xl border" />
          {cap && <figcaption className="text-sm text-neutral-500 mt-2">{cap}</figcaption>}
        </figure>
      );
    }

    case "callout": {
      return (
        <div className="my-4 rounded-xl border bg-neutral-50 p-4">
          <RichText text={b?.rich_text || []} />
        </div>
      );
    }

    case "divider":
      return <hr className="my-8 border-neutral-200" />;

    case "to_do":
      return (
        <label className="my-1 ml-1 flex items-center gap-2">
          <input type="checkbox" disabled checked={b?.checked} />
          <span>
            <RichText text={b?.rich_text || []} />
          </span>
        </label>
      );

    case "bookmark":
      return (
        <p className="my-3">
          <a className="underline" href={b?.url} target="_blank" rel="noreferrer">
            {b?.url}
          </a>
        </p>
      );

    default:
      // Unsupported blocks are skipped; add cases as needed
      return null;
  }
}

/* ---------- Group lists into UL/OL wrappers for valid HTML ---------- */
function renderBlocksGrouped(blocks: any[]) {
  const out: any[] = [];
  let buf: any[] = [];
  let current: "ul" | "ol" | null = null;

  const flush = () => {
    if (!buf.length) return;
    if (current === "ul")
      out.push(
        <ul className="my-3" key={`ul-${out.length}`}>
          {buf.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </ul>
      );
    if (current === "ol")
      out.push(
        <ol className="my-3" key={`ol-${out.length}`}>
          {buf.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </ol>
      );
    buf = [];
    current = null;
  };

  for (const blk of blocks) {
    if (blk.type === "bulleted_list_item") {
      if (current && current !== "ul") flush();
      current = "ul";
      buf.push(blk);
      continue;
    }
    if (blk.type === "numbered_list_item") {
      if (current && current !== "ol") flush();
      current = "ol";
      buf.push(blk);
      continue;
    }
    if (current) flush();
    out.push(<Block key={`b-${out.length}`} block={blk} />);
  }
  if (current) flush();
  return out;
}

/* ---------- Page ---------- */
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  // Safety checks to mirror your existing logic
  if (!post || !post.published || post.status !== "Published") return notFound();

  // Fetch the content blocks from Notion by page ID
  const blocks = await getBlocks(post.id);
  const categories = (post.categories ?? []).filter(Boolean);

  return (
    <div className="blogPostShell">
      <article className="prose prose-neutral max-w-none">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">{post.title}</h1>

          <div className="text-sm text-neutral-500 mt-2 flex flex-wrap items-center gap-2">
            {post.publishDate && (
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString()}
              </time>
            )}
            {categories.length ? (
              <>
                <span>•</span>
                <span className="flex flex-wrap gap-1">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/blog/category/${encodeURIComponent(category)}`}
                      className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs hover:bg-neutral-50"
                    >
                      {category}
                    </Link>
                  ))}
                </span>
              </>
            ) : null}
            {post.tags?.length ? (
              <>
                <span>•</span>
                <span className="flex flex-wrap gap-1">
                  {post.tags.map((t: string) => (
                    <Link
                      key={t}
                      href={`/blog/tag/${encodeURIComponent(t)}`}
                      className="inline-flex items-center rounded-full border bg-neutral-50 px-2 py-0.5 text-xs hover:bg-neutral-100"
                    >
                      #{t}
                    </Link>
                  ))}
                </span>
              </>
            ) : null}
          </div>

          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverImage} alt="cover" className="mt-6 rounded-2xl border" />
          )}

          {post.excerpt ? (
            <p className="mt-4 italic text-neutral-700">{post.excerpt}</p>
          ) : null}
        </header>

        <section>{renderBlocksGrouped(blocks)}</section>
      </article>
    </div>
  );
}
