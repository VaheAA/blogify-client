import type { IBlogPost } from '@/lib/types'
import { BASE_API_URL } from '@/lib/constants'
import Link from 'next/link'

export const revalidate = 60

export const dynamicParams = true // or false, to 404 on unknown paths
export async function generateStaticParams() {
  const { posts }: { posts: IBlogPost[]; total: number } = await fetch(
    `${BASE_API_URL}/posts`
  ).then((res) => res.json())

  return posts.map((post) => ({
    id: String(post.id)
  }))
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const post: IBlogPost = await fetch(`${BASE_API_URL}/posts/${id}`).then((res) => res.json())

  return (
    <div className="container mx-auto px-4 py-10">
      {post && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-gray-500 text-sm mb-6">
            {post.author && (
              <span>
                By <span className="font-medium">{post.author.username}</span>
              </span>
            )}{' '}
            |{' '}
            {post.updatedAt
              ? `Updated on ${new Date(post.updatedAt).toLocaleDateString()}`
              : `Published on ${new Date(post.createdAt!).toLocaleDateString()}`}
          </p>
          <div className="prose prose-lg max-w-none text-gray-700 mb-6">
            <p>{post.content}</p>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, index) => (
                  <Link
                    href={{
                      pathname: '/blog',
                      search: `tags=${tag.name}`
                    }}
                    key={index}
                    className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-3 py-1 text-sm rounded-full shadow">
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
