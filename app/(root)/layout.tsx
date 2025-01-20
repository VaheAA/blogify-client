import { ReactNode } from 'react'
import { AppHeader } from '@/components/app/AppHeader'
import { AppFooter } from '@/components/app/AppFooter'

interface HomeLayoutProps {
  children: ReactNode
}

export default function Layout({ children }: HomeLayoutProps) {
  return (
    <div>
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  )
}
