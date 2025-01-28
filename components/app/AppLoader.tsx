import { cn } from '@/lib/utils'

interface AppLoaderProps {
  className?: string
}

export function AppLoader({ className }: AppLoaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 h-screen w-full flex items-center justify-center bg-white bg-opacity-95">
      <div className=" w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center animate-spin">
        <div className="w-10 h-10 bg-white rounded-full"></div>
      </div>
    </div>
  )
}
