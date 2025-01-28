'use client'

import React from 'react'
import { useAuthStore } from '@/stores'
import type { IBlogPost, IUser } from '@/lib/types'
import { BASE_API_URL } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { CreateEditPostForm } from '@/components/posts/CreatePostForm'
import { DataTable } from '@/app/(root)/profile/table/UserPostsTable'
import { columns } from '@/app/(root)/profile/table/column'
import withAuth from '@/components/HOC/withAuth'
import { AppLoader } from '@/components/app/AppLoader'

export function UserCard() {
  const { getToken } = useAuthStore()
  const token = getToken()
  async function fetchUserData(): Promise<
    | {
        user: IUser | null
        posts: { posts: IBlogPost[]; count: number }
      }
    | undefined
  > {
    try {
      const [userRes, postsRes] = await Promise.all([
        fetch(`${BASE_API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${BASE_API_URL}/posts/my-posts`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      if (!userRes.ok || !postsRes.ok) {
        const userErrorData = !userRes.ok ? await userRes.json() : null
        const postsErrorData = !postsRes.ok ? await postsRes.json() : null

        throw new Error(userErrorData?.message || postsErrorData?.message || 'Failed to fetch data')
      }

      const [user, posts] = await Promise.all([userRes.json(), postsRes.json()])
      return { user, posts }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || 'An unknown error occurred')
      }
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
    retry: false
  })

  const isLoadiing = true

  return (
    <div className="relative">
      {isLoading && <AppLoader />}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg p-6 shadow-md">
          <h1 className="text-3xl font-bold mb-4">Welcome, {data?.user?.username || 'User'}!</h1>
          <p className="text-lg">
            <strong>Email:</strong> {data?.user?.email || 'N/A'}
          </p>
        </div>
      </section>
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Posts</h2>
          <CreateEditPostForm />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          {data?.posts?.posts && <DataTable columns={columns} data={data.posts.posts} />}
        </div>
      </section>
    </div>
  )
}

export default withAuth(UserCard)
