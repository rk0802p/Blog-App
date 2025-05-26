'use client';

import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@/graphql/queries';
import Link from 'next/link';
import { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  createdAt: string;
}

export default function Home() {
  const limit = 5;
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { limit },
    fetchPolicy: 'cache-and-network',
  });

  const posts: BlogPost[] = data?.posts || [];

  if (loading) return <div className="min-h-screen p-8">Loading...</div>;
  if (error) return <div className="min-h-screen p-8 text-red-600">Error: {error.message}</div>;
  if (!posts.length) return <div className="min-h-screen p-8">No blog posts found.</div>;

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Blog Posts</h1>
      <div className="grid gap-5">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className="block p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-medium mb-1 text-gray-900">{post.title}</h2>
            <p className="text-sm text-gray-600">By {post.author}</p>
          </Link>
        ))}
      </div>
    </main>
  );
} 