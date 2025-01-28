'use client'
import { ReactNode, useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuth } from '@/hooks/user-auth'
import './global.css'

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const [queryClient] = useState(() => new QueryClient())
  useAuth()

  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  )
}
