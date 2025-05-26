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
    <main className="min-h-screen p-6 max-w-2xl mx-auto">
      <Link
        href="/"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800 text-sm"
      >
        ← Back to Posts
      </Link>
      <article>
        <h1 className="text-3xl font-semibold mb-3 text-gray-900">{post.title}</h1>
        <div className="text-gray-700 mb-6 text-sm">
          <p className="mb-1">By {post.author}</p>
          <p className="text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="prose max-w-none text-gray-800">
          <p className="whitespace-pre-wrap leading-relaxed">{post.content}</p>
        </div>
      </article>
    </main>
  );
} 