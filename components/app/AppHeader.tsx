'use client'
import React from 'react'
import Link from 'next/link'
import { AppMenu } from '@/components/app/AppMenu'
import { Button } from '@/components/ui/button'

export function AppHeader() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-4xl font-bold text-blue-600">
          Blogify
        </Link>

        <AppMenu />
      </div>
    </header>
  )
}
