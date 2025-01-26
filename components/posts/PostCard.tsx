import Link from 'next/link'
import type { IBlogPost } from '@/lib/types'
import { AppTag } from '@/components/app/AppTag'

interface PostCardProps {
  post: IBlogPost
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Post Title */}
      <h3 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600">
        <Link
          href={{
            pathname: `/blog/${post.id}`
          }}>
          {post.title}
        </Link>
      </h3>

      {/* Post Excerpt */}
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content.substring(0, 100)}...</p>

      {/* Post Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <AppTag tag={tag} key={index} />
          ))}
        </div>
      )}

      {/* Author Info */}
      {post.author && (
        <p className="text-sm text-gray-500 mb-2">
          By <span className="font-medium text-gray-700">{post.author.username}</span>
        </p>
      )}

      {/* Post Date */}
      <p className="text-xs text-gray-400 mb-4">
        {post.updatedAt
          ? `Updated on ${new Date(post.updatedAt).toLocaleDateString()}`
          : `Published on ${new Date(post.createdAt!).toLocaleDateString()}`}
      </p>
    </div>
  )
}
