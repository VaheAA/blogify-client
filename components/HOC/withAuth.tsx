import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth'

export default function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter()
    const { isAuthenticated } = useAuthStore()

    console.log(isAuthenticated)

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/sign-in')
      }
    }, [isAuthenticated, router])

    if (!isAuthenticated) {
      return null
    }

    return <Component {...props} />
  }
}
