'use client'
import React, { ReactNode, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useAuthStore } from '@/stores'
import { useRouter } from 'next/navigation'

interface AuthLayoutProps {
  children: ReactNode
}

export default function Layout({ children }: AuthLayoutProps) {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) router.push('/')
  }, [isAuthenticated])

  return (
    <main className="h-full flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-md w-full">
        <div className="my-4">
          <Link href="/" className={buttonVariants({ variant: 'outline' })}>
            <ChevronLeft />
            Back
          </Link>
        </div>
        <div className="w-full p-6 bg-white rounded-md">
          <h1 className="text-2xl font-bold text-center mb-4">Welcome to Blogify</h1>
          {children}
        </div>
      </div>
    </main>
  )
}
