import { PostCard } from '@/components/posts/PostCard'
import type { IBlogPost } from '@/lib/types'

type TPostListProps = {
  posts: IBlogPost[]
}

export function PostList({ posts }: TPostListProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
