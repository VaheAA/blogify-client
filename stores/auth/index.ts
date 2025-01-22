import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode' // Note: Remove curly braces when importing `jwt-decode`

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  setToken: (token: string) => void
  clearToken: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: null, isAuthenticated: false }),
      isAuthenticated: false // Initialize as false and compute later
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        // This will be called when the state is rehydrated from storage
        if (state?.token) {
          try {
            const decoded: { exp: number } = jwtDecode(state.token)
            state.isAuthenticated = decoded.exp * 1000 > Date.now()
          } catch {
            state.isAuthenticated = false
          }
        }
      }
    }
  )
)
