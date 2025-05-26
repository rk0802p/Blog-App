'use client';

import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@/graphql/queries';
import Link from 'next/link';

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <div className="min-h-screen p-8">Loading...</div>;
  if (error) return <div className="min-h-screen p-8">Error: {error.message}</div>;

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6">
        {data.posts.map((post: any) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">By {post.author}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
} 