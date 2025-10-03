'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/notion';
import styles from './blog.module.css';

function formatDate(date?: string) {
  return date ? new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
}

function getPreview(post: BlogPost) {
  if (post.excerpt) return post.excerpt;
  if (post.text) {
    const trimmed = post.text.trim();
    if (trimmed.length <= 160) return trimmed;
    return `${trimmed.slice(0, 160)}…`;
  }
  return '';
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => (p.categories ?? []).filter(Boolean))))
      .sort((a, b) => a.localeCompare(b)),
    [posts]
  );

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => (p.tags ?? []).filter(Boolean))))
      .sort((a, b) => a.localeCompare(b)),
    [posts]
  );

  const filtered = posts.filter((p) => {
    const categoriesForPost = p.categories ?? [];
    const tagsForPost = p.tags ?? [];
    return (
      (!selectedCategory || categoriesForPost.includes(selectedCategory)) &&
      (!selectedTag || tagsForPost.includes(selectedTag))
    );
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategory(cat === selectedCategory ? null : cat);
  };

  const toggleTag = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {categories.length > 0 && (
          <div className={styles.filterGroup}>
            <span>Categories:</span>
            {categories.map((c) => (
              <button
                key={c}
                className={`${styles.filterButton} ${c === selectedCategory ? styles.active : ''}`}
                type="button"
                onClick={() => toggleCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}
        {tags.length > 0 && (
          <div className={styles.filterGroup}>
            <span>Tags:</span>
            {tags.map((t) => (
              <button
                key={t}
                className={`${styles.filterButton} ${t === selectedTag ? styles.active : ''}`}
                type="button"
                onClick={() => toggleTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.emptyState}>No posts match your filters yet.</p>
      ) : (
        <ul className={styles.postList}>
          {filtered.map((p) => (
            <li key={p.id} className={styles.postItem}>
              <h2>
                <Link href={`/blog/${p.slug}`} className={styles.titleLink}>
                  {p.title}
                </Link>
              </h2>
              <div className={styles.meta}>
                {p.publishDate && <span>{formatDate(p.publishDate)}</span>}
                {(p.categories?.length ?? 0) > 0 && (
                  <span className={styles.categories}>
                    {' '}
                    | {p.categories.join(', ')}
                  </span>
                )}
                {(p.tags?.length ?? 0) > 0 && (
                  <span className={styles.tags}>
                    {' '}
                    | {p.tags.join(', ')}
                  </span>
                )}
              </div>
              {getPreview(p) && <p className={styles.excerpt}>{getPreview(p)}</p>}
              <Link href={`/blog/${p.slug}`} className={styles.readMore}>
                Read full article
              </Link>
            </li>
          ))}
        </ul>
      <ul className={styles.postList}>
        {filtered.map(p => (
          <li key={p.id} className={styles.postItem}>
            <h2>
              <button className={styles.titleButton} onClick={() => setActivePost(p)}>
                {p.title}
              </button>
            </h2>
            <div className={styles.meta}>
              {p.publishDate && (
                <span className={styles.date}>{formatDate(p.publishDate)}</span>
              )}
              {p.categories.length > 0 && (
                <span className={styles.categories}>
                  {p.categories.map(cat => (
                    <span key={cat} className={styles.categoryTag}>{cat}</span>
                  ))}
                </span>
              )}
              {p.tags.length > 0 && (
                <span className={styles.tags}>
                  {p.tags.map(tag => (
                    <span key={tag} className={styles.categoryTag}>#{tag}</span>
                  ))}
                </span>
              )}
            </div>
            {p.excerpt && <p className={styles.excerpt}>{p.excerpt}</p>}
          </li>
        ))}
      </ul>

      {activePost && (
        <div className={styles.modalOverlay} onClick={() => setActivePost(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setActivePost(null)}>
              &times;
            </button>
            <h2>{activePost.title}</h2>
            <div className={styles.meta}>
              {activePost.publishDate && (
                <span className={styles.date}>{formatDate(activePost.publishDate)}</span>
              )}
              {activePost.categories.length > 0 && (
                <span className={styles.categories}>
                  {activePost.categories.map(cat => (
                    <span key={cat} className={styles.categoryTag}>{cat}</span>
                  ))}
                </span>
              )}
              {activePost.tags.length > 0 && (
                <span className={styles.tags}>
                  {activePost.tags.map(tag => (
                    <span key={tag} className={styles.categoryTag}>#{tag}</span>
                  ))}
                </span>
              )}
            </div>
            {activePost.text && <p>{activePost.text}</p>}
          </div>
        </div>
      )}
    </div>
  );
}