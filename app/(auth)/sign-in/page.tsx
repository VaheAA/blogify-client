'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { AppInput } from '@/components/app/AppInput'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInSchema, type TLoginUser } from '@/lib/validation'
import { Loader2 } from 'lucide-react'
import { BASE_API_URL, ROUTES } from '@/lib/constants'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth'

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TLoginUser>({
    resolver: zodResolver(SignInSchema),
    mode: 'onBlur'
  })
  const { setToken } = useAuthStore()
  const { toast } = useToast()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (values: TLoginUser) => {
      const response = await fetch(`${BASE_API_URL}/users/${ROUTES.SIGN_IN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Something went wrong')
      }

      return response.json()
    },
    onSuccess: (data: { access_token: string }) => {
      setToken(data.access_token)
      toast({
        className: 'bg-green-400 text-white',
        title: 'You were successfully logged in',
        duration: 2000
      })
      router.push('/')
      reset()
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
        duration: 2000
      })
      reset()
    }
  })

  const handleSignIn: SubmitHandler<TLoginUser> = (values) => {
    mutation.mutate(values)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        <div>
          <AppInput
            id="email"
            label="Email"
            type="email"
            register={register}
            error={errors.email?.message}
          />
        </div>
        <div>
          <AppInput
            id="password"
            label="Password"
            type="password"
            register={register}
            error={errors.password?.message}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
          disabled={mutation.isPending}>
          {mutation.isPending && <Loader2 className="animate-spin" />}
          Sign in
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Don&rsquo;t have an account?{' '}
        <Link href="/sign-up" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  )
}
