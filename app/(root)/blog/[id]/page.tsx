import type { IBlogPost } from '@/lib/types'
import { BASE_API_URL } from '@/lib/constants'
import { AppTag } from '@/components/app/AppTag'
import { Metadata } from 'next'

export const revalidate = 600

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id

  const post: IBlogPost = await fetch(`${BASE_API_URL}/posts/${id}`).then((res) => res.json())

  return {
    title: post.title
  }
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
            | {post.createdAt && `Published on ${new Date(post.createdAt!).toLocaleDateString()}`}
          </p>
          <div className="prose prose-lg max-w-none text-gray-700 mb-6">
            <p>{post.content}</p>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, index) => (
                  <AppTag tag={tag} key={index} variant="detail" />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
