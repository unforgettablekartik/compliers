// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllPublishedPosts,
  getPostBySlug,
  getBlocks, // ensure this exists in lib/notion.ts
} from "@/lib/notion";
import styles from "../blog.module.css";

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
        if (a.code)
          node = <code className={styles.inlineCode}>{node}</code>;
        if (a.bold) node = <strong>{node}</strong>;
        if (a.italic) node = <em>{node}</em>;
        if (a.underline) node = <u>{node}</u>;
        if (a.strikethrough) node = <s>{node}</s>;
        if (t.href) {
          node = (
            <a className={styles.inlineLink} href={t.href} target="_blank" rel="noreferrer">
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
      return <p className={styles.postParagraph}><RichText text={b.rich_text} /></p>;

    case "heading_1":
      return <h2 className={styles.postHeadingOne}><RichText text={b.rich_text} /></h2>;
    case "heading_2":
      return <h3 className={styles.postHeadingTwo}><RichText text={b.rich_text} /></h3>;
    case "heading_3":
      return <h4 className={styles.postHeadingThree}><RichText text={b.rich_text} /></h4>;

    case "bulleted_list_item":
      return <li className={styles.postListItem}><RichText text={b.rich_text} /></li>;

    case "numbered_list_item":
      return <li className={styles.postListItem}><RichText text={b.rich_text} /></li>;

    case "quote":
      return (
        <blockquote className={styles.postQuote}>
          <RichText text={b.rich_text} />
        </blockquote>
      );

    case "code":
      return (
        <pre className={styles.postCode}>
          <code>{b.rich_text?.map((t: any) => t.plain_text).join("")}</code>
        </pre>
      );

    case "image": {
      const src = b?.type === "external" ? b.external?.url : b.file?.url;
      const cap = b?.caption?.[0]?.plain_text;
      return (
        <figure className={styles.postFigure}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={cap || "image"} className={styles.postImage} />
          {cap && <figcaption className={styles.postFigcaption}>{cap}</figcaption>}
        </figure>
      );
    }

    case "callout": {
      return (
        <div className={styles.postCallout}>
          <RichText text={b?.rich_text || []} />
        </div>
      );
    }

    case "divider":
      return <hr className={styles.postDivider} />;

    case "to_do":
      return (
        <label className={styles.postTodo}>
          <input type="checkbox" disabled checked={b?.checked} />
          <span><RichText text={b?.rich_text || []} /></span>
        </label>
      );

    case "bookmark":
      return (
        <p className={styles.postBookmark}>
          <a className={styles.inlineLink} href={b?.url} target="_blank" rel="noreferrer">
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
        <ul className={styles.postUnorderedList} key={`ul-${out.length}`}>
          {buf.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </ul>
      );
    if (current === "ol")
      out.push(
        <ol className={styles.postOrderedList} key={`ol-${out.length}`}>
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
      <main className={styles.postPage}>
        <article className={styles.postArticle}>
          <header className={styles.postHeader}>
            <h1 className={styles.postHeading}>{post.title}</h1>

            <div className={styles.postMeta}>
              {post.publishDate && (
                <time dateTime={post.publishDate} className={styles.metaItem}>
                  {new Date(post.publishDate).toLocaleDateString()}
                </time>
              )}
              {post.categories?.length ? (
                <>
                  <span className={styles.metaSeparator}>•</span>
                  <span className={`${styles.metaItem} ${styles.metaChips}`}>
                    {post.categories.map((category: string) => (
                      <Link
                        key={category}
                        href={`/blog/category/${encodeURIComponent(category)}`}
                        className={styles.categoryChip}
                      >
                        {category}
                      </Link>
                    ))}
                  </span>
                </>
              ) : null}
              {post.tags?.length ? (
                <>
                  <span className={styles.metaSeparator}>•</span>
                  <span className={`${styles.metaItem} ${styles.metaChips}`}>
                    {post.tags.map((t: string) => (
                      <Link
                        key={t}
                        href={`/blog/tag/${encodeURIComponent(t)}`}
                        className={styles.tagChip}
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
              <img src={post.coverImage} alt="cover" className={styles.postCover} />
            )}

            {post.excerpt ? <p className={styles.postExcerpt}>{post.excerpt}</p> : null}
          </header>

          <section className={styles.postBody}>{renderBlocksGrouped(blocks)}</section>
        </article>
      </main>
    </>
  );
}
