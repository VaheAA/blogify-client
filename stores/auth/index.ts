import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  isHydrated: boolean // New state to track rehydration
  setToken: (token: string) => void
  clearToken: () => void
  getToken: () => string | null
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      isHydrated: false,
      setToken: (token: string) => {
        try {
          const decoded: { exp: number } = jwtDecode(token)
          const isValid = decoded.exp * 1000 > Date.now()
          set({ token, isAuthenticated: isValid })
        } catch {
          set({ token: null, isAuthenticated: false })
        }
      },
      clearToken: () => set({ token: null, isAuthenticated: false }),
      getToken: () => get().token
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          try {
            const decoded: { exp: number } = jwtDecode(state.token)
            state.isAuthenticated = decoded.exp * 1000 > Date.now()
          } catch {
            state.isAuthenticated = false
          }
        }
        if (state) state.isHydrated = true
      }
    }
  )
)
