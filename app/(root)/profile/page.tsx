import React from 'react'
import { Metadata } from 'next'
import { UserCard } from '@/app/(root)/profile/user/UserCard'

export const metadata: Metadata = {
  title: 'Blogify | Profile'
}

export default function Page() {
  return (
    <div className="container mx-auto px-6 py-8">
      <UserCard />
    </div>
  )
}
