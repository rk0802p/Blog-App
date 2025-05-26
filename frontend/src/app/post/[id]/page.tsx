'use client';

import { useQuery } from '@apollo/client';
import { GET_POST } from '@/graphql/queries';
import Link from 'next/link';

export default function PostPage({ params }: { params: { id: string } }) {
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: params.id },
  });

  if (loading) return <div className="min-h-screen p-8">Loading...</div>;
  if (error) return <div className="min-h-screen p-8">Error: {error.message}</div>;
  if (!data.post) return <div className="min-h-screen p-8">Post not found</div>;

  const { post } = data;

  return (
    <main className="min-h-screen p-8">
      <Link
        href="/"
        className="inline-block mb-8 text-blue-600 hover:text-blue-800"
      >
        ← Back to Posts
      </Link>
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600 mb-8">
          <p>By {post.author}</p>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
      </article>
    </main>
  );
} 