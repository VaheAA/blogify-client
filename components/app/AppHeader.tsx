'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'
import { useAuthStore } from '@/stores/auth'
import { useMutation } from '@tanstack/react-query'
import { BASE_API_URL, ROUTES } from '@/lib/constants'
import { useRouter } from 'next/navigation'

export function AppHeader() {
  const { clearToken, isAuthenticated, getToken } = useAuthStore()
  const token = getToken()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async () => {
      await fetch(`${BASE_API_URL}/users/${ROUTES.SIGN_OUT}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess: () => {
      clearToken()
      router.push('/')
    }
  })

  const handleSignOut = async () => {
    mutation.mutate()
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-4xl font-bold text-blue-600">
          Blogify
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link
            href={{
              pathname: '/blog'
            }}
            className="text-gray-600 hover:text-blue-500 text-lg font-bold">
            Blog
          </Link>
        </nav>

        <div className="flex items-center justify-between gap-4">
          {!isAuthenticated && (
            <>
              <Link href={{ pathname: '/sign-in' }}>
                <Button variant="outline" className="px-4">
                  Sign In
                </Button>
              </Link>
              <Link href={{ pathname: '/sign-up' }}>
                <Button className="px-4">Sign Up</Button>
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link href={{ pathname: '/profile' }}>
                <Button variant="secondary">
                  <User />
                  Profile
                </Button>
              </Link>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut />
                Sign out
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-gray-600 hover:text-blue-500 focus:outline-none"
          aria-label="Open menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}
