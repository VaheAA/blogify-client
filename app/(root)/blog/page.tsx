import { PostList } from '@/components/posts/PostList'
import { BASE_API_URL, POSTS_PER_PAGE } from '@/lib/constants'
import React from 'react'
import { IBlogPost } from '@/lib/types'
import { AppPagination } from '@/components/app/AppPagination'
import { AppSearch } from '@/components/app/AppSearch'
import { ITag } from '@/lib/types/blog'
import { Metadata } from 'next'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Blogify | All posts',
  description: 'Search through thousands of best blogposts right now!'
}

export default async function Page({ searchParams }: { searchParams: Promise<any> }) {
  const tagsData: ITag[] = await fetch(`${BASE_API_URL}/posts/tags`).then((res) => res.json())
  const parsedTags = tagsData.map((tag) => ({
    label: tag.name,
    value: tag.name
  }))

  const pageSearchParams = await searchParams

  const query = pageSearchParams['query'] ?? ''
  const tags = pageSearchParams['tags'] ?? []
  const page = Array.isArray(pageSearchParams['page'])
    ? pageSearchParams['page'][0]
    : (pageSearchParams['page'] ?? '1')
  const limit = Array.isArray(pageSearchParams['limit'])
    ? pageSearchParams['limit'][0]
    : (pageSearchParams['limit'] ?? POSTS_PER_PAGE.toString())

  const queryParams = new URLSearchParams()

  if (query) {
    queryParams.append('query', query as string)
  }

  if (tags.length > 0) {
    queryParams.append('tags', Array.isArray(tags) ? tags.join(',') : (tags as string))
  }

  queryParams.append('page', page)
  queryParams.append('limit', limit)

  const start = (Number(page) - 1) * Number(limit)
  const end = start + Number(limit)

  const { posts, total }: { posts: IBlogPost[]; total: number } = await fetch(
    `${BASE_API_URL}/posts?${queryParams.toString()}`
  ).then((res) => res.json())

  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">All Posts</h1>
      <AppSearch options={parsedTags} />

      {posts.length ? (
        <PostList posts={posts} />
      ) : (
        <p className="text-gray-500 text-center">No posts found. Try refining your search.</p>
      )}

      <AppPagination hasNextPage={end < total} hasPrevPage={start > 0} totalPages={totalPages} />
    </div>
  )
}
