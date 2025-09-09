import { getPosts } from '../../lib/notion';

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <main>
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
