'use client'
import { ReactNode, useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './global.css'

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const [queryClient] = useState(() => new QueryClient())

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
