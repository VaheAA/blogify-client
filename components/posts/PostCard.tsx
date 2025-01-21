import Link from 'next/link'
import type { IBlogPost } from '@/lib/types'

interface PostCardProps {
  post: IBlogPost
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="border rounded-md p-4 shadow-md hover:shadow-lg transition-shadow">
      {/* Title with link */}
      <h3 className="text-lg font-bold mb-2">
        <Link href={`/blog/${post.id}`}>{post.title}</Link>
      </h3>

      {/* Content preview */}
      <p className="text-gray-600 mb-2">{post.content.substring(0, 100)}...</p>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-md">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Author */}
      {post.author && (
        <p className="text-sm text-gray-500">
          By <span className="font-medium">{post.author.username}</span>
        </p>
      )}

      {/* Dates */}
      <p className="text-xs text-gray-400">
        {post.updatedAt
          ? `Updated on ${new Date(post.updatedAt).toLocaleDateString()}`
          : `Published on ${new Date(post.createdAt!).toLocaleDateString()}`}
      </p>
    </div>
  )
}
