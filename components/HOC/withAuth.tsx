import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth'

export default function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter()
    const { isAuthenticated, isHydrated } = useAuthStore()

    useEffect(() => {
      if (isHydrated && !isAuthenticated) {
        router.push('/sign-in')
      }
    }, [isAuthenticated, isHydrated, router])

    if (!isHydrated) {
      // Show a loading placeholder until rehydration is complete
      return <div>Loading...</div>
    }

    if (!isAuthenticated) {
      return null // Prevent rendering the protected component
    }

    return <Component {...props} />
  }
}
