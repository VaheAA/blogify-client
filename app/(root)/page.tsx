import Image from 'next/image'
import { PostList } from '@/components/posts/PostList'
import { MOCK_POSTS } from '@/lib/constants'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'

export default function Home() {
  return (
    <div>
      <section className="relative bg-blue-600 text-white">
        <div className="absolute inset-0">
          <Image
            width="100"
            height="100"
            src="/images/hero.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Blogify</h1>
          <p className="text-lg">
            Discover the latest insights, tips, and trends in the world of web development.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>
        <PostList posts={MOCK_POSTS.slice(0, 9)} />
        <div className="my-4">
          <Link href="/blog" className={buttonVariants({ variant: 'default' })}>
            Sell All Posts
          </Link>
        </div>
      </section>
    </div>
  )
}
