import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'

export function AppHeader() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Blogify
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/blog" className="text-gray-600 hover:text-blue-500">
            Blog
          </Link>
        </nav>

        <div className="flex items-center justify-between gap-4">
          <Link href="/sign-in">
            <Button variant="outline" className="px-4">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="px-4">Sign Up</Button>
          </Link>
          <Link href="/profile">
            <Button className="px-4" variant="secondary">
              <User />
              Profile
            </Button>
          </Link>
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
