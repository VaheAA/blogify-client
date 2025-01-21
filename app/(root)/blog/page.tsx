'use client'

import { PostList } from '@/components/posts/PostList'
import { MOCK_POSTS, POSTS_PER_PAGE } from '@/lib/constants'
import React, { useState, useMemo } from 'react'

export default function AllPostsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter posts by title or tags
  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter((post) => {
      const matchesTitle = post.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTags = post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
      return matchesTitle || matchesTags
    })
  }, [searchQuery])

  // Paginate filtered posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = useMemo(
    () => filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE),
    [filteredPosts, currentPage, POSTS_PER_PAGE]
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to page 1 on search
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or tags..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Post List */}
      <PostList posts={paginatedPosts} />

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded-md ${
            currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-white'
          }`}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded-md ${
              page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
            }`}>
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded-md ${
            currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-white'
          }`}>
          Next
        </button>
      </div>
    </div>
  )
}
