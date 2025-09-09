'use client';

import { useState } from 'react';
import type { BlogPost } from '@/lib/notion';
import styles from './blog.module.css';

function formatDate(date?: string) {
  return date ? new Date(date).toLocaleDateString() : '';
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

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
        {filtered.map(p => (
          <li key={p.id} className={styles.postItem}>
            <h2>
              <button className={styles.titleButton} onClick={() => setActivePost(p)}>
                {p.title}
              </button>
            </h2>
            <div className={styles.meta}>
              {p.publishDate && <span>{formatDate(p.publishDate)}</span>}
              {p.categories.length > 0 && (
                <span className={styles.categories}> | {p.categories.join(', ')}</span>
              )}
              {p.tags.length > 0 && (
                <span className={styles.tags}> | {p.tags.join(', ')}</span>
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
              {activePost.publishDate && <span>{formatDate(activePost.publishDate)}</span>}
              {activePost.categories.length > 0 && (
                <span className={styles.categories}> | {activePost.categories.join(', ')}</span>
              )}
              {activePost.tags.length > 0 && (
                <span className={styles.tags}> | {activePost.tags.join(', ')}</span>
              )}
            </div>
            {activePost.text && <p>{activePost.text}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
