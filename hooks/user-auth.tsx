import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores'
import { useEffect } from 'react'
import { toast } from '@/hooks/use-toast'
import { jwtDecode } from 'jwt-decode'

export const useAuth = () => {
  const router = useRouter()
  const { isAuthenticated, isHydrated, clearToken, getToken } = useAuthStore()

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = getToken()
      if (token) {
        try {
          const decoded: { exp: number } = jwtDecode(token)
          const isValid = decoded.exp * 1000 > Date.now()
          if (!isValid) {
            toast({
              variant: 'destructive',
              title: 'Session expired. Logging out...'
            })
            clearToken()
            router.push('/sign-in')
          }
        } catch {
          toast({
            variant: 'destructive',
            title: "'Invalid token. Logging out...'"
          })
          clearToken()
          router.push('/sign-in')
        }
      }
    }

    if (isHydrated) {
      checkTokenValidity()
    }

    const interval = setInterval(checkTokenValidity, 60000)

    return () => clearInterval(interval)
  }, [isAuthenticated, isHydrated, clearToken, getToken, router])
}
