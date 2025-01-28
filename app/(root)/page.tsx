import { PostList } from '@/components/posts/PostList'
import { BASE_API_URL, POSTS_PER_PAGE } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'
import { IBlogPost } from '@/lib/types'
import { Metadata } from 'next'

export const revalidate = 360

export const metadata: Metadata = {
  title: 'Blogify',
  description: 'Discover the latest insights, tips, and trends in the world of web development.'
}

export default async function Page() {
  const { posts }: { posts: IBlogPost[] } = await fetch(
    `${BASE_API_URL}/posts?limit=${POSTS_PER_PAGE}`
  ).then((res) => res.json())

  return (
    <div>
      <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome to <span className="text-yellow-400">Blogify</span>
          </h1>
          <p className="text-xl font-light max-w-2xl mx-auto mb-6">
            Discover the latest insights, tips, and trends in the world of web development.
          </p>
        </div>
      </section>
      {/* Latest Posts Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Posts</h2>
        {posts && <PostList posts={posts} />}
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-500 transition duration-300">
            See All Posts
          </Link>
        </div>
      </section>
    </div>
  )
}
