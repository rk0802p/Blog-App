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
    <main className="min-h-screen py-12 bg-gradient-to-br from-gray-100 to-white">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold mb-10 text-gray-800 border-b-2 border-blue-600 pb-4 inline-block tracking-tight">Recent Blog Posts</h1>
        <div className="grid gap-7">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-200 hover:border-blue-500"
            >
              <h2 className="text-2xl font-bold mb-2 text-gray-800 tracking-tight">{post.title}</h2>
              <p className="text-gray-600 text-sm font-medium">By {post.author}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 