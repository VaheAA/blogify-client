'use client'
import { useMediaQuery } from '@/hooks/use-media-query'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogOut, MenuIcon, User } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore } from '@/stores'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { BASE_API_URL, ROUTES } from '@/lib/constants'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

export function AppMenu() {
  const { clearToken, isAuthenticated, getToken } = useAuthStore()
  const token = getToken()
  const router = useRouter()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

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
      setIsDrawerOpen(false)
    }
  })

  const handleSignOut = async () => {
    mutation.mutate()
    setIsDrawerOpen(false)
  }
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <>
        <div className="flex items-center justify-between gap-4">
          {!isAuthenticated && (
            <>
              <Link href={{ pathname: '/sign-in' }}>
                <Button
                  variant="outline"
                  className="bg-whitre text-blue-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                  Sign In
                </Button>
              </Link>
              <Link href={{ pathname: '/sign-up' }}>
                <Button className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-500 transition duration-300">
                  Sign Up
                </Button>
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
      </>
    )
  }

  return (
    <Drawer direction="right" open={isDrawerOpen} onOpenChange={(open) => setIsDrawerOpen(open)}>
      <DrawerTrigger>
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="my-4 px-4">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600"
            onClick={() => setIsDrawerOpen(false)}>
            Blogify
          </Link>
        </DrawerTitle>
        <div className="flex flex-col gap-4">
          {!isAuthenticated && (
            <div className="px-4 flex flex-col gap-4 w-full">
              <Link
                href={{ pathname: '/sign-in' }}
                className="w-full"
                onClick={() => setIsDrawerOpen(false)}>
                <Button variant="outline" className="px-6 py-3 w-full">
                  Sign In
                </Button>
              </Link>
              <Link
                href={{ pathname: '/sign-up' }}
                className="w-full"
                onClick={() => setIsDrawerOpen(false)}>
                <Button className="px-6 py-3 w-full">Sign Up</Button>
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <div className="px-4 flex flex-col gap-4 w-full">
              <Link
                href={{ pathname: '/profile' }}
                className="w-full"
                onClick={() => setIsDrawerOpen(false)}>
                <Button variant="secondary" className="w-full px-6 py-3">
                  <User />
                  Profile
                </Button>
              </Link>
              <Button variant="outline" onClick={handleSignOut} className="w-full px-6 py-3">
                <LogOut />
                Sign out
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
