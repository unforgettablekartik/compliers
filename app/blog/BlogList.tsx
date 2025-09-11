'use client';

import { useState } from 'react';
import type { BlogPost } from '@/lib/notion';
import NotionRenderer from '@/components/NotionRenderer';
import styles from './blog.module.css';

function formatDate(date?: string) {
  return date ? new Date(date).toLocaleDateString() : '';
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = Array.from(new Set(posts.flatMap(p => p.categories)));
  const tags = Array.from(new Set(posts.flatMap(p => p.tags)));

  function extractText(blocks: any[]): string {
    return (blocks || [])
      .map((block: any) => {
        const rich = block[block.type]?.rich_text || [];
        const text = rich.map((r: any) => r.plain_text).join('');
        const children = block.children ? extractText(block.children) : '';
        return text + ' ' + children;
      })
      .join(' ');
  }

  const filtered = posts.filter(p => {
    const matchesCategory = !selectedCategory || p.categories.includes(selectedCategory);
    const matchesTag = !selectedTag || p.tags.includes(selectedTag);
    const searchText = (
      p.title + ' ' + (p.excerpt || '') + ' ' + extractText(p.content || [])
    ).toLowerCase();
    const matchesQuery = !query || searchText.includes(query.toLowerCase());
    return matchesCategory && matchesTag && matchesQuery;
  });

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        {categories.length > 0 && (
          <select
            value={selectedCategory ?? ''}
            onChange={e => setSelectedCategory(e.target.value || null)}
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
        {tags.length > 0 && (
          <select
            value={selectedTag ?? ''}
            onChange={e => setSelectedTag(e.target.value || null)}
          >
            <option value="">All Tags</option>
            {tags.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        )}
        <input
          type="text"
          className={styles.search}
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
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
            {activePost?.content && (
              <div className={styles.content}>
                <NotionRenderer blocks={activePost.content} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
