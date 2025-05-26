'use client';

import { useQuery } from '@apollo/client';
import { GET_POST } from '@/graphql/queries';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function PostPage({ params }: { params: { id: string } }) {
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: params.id },
  });

  if (loading) return <div className="min-h-screen p-8">Loading...</div>;
  if (error) return <div className="min-h-screen p-8 text-red-600">Error: {error.message}</div>;
  if (!data?.post) return <div className="min-h-screen p-8">Post not found</div>;

  const post: BlogPost = data.post;

  return (
    <main className="min-h-screen py-10 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-4">
        <Link
          href="/"
          className="inline-block mb-8 text-blue-600 hover:text-blue-800 text-base font-medium transition-colors duration-200"
        >
          ← Back to Posts
        </Link>
        <article className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">{post.title}</h1>
          <div className="text-gray-700 mb-6 text-sm border-b pb-4">
            <p className="mb-1">By {post.author}</p>
            <p className="text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="prose max-w-none text-gray-800 leading-relaxed">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
        </article>
      </div>
    </main>
  );
} 