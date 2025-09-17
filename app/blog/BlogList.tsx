'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/notion';
import styles from './blog.module.css';

function formatDate(date?: string) {
  return date ? new Date(date).toLocaleDateString() : '';
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const categories = Array.from(new Set(posts.flatMap(p => p.categories)));
  const tags = Array.from(new Set(posts.flatMap(p => p.tags)));

  const filtered = posts.filter(p =>
    (!selectedCategory || p.categories.includes(selectedCategory)) &&
    (!selectedTag || p.tags.includes(selectedTag))
  );

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
            {categories.map(c => (
              <button
                key={c}
                className={`${styles.filterButton} ${c === selectedCategory ? styles.active : ''}`}
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
            {tags.map(t => (
              <button
                key={t}
                className={`${styles.filterButton} ${t === selectedTag ? styles.active : ''}`}
                onClick={() => toggleTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      <ul className={styles.postList}>
        {filtered.map(p => {
          const hasSlug = Boolean(p.slug);

          const content = (
            <>
              <div>
                <h2 className={styles.postTitle}>{p.title}</h2>
                <div className={styles.meta}>
                  {p.publishDate && <span>{formatDate(p.publishDate)}</span>}
                  {p.categories.length > 0 && (
                    <span className={styles.categories}>{p.categories.join(', ')}</span>
                  )}
                  {p.tags.length > 0 && (
                    <span className={styles.tags}>
                      {p.tags.map(tag => (
                        <span key={tag} className={styles.tagItem}>
                          #{tag}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
                {p.excerpt && <p className={styles.excerpt}>{p.excerpt}</p>}
              </div>
              <span className={styles.readMore} aria-hidden="true">
                Read more →
              </span>
            </>
          );

          return (
            <li key={p.id} className={styles.postItem}>
              {hasSlug ? (
                <Link href={`/blog/${p.slug}`} className={styles.postContent}>
                  {content}
                </Link>
              ) : (
                <div className={`${styles.postContent} ${styles.postContentDisabled}`} aria-disabled>
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
