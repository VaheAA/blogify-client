import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores'
import { useEffect } from 'react'
import { toast } from '@/hooks/use-toast'
import { jwtDecode } from 'jwt-decode'

export const useAuth = () => {
  const router = useRouter()
  const { isHydrated, clearToken, getToken } = useAuthStore()

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = getToken()
      if (token) {
        try {
          const decoded: { exp: number } = jwtDecode(token)
          const currentTime = Date.now()
          const expirationTime = decoded.exp * 1000
          const bufferTime = 5 * 60 * 1000

          if (expirationTime - bufferTime <= currentTime) {
            toast({
              variant: 'destructive',
              title: 'Session expired. Logging out...'
            })
            clearToken()
            router.push('/sign-in')
          }
        } catch (error) {
          console.error('Token decoding failed:', error)
          toast({
            variant: 'destructive',
            title: 'Invalid token. Logging out...'
          })
          clearToken()
          router.push('/sign-in')
        }
      }
    }

    if (isHydrated) {
      checkTokenValidity() // Initial check
      const interval = setInterval(checkTokenValidity, 1000)
      return () => clearInterval(interval)
    }
  }, [isHydrated, clearToken, getToken, router])
}
