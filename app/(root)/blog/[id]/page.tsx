'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { IBlogPost } from '@/lib/types'
import { MOCK_POSTS } from '@/lib/constants'

export default function SinglePostPage() {
  const params = useParams()
  const [post, setPost] = useState<IBlogPost | undefined>(undefined)

  useEffect(() => {
    const post = MOCK_POSTS.find((post) => parseInt(params.id as string) === post.id)

    setPost(post)
  }, [params.id])

  return (
    <div className="container mx-auto px-4 py-6">
      {post && (
        <>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 text-sm mb-6">
            {post.author && <span>By {post.author.username}</span>} |{' '}
            {post.updatedAt
              ? `Updated on ${new Date(post.updatedAt).toLocaleDateString()}`
              : `Published on ${new Date(post.createdAt!).toLocaleDateString()}`}
          </p>
          <div className="prose max-w-none">
            <p>{post.content}</p>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
