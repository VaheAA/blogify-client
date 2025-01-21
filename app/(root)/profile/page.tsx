'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import type { IUser } from '@/lib/types'

const mockUser: IUser = {
  id: 1,
  email: 'john.doe@example.com',
  username: 'John Doe'
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Profile Info Section */}
      <section className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="bg-white shadow-md rounded-md p-4">
          <p>
            <strong>Name:</strong> {mockUser.username}
          </p>
          <p>
            <strong>Email:</strong> {mockUser.email}
          </p>
          <Button className="mt-4">Edit Profile</Button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
        <div className="space-y-4">
          {/*{userPosts.map((post) => (*/}
          {/*  <PostCard post={post} key={post.id} />*/}
          {/*))}*/}
        </div>
      </section>
    </div>
  )
}
