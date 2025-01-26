'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import type { IBlogPost, IUser } from '@/lib/types'
import { BASE_API_URL } from '@/lib/constants'
import { useAuthStore } from '@/stores/auth'
import { useQuery } from '@tanstack/react-query'
import withAuth from '@/components/HOC/withAuth'
import { CreateEditPostForm } from '@/components/posts/CreatePostForm'
import { DataTable } from '@/app/(root)/profile/table/UserPostsTable'
import { columns } from '@/app/(root)/profile/table/column'

function ProfilePage() {
  const { getToken } = useAuthStore()
  const token = getToken()

  async function fetchUserProfile(): Promise<IUser | null> {
    const res = await fetch(`${BASE_API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to fetch user profile')
    }

    return await res.json()
  }

  async function fetchUserPosts(): Promise<{ posts: IBlogPost[]; count: number }> {
    const res = await fetch(`${BASE_API_URL}/posts/my-posts`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to fetch user posts')
    }

    return await res.json()
  }

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserProfile,
    retry: false
  })

  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: fetchUserPosts
  })

  return (
    <div className="container mx-auto px-6 py-8">
      <section className="mb-12">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg p-6 shadow-md">
          <h1 className="text-3xl font-bold mb-4">Welcome, {data?.username || 'User'}!</h1>
          <p className="text-lg">
            <strong>Email:</strong> {data?.email || 'N/A'}
          </p>
          <Button className="mt-6 bg-white text-indigo-600 hover:bg-gray-100">Edit Profile</Button>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Posts</h2>
          <CreateEditPostForm />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          {postsQuery.data?.posts && <DataTable columns={columns} data={postsQuery.data?.posts} />}
        </div>
      </section>
    </div>
  )
}

export default withAuth(ProfilePage)
