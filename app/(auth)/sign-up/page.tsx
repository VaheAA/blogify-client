'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { AppInput } from '@/components/app/AppInput'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpSchema, type TCreateUser } from '@/lib/validation'
import { Loader2 } from 'lucide-react'
import { BASE_API_URL, ROUTES } from '@/lib/constants'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TCreateUser>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onBlur'
  })

  const { toast } = useToast()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (values: TCreateUser) => {
      const response = await fetch(`${BASE_API_URL}/users/${ROUTES.SIGN_UP}`, {
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
    onSuccess: () => {
      toast({
        className: 'bg-green-400 text-white',
        title: 'You were successfully registered',
        duration: 4000
      })
      router.push('/sign-in')
      reset()
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
        duration: 4000
      })
      reset()
    }
  })

  const handleSignUp: SubmitHandler<TCreateUser> = (values) => {
    mutation.mutate(values)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
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
            id="username"
            label="Username"
            register={register}
            error={errors.username?.message}
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

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending && <Loader2 className="animate-spin" />}
          Sign up
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
